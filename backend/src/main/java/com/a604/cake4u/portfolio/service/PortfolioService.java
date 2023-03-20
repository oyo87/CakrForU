package com.a604.cake4u.portfolio.service;

import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.dto.PortfolioSaveDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    //포트폴리오 하나 얻어오기
    public PortfolioResponseDto getPortfolio(Long id) {
        Portfolio portfolio = portfolioRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

    return portfolioEntityToPortfolioResponseDTO(portfolio);
    }

    //전체 포트폴리오 가져오기
    public List<PortfolioResponseDto> getAllPortfolios() {

        List<Portfolio> portfolioList = portfolioRepository.findAll();
        List<PortfolioResponseDto> portfolioDtos = new ArrayList<>();

        for(Portfolio p : portfolioList){
            portfolioDtos.add(portfolioEntityToPortfolioResponseDTO(p));
        }
        return portfolioDtos;
    }

    //특정 가게 전체 포트폴리오 가져오기
    public List<PortfolioResponseDto> getPortfoliosBySellerId(Long sellerId) {

        List<Portfolio> portfolioList = portfolioRepository.findBySellerId(sellerId);

        List<PortfolioResponseDto> portfolioDtos = new ArrayList<>();

        for(Portfolio p : portfolioList){
            portfolioDtos.add(portfolioEntityToPortfolioResponseDTO(p));
        }

        return portfolioDtos;
    }

    //포트폴리오 삭제
    public void deletePortfolio(Long id) {
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));
        portfolioRepository.delete(portfolio);
    }

    //새로 등록하기 위한 porfolioSaveDto 를 Portfolio Entity로 변환
    private Portfolio portfolioSaveDtoToEntity(PortfolioSaveDto portfolioSaveDto) throws NoSuchElementException {
        Optional<Seller> sellerOptional = sellerRepository.findById(portfolioSaveDto.getSellerId());
        if (sellerOptional.isPresent()) {
            Seller seller = sellerOptional.get();
            return Portfolio.builder()
                    .seller(seller)
                    .hit(0)
                    .createdAt(LocalDateTime.now())
                    .gender(portfolioSaveDto.getGender())
                    .situation(portfolioSaveDto.getSituation())
                    .ageGroup(portfolioSaveDto.getAgeGroup())
                    .size(portfolioSaveDto.getSize())
                    .color(portfolioSaveDto.getColor())
                    .shape(portfolioSaveDto.getShape())
                    .sheetTaste(portfolioSaveDto.getSheetTaste())
                    .creamTaste(portfolioSaveDto.getCreamTaste())
                    .detail(portfolioSaveDto.getDetail())
                    .build();
        } else {
            throw new NoSuchElementException("Seller not found with id: " + portfolioSaveDto.getSellerId());
        }

    }


    //포트폴리오 엔티티를 포트폴리오DTO로 변환
    private PortfolioResponseDto portfolioEntityToPortfolioResponseDTO(Portfolio portfolio){
        return PortfolioResponseDto.builder().
                id(portfolio.getId()).
                seller(portfolio.getSeller()).
                hit(portfolio.getHit()).
                createdAt(portfolio.getCreatedAt()).
                gender(portfolio.getGender()).
                situation(portfolio.getSituation()).
                ageGroup(portfolio.getAgeGroup()).
                size(portfolio.getSize()).
                color(portfolio.getColor()).
                shape(portfolio.getShape()).
                sheetTaste(portfolio.getSheetTaste()).
                creamTaste(portfolio.getCreamTaste()).
                detail(portfolio.getDetail()).
                build();

    }
}

