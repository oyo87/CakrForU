package com.a604.cake4u.wishlist.entity;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.portfolio.entity.Portfolio;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="wishlist")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wishlist {
    @SequenceGenerator(
            name="WISHLIST_SEQ_GEN",
            sequenceName = "WISHLIST_SEQ",
            initialValue = 100,
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "WISHLIST_SEQ_GEN")
    @Column(nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "buyer_id", referencedColumnName = "id", nullable = false)
    private Buyer buyer;
    @ManyToOne
    @JoinColumn(name = "portfolio_id", referencedColumnName = "id", nullable = false)
    private Portfolio portfolio;
}
