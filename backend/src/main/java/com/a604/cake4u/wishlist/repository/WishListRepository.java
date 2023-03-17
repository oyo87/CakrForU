package com.a604.cake4u.wishlist.repository;

import com.a604.cake4u.wishlist.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepository extends JpaRepository<Wishlist, Long> {
}
