package com.a604.cake4u.orders.dto.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderSheetMailVO {
    private int price;  //  케이크 가격
    private LocalDate dueDate;  //  입금 기한

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("가격 : %d\n입금 기한 : %s\n", price, dueDate.toString()));
        return sb.toString();
    }
}
