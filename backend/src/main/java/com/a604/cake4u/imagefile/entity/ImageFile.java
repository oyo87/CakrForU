package com.a604.cake4u.imagefile.entity;

import com.a604.cake4u.enums.EImageFileType;
import com.a604.cake4u.orders.entity.OrderSheet;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.seller.entity.Seller;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class ImageFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_sheet_id", referencedColumnName = "id")
    private OrderSheet orderSheet;
    @ManyToOne
    @JoinColumn(name = "portfolio_id", referencedColumnName = "id")
    private Portfolio portfolio;
    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "id")
    private Seller seller;
    
    //  S3에 저장될 URL
    @Column(nullable = false)
    private String imageFileUri;
    
    //  S3에 저장될 이름
    @Column(nullable = false)
    private String savedFileName;
    
    //  원본 파일 이름
    @Column(nullable = false)
    private String origImageFileName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EImageFileType imageFileType;
}
