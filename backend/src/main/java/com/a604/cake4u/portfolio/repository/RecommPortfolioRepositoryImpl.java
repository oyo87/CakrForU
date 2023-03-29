package com.a604.cake4u.portfolio.repository;

import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.entity.QPortfolio;
import com.a604.cake4u.recommendation.dto.RecommendationFilter;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class  RecommPortfolioRepositoryImpl implements RecommPortfolioRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PortfolioResponseDto> findPortfolioRecommended(RecommendationFilter recommendationFilter) {
        QPortfolio portfolio = QPortfolio.portfolio;

        //  null 체크
        //  recommendationFilter의 각 필드의 null 여부를 확인하고, 해당 필드에 대한 검색 조건이 있으면  whereClause에 추가
        BooleanExpression whereClause = portfolio.isNotNull();  //  조건 where절

        //  if 연산으로 선택한 필터와 일치하는 지 확인하는 조건 추가
        if(recommendationFilter.getHit() != null)
            whereClause = whereClause.and(portfolio.hit.goe(recommendationFilter.getHit()));
        if(recommendationFilter.getFrom() != null)
            whereClause = whereClause.and(portfolio.createdAt.after(recommendationFilter.getFrom()));
        if(recommendationFilter.getTo() != null)
            whereClause = whereClause.and(portfolio.createdAt.before(recommendationFilter.getTo()));
        if(recommendationFilter.getGender() != null)
            whereClause = whereClause.and(portfolio.gender.eq(recommendationFilter.getGender()));
        if(recommendationFilter.getSituation() != null)
            whereClause = whereClause.and(portfolio.situation.eq(recommendationFilter.getSituation()));
        if(recommendationFilter.getAgeGroup() != null)
            whereClause = whereClause.and(portfolio.ageGroup.eq(recommendationFilter.getAgeGroup()));
        if(recommendationFilter.getSize() != null)
            whereClause = whereClause.and(portfolio.size.eq(recommendationFilter.getSize()));
        if(recommendationFilter.getColor() != null)
            whereClause = whereClause.and(portfolio.color.eq(recommendationFilter.getColor()));
        if(recommendationFilter.getShape() != null)
            whereClause = whereClause.and(portfolio.shape.eq(recommendationFilter.getShape()));
        if(recommendationFilter.getSheetTaste() != null)
            whereClause = whereClause.and(portfolio.sheetTaste.eq(recommendationFilter.getSheetTaste()));
        if(recommendationFilter.getCreamTaste() != null)
            whereClause = whereClause.and(portfolio.creamTaste.eq(recommendationFilter.getCreamTaste()));

        //  조건에 맞는 Entity List
        List<Portfolio> tmpList = queryFactory.selectFrom(portfolio)
                .where(whereClause)
                .fetch();
        
        List<PortfolioResponseDto> recommPortfolioList = new ArrayList<>();    //  DTO화된 리스트
        for(Portfolio p : tmpList)
            recommPortfolioList.add(p.toDto());

        return recommPortfolioList;
    }
}
