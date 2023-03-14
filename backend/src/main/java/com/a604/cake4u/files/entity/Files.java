package com.a604.cake4u.files.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Files {

    @Id
    private Long id;
    private Orders orderSheet;
    private Cake cake;
    private Seller seller;
    @Column(nullable = false)
    private String fileUri;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    public String fileType;
}
