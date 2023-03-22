package com.a604.cake4u.seller.service;

import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.exception.ErrorMessage;
import com.a604.cake4u.seller.dto.SellerLoginDto;
import com.a604.cake4u.seller.dto.SellerResponseDto;
import com.a604.cake4u.seller.dto.SellerSaveRequestDto;
import com.a604.cake4u.seller.dto.SellerUpdateDto;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class SellerService {
    @Autowired
    SellerRepository sellerRepository;

    public Long saveSeller(SellerSaveRequestDto seller) {
        if (sellerRepository.findByEmail(seller.getEmail()).isPresent())
            throw new BaseException(ErrorMessage.NOT_EXIST_EMAIL);
        return sellerRepository.save(seller.toEntity()).getId();
    }

    public Map<String, Object> sellerLogin(SellerLoginDto login) throws Exception {
        Seller seller = sellerRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new BaseException(ErrorMessage.NOT_EXIST_EMAIL));

        if (!login.getPassword().equals(seller.getPassword()))
            throw new BaseException(ErrorMessage.NOT_PASSWORD);
        return new HashMap<String, Object>() {{
        }};
    }

    public SellerResponseDto showSellerInfo(Long sellerId) {
        SellerResponseDto seller = sellerRepository.findSellerInfo(sellerId);
        if (seller == null)
            throw new BaseException(ErrorMessage.NOT_USER_INFO);
        return seller;
    }

    public void changeSellerInfo(SellerUpdateDto seller) {
        sellerRepository.save(seller.toEntity());
    }
}
