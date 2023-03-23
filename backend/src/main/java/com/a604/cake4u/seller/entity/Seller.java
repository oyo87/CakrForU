package com.a604.cake4u.seller.entity;

import com.a604.cake4u.enums.EGender;
import com.a604.cake4u.imagefile.entity.ImageFile;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

@Getter
@Setter
@Entity
@Table(name = "seller")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Seller {
    @SequenceGenerator(
            name="SELLER_SEQ_GEN",
            sequenceName = "SELLER_SEQ",
            initialValue = 100,
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SELLER_SEQ_GEN")
    private Long id;
    //  기본이 최대 255자
    @Column(unique = false, nullable = false)
    private String email;

    @Column(nullable = false, length = 30)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EGender gender;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private String roadAddress;

    @Column(nullable = false)
    private String detailedAddress;

    @Column(nullable = false, length = 10)
    private String dongCode;

    @Column(nullable = false, length = 40)
    private String buildingName;

    @Column(nullable = false, length = 12)
    private String phoneNumber;

    @Column(nullable = false, length = 60)
    private String name;

    @Column(nullable = false, unique = true, length = 10)
    private String businessNumber;

    @Column(nullable = false)
    private String businessLocation;

    @Column(nullable = false, length = 60)
    private String businessName;

    @Column(nullable = false, length = 1024)
    private String contact; //  문의 계정

    @ColumnDefault("0")
    @Column(nullable = true)
    private int totalScore = 0 ;

    @ColumnDefault("0")
    @Column(nullable = true)
    private int reviewCnt = 0;

    @ColumnDefault("0.0")
    @Column(nullable = true)
    private double averageScore;

    @Column(nullable = false, length = 100)
    private String account;

    @Column(nullable = true, length = 300)
    private String refreshToken;

    @Column(nullable = false, length = 1000)
    private String businessDescription;

    //  판매자에서 파일로 접근 가능하도록 참조자
    @OneToMany(mappedBy = "seller", fetch = EAGER)
    @Builder.Default
    private List<ImageFile> imageFileList = new ArrayList<>();

    public void addSellerImageFile(ImageFile imageFile) {
        this.imageFileList.add(imageFile);
    }
}
