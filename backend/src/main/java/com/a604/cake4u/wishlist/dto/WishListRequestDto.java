package com.a604.cake4u.wishlist.dto;

import com.a604.cake4u.wishlist.entity.Wishlist;
import lombok.*;

@Getter
@Setter
@Builder
//@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WishListRequestDto {

    private Long buyer_id;

    private Long portfolio_id;


}
