package com.a604.cake4u.files.entity;

import com.a604.cake4u.enums.EFileType;
import com.a604.cake4u.orders.entity.Orders;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.seller.entity.Seller;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Files {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "orders_id", referencedColumnName = "id")
    private Orders orders;
    @ManyToOne
    @JoinColumn(name = "portfolio_id", referencedColumnName = "id")
    private Portfolio portfolio;
    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "id")
    private Seller seller;
    
    //  스토리지에 저장될 이름
    @Column(nullable = false)
    private String fileUri;
    
    //  원본 파일 이름
    @Column(nullable = false)
    private String origFileName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EFileType fileType;
}
