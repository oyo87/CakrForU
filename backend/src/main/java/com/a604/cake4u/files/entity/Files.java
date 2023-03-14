package com.a604.cake4u.files.entity;

import com.a604.cake4u.portfolio.entity.Portfolio;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Files {

    @Id
    private Long id;
    @JoinColumn(name = "orders", referencedColumnName = "id")
    private Orders orderSheet;
    @JoinColumn(name = "portfolio", referencedColumnName = "id")
    private Portfolio portfolio;
    @JoinColumn(name = "seller", referencedColumnName = "id")
    private Seller seller;
    @Column(nullable = false)
    private String fileUri;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    public String fileType;
}
