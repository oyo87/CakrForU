package com.a604.cake4u.auth.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum RoleType {
    BUYER("BUYER", "구매자 권한"),
    SELLER("SELLER", "판매자 권한"),
    ADMIN("ROLE_ADMIN", "관리자 권한"),
    GUEST("GUEST", "게스트 권한");

    private final String code;
    private final String displayName;

    public static RoleType of(String code) {
        return Arrays.stream(RoleType.values())
                .filter(r -> r.getCode().equals(code))
                .findAny()
                .orElse(GUEST);
    }
    public String getRole(){
        return "ROLE_" + getCode();
    }
}
