package com.a604.cake4u.seller.dto;

import com.a604.cake4u.enums.EGender;
import com.a604.cake4u.seller.entity.Seller;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class SellerSaveRequestDto {
    private String email;
    private String password;
    private EGender gender;
    private LocalDate birthDate;
    private String roadAddress;
    private String detailedAddress;
    private String dongCode;
    private String buildingName;
    private String phoneNumber;
    private String name;
    private String businessNumber;
    private String businessLocation;
    private String businessName;
    private String contact;
    private String account;
    private String businessDescription;

    public SellerSaveRequestDto(String email, String password, EGender gender, LocalDate birthDate, String roadAddress, String detailedAddress, String dongCode, String buildingName, String phoneNumber, String name, String businessNumber, String businessLocation, String businessName, String contact, String account, String businessDescription) {
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.birthDate = birthDate;
        this.roadAddress = roadAddress;
        this.detailedAddress = detailedAddress;
        this.dongCode = dongCode;
        this.buildingName = buildingName;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.businessNumber = businessNumber;
        this.businessLocation = businessLocation;
        this.businessName = businessName;
        this.contact = contact;
        this.account = account;
        this.businessDescription = businessDescription;
    }

    public Seller toEntity() {
        return Seller.builder()
                .email(email)
                .password(password)
                .gender(gender)
                .birthDate(birthDate)
                .roadAddress(roadAddress)
                .detailedAddress(detailedAddress)
                .dongCode(dongCode)
                .buildingName(buildingName)
                .phoneNumber(phoneNumber)
                .name(name)
                .businessNumber(businessNumber)
                .businessLocation(businessLocation)
                .businessName(businessName)
                .contact(contact)
                .account(account)
                .businessDescription(businessDescription)
                .build();
    }
}
