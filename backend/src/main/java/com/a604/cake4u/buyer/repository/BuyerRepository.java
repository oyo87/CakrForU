package com.a604.cake4u.buyer.repository;

import com.a604.cake4u.buyer.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long> {

    Optional<Buyer> findByEmail(String email); //로그인

}
