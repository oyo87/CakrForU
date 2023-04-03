package com.a604.cake4u.seller.dto;

import com.a604.cake4u.seller.entity.Seller;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class SellerResponseDto {
    private Long id;
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
    private String userType = "seller";
    @Setter
    private List<String> imageUrls;
    public SellerResponseDto(Long id, String email, String roadAddress, String detailedAddress, String buildingName, String phoneNumber, String name, String businessNumber, String businessLocation, String businessName, String contact, String account, String businessDescription, List<String> imageUrls) {
        this.id = id;
        this.email = email;
        this.roadAddress = roadAddress;
        this.detailedAddress = detailedAddress;
        this.buildingName = buildingName;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.businessNumber = businessNumber;
        this.businessLocation = businessLocation;
        this.businessName = businessName;
        this.contact = contact;
        this.account = account;
        this.businessDescription = businessDescription;
        this.imageUrls = imageUrls;
    }

    public SellerResponseDto(Seller seller) {
        this.id = seller.getId();
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
