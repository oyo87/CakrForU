package com.a604.cake4u.area.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "dong_code")
@Setter
@Getter
public class DongCode {
    @Id
    @Column(name = "dong_code", length = 10, nullable = false)
    private String dongCode;
    @Column(name="sido_name", length = 30)
    private String sidoName;
    @Column(name="gugun_name", length = 30)
    private String gugunName;
    @Column(name="dong_name", length = 30)
    private String dongName;
}
