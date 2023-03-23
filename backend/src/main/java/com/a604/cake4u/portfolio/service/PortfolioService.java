package com.a604.cake4u.portfolio.service;

import com.a604.cake4u.portfolio.dto.CakeFilter;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.dto.PortfolioSaveDto;
import com.a604.cake4u.portfolio.dto.PortfolioUpdateDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.entity.QPortfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.portfolio.repository.PortfolioRepositoryCustom;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class PortfolioService implements PortfolioRepositoryCustom{

    private final PortfolioRepository portfolioRepository;
    private final SellerRepository sellerRepository;
    private final JPAQueryFactory queryFactory;

//  querydsl=========================================================================
    @Override
    public List<PortfolioResponseDto> findPortfolioCakeFilter(CakeFilter cakeFilter) {

        QPortfolio portfolio = QPortfolio.portfolio;

//      null 체크. CakeFilter 클래스의 각 필드에서 null 여부를 확인하고, 해당 필드에 대한 검색 조건이 있으면 whereClause에 추가
        BooleanExpression whereClause = portfolio.isNotNull(); // where조건절

        //and연산으로 선택한 핉터와 일치하는지 확인하는 조건을 추가
        if (cakeFilter.getSize() != null) {
            whereClause = whereClause.and(portfolio.size.eq(cakeFilter.getSize()));
        }
        if (cakeFilter.getColor() != null) {
            whereClause = whereClause.and(portfolio.color.eq(cakeFilter.getColor()));
        }
        if (cakeFilter.getShape() != null) {
            whereClause = whereClause.and(portfolio.shape.eq(cakeFilter.getShape()));
        }
        if (cakeFilter.getSheetTaste() != null) {
            whereClause = whereClause.and(portfolio.sheetTaste.eq(cakeFilter.getSheetTaste()));
        }
        if (cakeFilter.getCreamTaste() != null) {
            whereClause = whereClause.and(portfolio.creamTaste.eq(cakeFilter.getCreamTaste()));
        }
        if (cakeFilter.getSituation() != null) {
            whereClause = whereClause.and(portfolio.situation.eq(cakeFilter.getSituation()));
        }
        if (cakeFilter.getGender() != null) {
            whereClause = whereClause.and(portfolio.gender.eq(cakeFilter.getGender()));
        }

        List<Portfolio> tempList =queryFactory.selectFrom(portfolio) // 조건에 맞는Entity list
                .where(whereClause)
                .fetch();
        List<PortfolioResponseDto> returnList = new ArrayList<>();//Dto화된 list

        for(Portfolio p : tempList){
            returnList.add(portfolioEntityToPortfolioResponseDTO(p));
        }
        return returnList;
    }

//querydsl===============================================================================

    //PortfolioFileDto 생성 필요 uri, name, type만 프론트에서 받으면 될듯
    //public void uploadPortfolio(PortfolioSaveDto portfolioSaveDto, PortfolioFileDto portfolioFileDto

    public Portfolio uploadPortfolio(PortfolioSaveDto portfolioSaveDto) {
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

        for (Portfolio p : portfolioList) {
            portfolioDtos.add(portfolioEntityToPortfolioResponseDTO(p));
        }
        return portfolioDtos;
    }

    //특정 가게 전체 포트폴리오 가져오기
    public List<PortfolioResponseDto> getPortfoliosBySellerId(Long sellerId) {

        List<Portfolio> portfolioList = portfolioRepository.findBySellerId(sellerId);

        List<PortfolioResponseDto> portfolioDtos = new ArrayList<>();

        for (Portfolio p : portfolioList) {
            portfolioDtos.add(portfolioEntityToPortfolioResponseDTO(p));
        }

        return portfolioDtos;
    }

    //포트폴리오 수정
    @Transactional
    public Portfolio modifyPortfolio(PortfolioUpdateDto portfolioUpdateDto) {
        Objects.requireNonNull(portfolioUpdateDto, "PortfolioUpdateDto must not be null");

        Portfolio portfolio = portfolioRepository.findById(portfolioUpdateDto.getId())
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

        portfolio.setGender(portfolioUpdateDto.getGender());
        portfolio.setSituation(portfolioUpdateDto.getSituation());
        portfolio.setAgeGroup(portfolioUpdateDto.getAgeGroup());
        portfolio.setSize(portfolioUpdateDto.getSize());
        portfolio.setColor(portfolioUpdateDto.getColor());
        portfolio.setShape(portfolioUpdateDto.getShape());
        portfolio.setSheetTaste(portfolioUpdateDto.getSheetTaste());
        portfolio.setCreamTaste(portfolioUpdateDto.getCreamTaste());
        portfolio.setDetail(portfolioUpdateDto.getDetail());

        //save없이 자동 저장?
        return portfolio;
    }

    //포트폴리오 삭제
    public void deletePortfolio(Long id) {
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));
        portfolioRepository.delete(portfolio);
    }

    // 포트폴리오 id리스트를 받아 해당하는 포트폴리오responsedto리스트 반환
    // wishList에서 사용될예정
    public List<PortfolioResponseDto> getPortfolioResponseListByBuyerId(List<Long> portfolioIdList) {

        List<PortfolioResponseDto> returnList = new ArrayList<>();
        List<Portfolio> portfolioList = new ArrayList<>();

        for (long id : portfolioIdList)
            portfolioList.add(portfolioRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Portfolio not found")));

        for (Portfolio portfolio : portfolioList) {
            returnList.add(portfolioEntityToPortfolioResponseDTO(portfolio));
        }

        return returnList;
    }

    //새로 등록하기 위한 porfolioSaveDto 를 Portfolio Entity로 변환
    public Portfolio portfolioSaveDtoToEntity(PortfolioSaveDto portfolioSaveDto) throws NoSuchElementException {
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
    public PortfolioResponseDto portfolioEntityToPortfolioResponseDTO(Portfolio portfolio) {
        return PortfolioResponseDto.builder().
                id(portfolio.getId()).
                sellerId(portfolio.getId()).
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

