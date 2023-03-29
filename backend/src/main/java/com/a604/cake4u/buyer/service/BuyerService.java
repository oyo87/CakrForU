package com.a604.cake4u.buyer.service;

import com.a604.cake4u.buyer.dto.BuyerInfoDto;
import com.a604.cake4u.buyer.dto.BuyerLoginDto;
import com.a604.cake4u.buyer.dto.BuyerSaveRequestDto;
import com.a604.cake4u.buyer.dto.BuyerUpdatePasswordDto;
import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.exception.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class BuyerService {

    private BuyerRepository buyerRepository;
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    public BuyerService(BuyerRepository buyerRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.buyerRepository = buyerRepository;
        this.passwordEncoder = bCryptPasswordEncoder;
    }

    public int saveBuyer(BuyerSaveRequestDto buyerSaveRequestDto){

        if (buyerRepository.findByEmail(buyerSaveRequestDto.getEmail()).isPresent()) {
            throw new BaseException(ErrorMessage.EXIST_EMAIL);
        }
        buyerSaveRequestDto.setPassword(passwordEncoder.encode(buyerSaveRequestDto.getPassword()));
        buyerRepository.save(buyerSaveRequestDto.toEntity());

        return 1;
    }

    public void updatePassword(BuyerUpdatePasswordDto buyerUpdatePasswordDto){

        Optional<Buyer> buyer = buyerRepository.findByEmail(buyerUpdatePasswordDto.getEmail());

        //기존 멤버의 비밀번호 Todo; 나중에 passwerdencoder machers 이용해 비교하는 걸로 변경
        if(!buyer.get().getPassword().equals(buyerUpdatePasswordDto.getPrePassword())){
            throw new BaseException(ErrorMessage.NOT_PASSWORD); //기존 비밀번호와 일치하지 않을 때
        }

        buyer.get().setPassword(buyerUpdatePasswordDto.getNewPassword());

        buyerRepository.save(buyer.get());

    }

    public BuyerInfoDto showBuyerInfo(Long id){

        Optional<Buyer> buyer = buyerRepository.findById(id);

        BuyerInfoDto buyerResponseDto = BuyerInfoDto.builder()
                .id(buyer.get().getId())
                .nickname(buyer.get().getNickname())
                .phoneNumber(buyer.get().getPhoneNumber())
                .age(buyer.get().getAge())
                .gender(buyer.get().getGender())
                .providerType(buyer.get().getProviderType())
                .build();

        return buyerResponseDto;
    }

    public void updateBuyerInfo(BuyerInfoDto buyerInfoDto) {

        Optional<Buyer> buyer = buyerRepository.findByEmail(buyerInfoDto.getEmail());

        buyer.get().setNickname(buyerInfoDto.getNickname());
        buyer.get().setAge(buyerInfoDto.getAge());
        buyer.get().setPhoneNumber(buyerInfoDto.getPhoneNumber());

        buyerRepository.save(buyer.get());

    }

}
