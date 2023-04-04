package com.a604.cake4u.seller.service;

import com.a604.cake4u.enums.EImageFileType;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.exception.ErrorMessage;
import com.a604.cake4u.imagefile.entity.ImageFile;
import com.a604.cake4u.imagefile.handler.S3ImageFileHandler;
import com.a604.cake4u.imagefile.repository.ImageFileRepository;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.seller.dto.SellerLoginDto;
import com.a604.cake4u.seller.dto.SellerResponseDto;
import com.a604.cake4u.seller.dto.SellerSaveRequestDto;
import com.a604.cake4u.seller.dto.SellerUpdateDto;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class SellerService {
    private final SellerRepository sellerRepository;
    private final ImageFileRepository imageFileRepository;
    private final S3ImageFileHandler s3ImageFileHandler;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public Long saveSeller(SellerSaveRequestDto sellerSaveRequestDto, List<MultipartFile> files) {
        Long ret = -1L;

        if (sellerRepository.findByEmail(sellerSaveRequestDto.getEmail()).isPresent())
            throw new BaseException(ErrorMessage.ALEADY_EXIST_EMAIL);

        Seller seller = sellerSaveRequestDto.toEntity();

        try {
            List<ImageFile> imageFileList = s3ImageFileHandler.parseFileInfo(files);
            seller.setPassword(passwordEncoder.encode(sellerSaveRequestDto.getPassword()));
            ret = sellerRepository.save(seller).getId();

            //  파일이 존재하면 처리
            if(!imageFileList.isEmpty()) {
                for (ImageFile imageFile : imageFileList) {
                    //  파일을 DB에 저장
                    imageFile.setSeller(seller);    //  사진에 판매자 등록
                    imageFile.setImageFileType(EImageFileType.SELLER_THUMBNAIL);    //  사진 유형 등록
                    seller.addSellerImageFile(imageFile);   //  판매자에 사진 파일 등록
                    imageFileRepository.save(imageFile); //  파일을 DB에 등록
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }


    public SellerResponseDto showSellerInfo(Long sellerId) {
        SellerResponseDto seller = sellerRepository.findSellerInfo(sellerId);
        seller.setImageUrls(imageFileRepository.findURLsBySellerId(sellerId).get());
        if (seller == null)
            throw new BaseException(ErrorMessage.NOT_USER_INFO);
        return seller;
    }

    public void changeSellerInfo(SellerUpdateDto seller) {
        sellerRepository.save(seller.toEntity());
    }

    public List<SellerResponseDto> allSeller() {
        List<SellerResponseDto> ls = sellerRepository.AllSeller();
        for(SellerResponseDto srd : ls){
            srd.setImageUrls(imageFileRepository.findURLsBySellerId(srd.getId()).get());
        }
        return ls;
    }
    public List<SellerResponseDto> searchSeller(String dongCode) {
        return sellerRepository.searchSeller(dongCode);
    }

    public List<SellerResponseDto> getAllSellersPaging(int page) {

        Page<Seller> sellerList = sellerRepository.findAll(PageRequest.of(page, 5, Sort.by("id").descending()));
        List<Seller> sellers = sellerList.getContent();
        List<SellerResponseDto> sellerDtos = new ArrayList<>();

        for (Seller seller : sellers) {
            sellerDtos.add(new SellerResponseDto(seller));
        }
        return sellerDtos;
    }
}
