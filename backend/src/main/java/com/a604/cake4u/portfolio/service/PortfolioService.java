package com.a604.cake4u.portfolio.service;

import com.a604.cake4u.enums.EImageFileType;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.exception.ErrorMessage;
import com.a604.cake4u.imagefile.entity.ImageFile;
import com.a604.cake4u.imagefile.repository.ImageFileRepository;
import com.a604.cake4u.portfolio.dto.CakeFilter;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.dto.PortfolioSaveDto;
import com.a604.cake4u.portfolio.dto.PortfolioUpdateDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.entity.QPortfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.portfolio.repository.PortfolioRepositoryCustom;
import com.a604.cake4u.imagefile.handler.S3ImageFileHandler;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

import static com.a604.cake4u.exception.ErrorMessage.NOT_STORE_FILE;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PortfolioService implements PortfolioRepositoryCustom{

    private final PortfolioRepository portfolioRepository;
    private final SellerRepository sellerRepository;
    private final ImageFileRepository imageFileRepository;
    private final S3ImageFileHandler s3ImageFileHandler;
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PortfolioResponseDto> findPortfolioCakeFilter(CakeFilter cakeFilter) {

        QPortfolio portfolio = QPortfolio.portfolio;
        BooleanExpression whereClause = portfolio.isNotNull();

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

    @Transactional
    public Long uploadPortfolio(PortfolioSaveDto portfolioSaveDto, List<MultipartFile> files) {
        Long ret = -1L;
        //  Seller Entity 찾아내기
        Seller seller = sellerRepository.findById(portfolioSaveDto.getSellerId()).orElseThrow(() -> new BaseException(ErrorMessage.NO_SELLER_INFO));
        log.info("seller = " + seller);
        
        Portfolio portfolio = Portfolio.builder()
                .seller(seller)
                .gender(portfolioSaveDto.getGender())
                .situation(portfolioSaveDto.getSituation())
                .ageGroup(portfolioSaveDto.getAgeGroup())
                .size(portfolioSaveDto.getSize())
                .shape(portfolioSaveDto.getShape())
                .color(portfolioSaveDto.getColor())
                .sheetTaste(portfolioSaveDto.getSheetTaste())
                .creamTaste(portfolioSaveDto.getCreamTaste())
                .detail(portfolioSaveDto.getDetail())
                .createdAt(LocalDate.now())
                .hit(0)
                .build();

        try {
            List<ImageFile> imageFileList = s3ImageFileHandler.parseFileInfo(files);
            ret = portfolioRepository.save(portfolio).getId();

            //  파일이 존재하면 처리
            if(!imageFileList.isEmpty()) {
                for(ImageFile imageFile : imageFileList) {
                    //  파일을 DB에 저장
                    imageFile.setPortfolio(portfolio); //  사진에 포트폴리오 등록
                    imageFile.setImageFileType(EImageFileType.PORTFOLIO_CAKE);   //  사진 유형 등록
                    portfolio.addPortfolioImageFile(imageFile); //  포트폴리오에 사진 등록
                    imageFileRepository.save(imageFile); //  파일을 DB에 등록
                }
            }
        } catch(IOException e) {
            e.printStackTrace();
            throw new BaseException(NOT_STORE_FILE);
        } finally {
            return ret;
        }
    }

    public PortfolioResponseDto getPortfolio(Long id) {
        Portfolio portfolio = portfolioRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

        return portfolioEntityToPortfolioResponseDTO(portfolio);
    }

    public List<PortfolioResponseDto> getAllPortfolios(int page) {

        Page<Portfolio> portfolioList = portfolioRepository.findAll(PageRequest.of(page, 20, Sort.by("id").descending()));
        List<Portfolio> portfolios = portfolioList.getContent();
        List<PortfolioResponseDto> portfolioDtos = new ArrayList<>();

        for (Portfolio p : portfolios) {
            portfolioDtos.add(portfolioEntityToPortfolioResponseDTO(p));
        }
        return portfolioDtos;
    }

    public List<PortfolioResponseDto> getPortfoliosByOrderByHitDesc() {

        List<Portfolio> portfolioList = portfolioRepository.findAllByOrderByHitDesc();

        List<PortfolioResponseDto> portfolioDtos = new ArrayList<>();

        for(int i=0;i<5;i++) {
            portfolioDtos.add(portfolioEntityToPortfolioResponseDTO(portfolioList.get(i)));
        }

        return portfolioDtos;
    }

    public List<PortfolioResponseDto> getPortfoliosBySellerId(Long sellerId) {

        List<Portfolio> portfolioList = portfolioRepository.findBySellerId(sellerId);

        List<PortfolioResponseDto> portfolioDtos = new ArrayList<>();

        for (Portfolio p : portfolioList) {
            portfolioDtos.add(portfolioEntityToPortfolioResponseDTO(p));
        }

        return portfolioDtos;
    }

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

        return portfolio;
    }

    public void deletePortfolio(Long id) {
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));
        portfolioRepository.delete(portfolio);
    }

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

    public Portfolio portfolioSaveDtoToEntity(PortfolioSaveDto portfolioSaveDto) throws NoSuchElementException {
        Optional<Seller> sellerOptional = sellerRepository.findById(portfolioSaveDto.getSellerId());
        if (sellerOptional.isPresent()) {
            Seller seller = sellerOptional.get();
            return Portfolio.builder()
                    .seller(seller)
                    .hit(0)
                    .createdAt(LocalDate.now())
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

    public List<PortfolioResponseDto> findPopularBySeller(Long sellerId){
        List<Portfolio> portfolios = portfolioRepository.findTop5PortfolioBySellerOrderByHit(sellerRepository.findById(sellerId).get());
        List<PortfolioResponseDto> res = 
    }

    public PortfolioResponseDto portfolioEntityToPortfolioResponseDTO(Portfolio portfolio) {
        return PortfolioResponseDto.builder().
                id(portfolio.getId()).
                sellerId(portfolio.getId()).
                businessName(portfolio.getSeller().getBusinessName()).
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
                imageUrl(imageFileRepository.findURLsByPortfolioId(portfolio.getId()).get()).
                build();

    }

}

