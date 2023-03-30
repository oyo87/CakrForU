package com.a604.cake4u.auth.service;


import com.a604.cake4u.auth.entity.UserPrincipal;
import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.exception.ErrorMessage;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final BuyerRepository buyerRepository;
    private final SellerRepository sellerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Buyer> buyer = buyerRepository.findByEmail(email);
        Optional<Seller> seller = sellerRepository.findByEmail(email);

        if(buyer.isPresent()){
            return UserPrincipal.createBuyerPrincipal(buyer.get());
        }

        if(seller.isPresent()){
            return UserPrincipal.createSellerPrincipal(seller.get());
        }

        else if("관리자".equals(buyer.get().getNickname())) {
        	return UserPrincipal.createAdmin(buyer.get());
        }

        throw new BaseException(ErrorMessage.NOT_EXIST_EMAIL);
    }
}