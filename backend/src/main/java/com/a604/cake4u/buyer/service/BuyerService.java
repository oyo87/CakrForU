package com.a604.cake4u.buyer.service;

import com.a604.cake4u.buyer.dto.BuyerLoginDto;
import com.a604.cake4u.buyer.dto.BuyerSaveRequestDto;
import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.exception.ErrorMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class BuyerService {
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

        if(loginDto.getPassword().equals(buyerLoginDto.getPassword())) { //Todo; Security 적용 이후 PasswordEncoder.matches로 변경해야 함
            throw new BaseException(ErrorMessage.NOT_PASSWORD);
        }

        return new HashMap<String, Object>(){{
            //Todo; 토큰, buyerReponseDto 추가
        }
        };
    }
}
