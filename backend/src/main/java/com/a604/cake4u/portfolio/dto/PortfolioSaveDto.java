package com.a604.cake4u.portfolio.dto;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PortfolioSaveDto {

    //sellerId
    private long seller;

    private EGender gender;

    private ESituation situation;

    private int ageGroup;

    private ESheetSize size;

    private ESheetShape shape;

    private EColor color;

    private ESheetTaste sheetTaste;

    private ECreamTaste creamTaste;

//    파일은 따로 관리했다고함 프론트에서 따로 전송
//    private String fileUri;
//
//    private String fileName;
//
//    private String type;

    private String detail;

    private LocalDateTime createdAt;

    public Portfolio toEntity(PortfolioSaveDto portfolioSaveDto){
        SellerRepository sellerRepository

//                작업중
        return Portfolio.builder().
                seller(sellerRepository.findById(seller).get()).
                hit(0).build();

    }
}
