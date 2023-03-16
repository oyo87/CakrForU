package com.a604.cake4u.buyer.dto;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.enums.EGender;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerSaveRequestDto {

    private String email;

    private String password;

    private String nickname;

    private EGender gender;

    private LocalDate birthDate;

    private String phoneNumber;

    public Buyer toEntity(){
        Buyer buyer = Buyer.builder()
                .email(this.email)
                .password(this.password)
                .nickname(this.nickname)
                .gender(this.gender)
                .birthDate(this.birthDate)
                .phoneNumber(this.phoneNumber)
                .build();

        return buyer;
    }

}
