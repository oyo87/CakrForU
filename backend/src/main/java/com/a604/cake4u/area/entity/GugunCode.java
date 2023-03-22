package com.a604.cake4u.area.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Setter
@Getter
public class GugunCode {
    @Id
    @Column(name = "gugun_code", length = 10, nullable = false)
    private String gugunCode;

    @Column(name="gugun_name", length = 30)
    private String gugunName;
}
