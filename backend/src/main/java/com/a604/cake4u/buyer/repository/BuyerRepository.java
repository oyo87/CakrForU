package com.a604.cake4u.buyer.repository;

import com.a604.cake4u.buyer.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long> {

    Optional<Buyer> findByEmail(String email); //로그인

    Optional<Buyer> findById(Long Id);

}
