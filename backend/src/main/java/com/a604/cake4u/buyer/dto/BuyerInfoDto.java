package com.a604.cake4u.buyer.dto;

<<<<<<< HEAD
import io.swagger.annotations.ApiParam;
import lombok.*;

import java.time.LocalDate;
=======
import com.a604.cake4u.auth.entity.ProviderType;
import com.a604.cake4u.enums.EGender;
import io.swagger.annotations.ApiParam;
import lombok.*;

>>>>>>> cc874fc69885f103e362668430f73ae0503f9e8d

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerInfoDto {

<<<<<<< HEAD
=======
    @ApiParam
    private Long id;

>>>>>>> cc874fc69885f103e362668430f73ae0503f9e8d
    @ApiParam(value="이메일", required = true)
    private String email;
    @ApiParam(value="변경된 닉네임")
    private String nickname;
    @ApiParam(value="변경된 핸드폰 번호")
    private String phoneNumber;

    @ApiParam(value="변경된 생일")
<<<<<<< HEAD
    private LocalDate birthDate;
=======
    private int age;

    @ApiParam
    private EGender gender;

    @ApiParam
    private ProviderType providerType;
    @ApiParam
    private String userType;
>>>>>>> cc874fc69885f103e362668430f73ae0503f9e8d

}
