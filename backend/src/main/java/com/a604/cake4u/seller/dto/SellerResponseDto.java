package com.a604.cake4u.seller.dto;

import com.a604.cake4u.seller.entity.Seller;
import lombok.Getter;

@Getter
public class SellerResponseDto {
    private String email;
    private String roadAddress;
    private String detailedAddress;
    private String buildingName;
    private String phoneNumber;
    private String name;
    private String businessNumber;
    private String businessLocation;
    private String businessName;
    private String contact;
    private String account;
    private String businessDescription;

    public SellerResponseDto(Seller seller) {
        this.email = seller.getEmail();
        this.roadAddress = seller.getRoadAddress();
        this.detailedAddress = seller.getDetailedAddress();
        this.buildingName = seller.getBuildingName();
        this.phoneNumber = seller.getPhoneNumber();
        this.name = seller.getName();
        this.businessNumber = seller.getBusinessNumber();
        this.businessLocation = seller.getBusinessLocation();
        this.businessName = seller.getBusinessName();
        this.contact = seller.getContact();
        this.account = seller.getAccount();
        this.businessDescription = seller.getBusinessDescription();
    }
}
