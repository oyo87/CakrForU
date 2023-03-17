package com.a604.cake4u.auth.service;


import com.a604.cake4u.auth.entity.ProviderType;
import com.a604.cake4u.auth.entity.UserPrincipal;
import com.a604.cake4u.auth.info.OAuth2UserInfo;
import com.a604.cake4u.auth.info.OAuth2UserInfoFactory;
import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.exception.OAuthProviderMissMatchException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final BuyerRepository buyerRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    @Value("${password}")
    private String password;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        LOGGER.debug("process 메서드가 CustomOAuth2UserService에서 실행됨");
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        Buyer savedUser = buyerRepository.findByEmail(userInfo.getEmail());

        if (savedUser != null) {
            if (providerType != savedUser.getProviderType()) {
                throw new OAuthProviderMissMatchException(
                        "Looks like you're signed up with " + providerType +
                                " account. Please use your " + savedUser.getProviderType() + " account to login."
                );
            }
            updateUser(savedUser, userInfo);
        } else {
            // DB에 저장된 user가 없으면
            savedUser = createUser(userInfo, providerType);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private Buyer createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        LOGGER.debug("createUser 메서드가 CustomOAuth2UserService에서 실행됨");
        LocalDateTime now = LocalDateTime.now();

        Buyer buyer = Buyer.builder()
                .email(userInfo.getEmail())
                .password(password)
                .nickname(userInfo.getName())
                .providerType(providerType)
                .build();
        return buyerRepository.saveAndFlush(buyer);
    }

    private Buyer updateUser(Buyer buyer, OAuth2UserInfo userInfo) {

        if (userInfo.getName() != null && !userInfo.getName().equals(buyer.getNickname())) {
            buyer.setNickname(userInfo.getName());
        }

        return buyer;
    }
}