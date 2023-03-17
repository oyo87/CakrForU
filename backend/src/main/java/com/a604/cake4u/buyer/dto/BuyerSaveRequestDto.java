package com.a604.cake4u.buyer.dto;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.enums.EGender;
import io.swagger.annotations.ApiParam;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerSaveRequestDto {

    @ApiParam(value="이메일", required = true)
    private String email;

    @ApiParam(value="비밀번호", required = true)
    private String password;

    @ApiParam(value="닉네임", required = true)
    private String nickname;

    @ApiParam(value="성별")
    private EGender gender;

    @ApiParam(value="생일")
    private LocalDate birthDate;

    @ApiParam(value="핸드폰 번호")
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
