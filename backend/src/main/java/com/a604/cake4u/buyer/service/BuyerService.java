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
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class BuyerService {
    @Autowired
    private BuyerRepository buyerRepository;

    public int saveBuyer(BuyerSaveRequestDto buyerSaveRequestDto){

        if (buyerRepository.findByEmail(buyerSaveRequestDto.getEmail()).isPresent()) {
            throw new BaseException(ErrorMessage.EXIST_EMAIL);
        }

        buyerRepository.save(buyerSaveRequestDto.toEntity());

        return 1;
    }

    public Map<String, Object> login(BuyerLoginDto loginDto) throws Exception {

        Buyer buyer = buyerRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new BaseException(ErrorMessage.NOT_EXIST_EMAIL));

        BuyerLoginDto buyerLoginDto = BuyerLoginDto.builder()
                .email(buyer.getEmail())
                .password(buyer.getPassword())
                .build();

        if(!loginDto.getPassword().equals(buyerLoginDto.getPassword())) { //Todo; Security 적용 이후 PasswordEncoder.matches로 변경해야 함
            throw new BaseException(ErrorMessage.NOT_PASSWORD);
        }

        return new HashMap<String, Object>(){{
            //Todo; 토큰, buyerReponseDto 추가
        }
        };
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
                .nickname(buyer.get().getNickname())
                .phoneNumber(buyer.get().getPhoneNumber())
                .birthDate(buyer.get().getBirthDate())
                .build();

        return buyerResponseDto;
    }

    public void updateBuyerInfo(BuyerInfoDto buyerInfoDto) {

        Optional<Buyer> buyer = buyerRepository.findByEmail(buyerInfoDto.getEmail());

        buyer.get().setNickname(buyerInfoDto.getNickname());
        buyer.get().setBirthDate(buyerInfoDto.getBirthDate());
        buyer.get().setPhoneNumber(buyerInfoDto.getPhoneNumber());

        buyerRepository.save(buyer.get());

    }

}
