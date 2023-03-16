package com.a604.cake4u.area.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sido_code")
@Setter
@Getter
public class SidoCode {
    @Id
    @Column(name = "sido_code", length = 10, nullable = false)
    private String sidoCode;

    @Column(name="sido_name", length = 30)
    private String sidoName;
}
