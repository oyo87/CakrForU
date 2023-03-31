package com.a604.cake4u.wishlist.service;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.wishlist.dto.WishListRequestDto;
import com.a604.cake4u.wishlist.entity.Wishlist;
import com.a604.cake4u.wishlist.repository.WishListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WishListService {

    private final BuyerRepository buyerRepository;

    private final PortfolioRepository portfolioRepository;

    private final WishListRepository wishListRepository;

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

        System.out.println(buyer.toString());

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

    public List<Portfolio> getPortfoliosByBuyerId(Long id, int page){
        Buyer buyer = buyerRepository.findById(id).get();
        Page<Wishlist> wishlists = wishListRepository.findWishlistByBuyerOrderByBuyerDesc(PageRequest.of(page, 5, Sort.by("id").descending()), buyer);
        List<Portfolio> res = new ArrayList<>();
        for(Wishlist wishlist : wishlists){
            res.add(wishlist.getPortfolio());
        }
        return res;
    }

}
