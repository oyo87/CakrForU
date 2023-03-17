package com.a604.cake4u.portfolio.service;

import com.a604.cake4u.portfolio.dto.PortfolioSaveDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final SellerRepository sellerRepository;

    //PortfolioFileDto 생성 필요 uri, name, type만 프론트에서 받으면 될듯
    //public void uploadPortfolio(PortfolioSaveDto portfolioSaveDto, PortfolioFileDto portfolioFileDto
    public Portfolio uploadPortfolio(PortfolioSaveDto portfolioSaveDto){
//         dto를 portfolio table에 entity화 하여 저장
        Portfolio portfolio = portfolioSaveDtoToEntity(portfolioSaveDto);
         return portfolioRepository.save(portfolio);
         
//         파일을 여기서 처리할지 파일처리하는 로직을 파일패키지에서 따로 할지
//         방금 저장한 portfolio id를 불러와서
//        long id = portfolio.getId();
//         file entity를 만들고 저장
        
    }

    //새로 등록하기 위한 porfolioSaveDto 를 Portfolio Entity로 변환
    private Portfolio portfolioSaveDtoToEntity(PortfolioSaveDto portfolioSaveDto){
        return Portfolio.builder().
                seller(sellerRepository.findById(portfolioSaveDto.getSeller()).get()).
                hit(0).
                createdAt(LocalDateTime.now()).
                gender(portfolioSaveDto.getGender()).
                situation(portfolioSaveDto.getSituation()).
                ageGroup(portfolioSaveDto.getAgeGroup()).
                size(portfolioSaveDto.getSize()).
                color(portfolioSaveDto.getColor()).
                shape(portfolioSaveDto.getShape()).
                sheetTaste(portfolioSaveDto.getSheetTaste()).
                creamTaste(portfolioSaveDto.getCreamTaste()).
                detail(portfolioSaveDto.getDetail()).
                build();
    }

    //포트폴리오 하나 얻어오기
    public Portfolio getPortfolio(Long id) {
        return portfolioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));
    }

    //전체 포트폴리오 가져오기
    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    //특정 가게 전체 포트폴리오 가져오기
    public List<Portfolio> getPortfoliosBySellerId(Long sellerId) {
        return portfolioRepository.findBySellerId(sellerId);
    }

    //포트폴리오 삭제
    public void deletePortfolio(Long id) {
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));
        portfolioRepository.delete(portfolio);
    }
}

