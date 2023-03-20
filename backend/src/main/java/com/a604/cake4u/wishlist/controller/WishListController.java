package com.a604.cake4u.wishlist.controller;

import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.wishlist.dto.WishListRequestDto;
import com.a604.cake4u.wishlist.service.WishListService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//Todo; swagger test 필요

@Api("Buyer Controller")
@RequiredArgsConstructor
@RestController("/wish")
public class WishListController {

    @Autowired
    private WishListService wishListService;

    @ApiOperation(value = "찜목록 추가", notes = "req_data=[Long Buyer_id, Long Portfolio_id]")
    @PostMapping("/")
    public ResponseEntity<?> addWish(@RequestBody  WishListRequestDto wishListRequestDto){
        wishListService.saveWish(wishListRequestDto);


        return ResponseEntity.status(HttpStatus.OK).body(new HashMap<>(){{
            put("result", true);
            put("msg", "찜등록 성공");
        }});
    }

    @ApiOperation(value = "찜목록 삭제", notes = "req_data=[Long Buyer_id, Long Portfolio_id]")
    @DeleteMapping("/")
    public ResponseEntity<?> deleteWish(@RequestBody WishListRequestDto wishListRequestDto){
        wishListService.deleteWish(wishListRequestDto);

        return ResponseEntity.status(HttpStatus.OK).body(new HashMap<>(){{
            put("result", true);
            put("msg", "찜삭제 성공");
        }});
    }


    @ApiOperation(value = "회원이 찜한 목록 조회", notes = "req_data=[Long Buyer_id]")
    @GetMapping("/b/{buyer_id}")
    public ResponseEntity<?> showWishListEachBuyer(@PathVariable Long buyer_id){

        List<Long> portfolios = wishListService.getWishPortfolio(buyer_id);
        return ResponseEntity.status(HttpStatus.OK).body(new HashMap<>(){{
            put("result", true);
            put("msg", "찜 목록 조회 성공");
            put("wishlist", portfolios);
        }});
    }


    @ApiOperation(value = "포트폴리오 찜 개수 조회", notes = "req_data=[Long portfolio_id]")
    @GetMapping("/p/{portfolio_id}")
    public ResponseEntity<?> showWishCnt(@PathVariable Long portfolio_id){

        int getWishPortfolioCnt = wishListService.getWishMemberCnt(portfolio_id);
        return ResponseEntity.status(HttpStatus.OK).body(new HashMap<>(){{
            put("result", true);
            put("msg", "찜 목록 조회 성공");
            put("wishlistCnt", getWishPortfolioCnt);
        }});
    }


}
