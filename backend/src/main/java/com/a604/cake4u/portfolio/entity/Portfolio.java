package com.a604.cake4u.portfolio.entity;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.imagefile.entity.ImageFile;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.seller.entity.Seller;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

@Entity
@Table(name="portfolio")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Portfolio {
    @SequenceGenerator(
            name="PORTFOLIO_SEQ_GEN",
            sequenceName = "PORTFOLIO_SEQ",
            initialValue = 10000,
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PORTFOLIO_SEQ_GEN")
    @Column(nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
    private Seller seller;

    //  포트폴리오에서 파일로 접근 가능하도록 참조자
    @OneToMany(mappedBy = "portfolio", fetch = EAGER)
    @Builder.Default
    private List<ImageFile> imageFileList = new ArrayList<>();
    @Column(nullable = false)
    private int hit;
    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EGender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ESituation situation;
    @Column(name="age_group", nullable = false)
    private int ageGroup;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ESheetSize size;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EColor color;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ESheetShape shape;
    @Enumerated(EnumType.STRING)
    @Column(name="sheet_taste", nullable = false)
    private ESheetTaste sheetTaste;
    @Enumerated(EnumType.STRING)
    @Column(name="cream_taste", nullable = false)
    private ECreamTaste creamTaste;
    @Column(nullable = false)
    private String detail;
    public void addPortfolioImageFile(ImageFile imageFile) {
        this.imageFileList.add(imageFile);
    }

    public PortfolioResponseDto toDto() {
        return PortfolioResponseDto.builder()
                .id(this.id)
                .sellerId(this.seller.getId())
                .hit(this.hit)
                .createdAt(this.createdAt)
                .gender(this.gender)
                .situation(this.situation)
                .ageGroup(this.ageGroup)
                .size(this.size)
                .color(this.color)
                .shape(this.shape)
                .sheetTaste(this.sheetTaste)
                .creamTaste(this.creamTaste)
                .detail(this.detail)
                .build();
    }
}
