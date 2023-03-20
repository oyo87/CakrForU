package com.a604.cake4u.wishlist.repository;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.wishlist.dto.WishListRequestDto;
import com.a604.cake4u.wishlist.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<Wishlist, Long> {

    Wishlist findByBuyerAndPortfolio(Buyer buyer, Portfolio portfolio);

    @Query(value = "select w.portfolio.id from Wishlist w where w.buyer = :buyer")
    List<Long> findAllByBuyer(Buyer buyer);

    @Query(value = "SELECT COUNT(*) FROM WISHLIST WHERE PORTFOLIO_ID = :portfolio", nativeQuery = true)
    int getWishPortfolioCnt(Portfolio portfolio);

}
