package com.a604.cake4u.files.entity;

import com.a604.cake4u.orders.entity.Orders;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.seller.entity.Seller;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Files {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "orders_id", referencedColumnName = "id")
    private Orders orderSheet;
    @ManyToOne
    @JoinColumn(name = "portfolio_id", referencedColumnName = "id")
    private Portfolio portfolio;
    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "id")
    private Seller seller;
    @Column(nullable = false)
    private String fileUri;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private String fileType;
}
