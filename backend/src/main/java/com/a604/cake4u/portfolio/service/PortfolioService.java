package com.a604.cake4u.portfolio.service;

import com.a604.cake4u.files.dto.PortfolioFileDto;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.dto.PortfolioSaveDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PortfolioService {

    //PortfolioFileDto 생성 필요 uri, name, type만 프론트에서 받으면 될듯
    public void uploadPortfolio(PortfolioSaveDto portfolioSaveDto, PortfolioFileDto portfolioFileDto){
//         dto를 portfolio table에 entity화 하여 저장
//         방금 저장한 portfolio id를 불러와서
//         file entity를 만들고 저장



    }
}
