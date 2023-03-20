package com.a604.cake4u.wishlist.service;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.wishlist.dto.WishListRequestDto;
import com.a604.cake4u.wishlist.entity.Wishlist;
import com.a604.cake4u.wishlist.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WishListService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private WishListRepository wishListRepository;

    public void saveWish(WishListRequestDto wishListRequestDto){

        Optional<Buyer> buyer = buyerRepository.findById(wishListRequestDto.getBuyer_id());
        Optional<Portfolio> portfolio = portfolioRepository.findById(wishListRequestDto.getPortfolio_id());

        Wishlist wishlist = Wishlist.builder()
                .buyer(buyer.get())
                .portfolio(portfolio.get()).build();

        wishListRepository.save(wishlist);
    }


    public void deleteWish(WishListRequestDto wishListRequestDto){
        Optional<Buyer> buyer = buyerRepository.findById(wishListRequestDto.getBuyer_id());
        Optional<Portfolio> portfolio = portfolioRepository.findById(wishListRequestDto.getPortfolio_id());

        Wishlist wishlist = wishListRepository.findByBuyerAndPortfolio(buyer.get(), portfolio.get());

        wishListRepository.delete(wishlist);
    }

    public List<Long> getWishPortfolio(Long buyerId){

        Optional<Buyer> buyer = buyerRepository.findById(buyerId);

        List<Long> wishPortfolioIdList = wishListRepository.findAllByBuyer(buyer.get());

        return wishPortfolioIdList;
    }

    public int getWishMemberCnt(Long portfolio_id){

        Optional<Portfolio> portfolio = portfolioRepository.findById(portfolio_id);

        int wishMemeberCnt = wishListRepository.getWishPortfolioCnt(portfolio.get());

        return wishMemeberCnt;
    }


    public List<Long> getWishPortfolioIdTop5(){

        List<Long> wishPortfolioIdTop5 = wishListRepository.findAllTop5();

        return wishPortfolioIdTop5;
    }


}
