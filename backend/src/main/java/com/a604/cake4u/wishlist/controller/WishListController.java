package com.a604.cake4u.wishlist.controller;

import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.service.PortfolioService;
import com.a604.cake4u.wishlist.dto.WishListRequestDto;
import com.a604.cake4u.wishlist.service.WishListService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Api("WishList Controller")
@RequiredArgsConstructor
@RestController
@RequestMapping(("/wish"))
public class WishListController {


    private final WishListService wishListService;

    private final PortfolioService portfolioService;

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

        List<Long> portfolioIds = wishListService.getWishPortfolio(buyer_id);

        List<PortfolioResponseDto> portfolios = portfolioService.getPortfolioResponseListByBuyerId(portfolioIds);
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

    @ApiOperation(value = "포트폴리오 찜 상위 5개", notes = "포트폴리오 중 찜을 많이 받은 상위 5개의 포트폴리오 정보를 반환합니다")
    @GetMapping("/top5")
    public ResponseEntity<?> showTop5PortFolioList(){

        List<Long> portfolioList = wishListService.getWishPortfolioIdTop5();

        List<PortfolioResponseDto> portfoliotop5 = portfolioService.getPortfolioResponseListByBuyerId(portfolioList);
        return ResponseEntity.status(HttpStatus.OK).body(new HashMap<>(){{
            put("result", true);
            put("msg", "상위 5개 조회 성공");
            put("wishlistCnt", portfoliotop5);
        }});
    }

    @ApiOperation(value = "마이페이지 찜목록 페이지네이션", notes = "req_data=[int page, Long id]")
    @GetMapping("/mylist/{id}")
    public ResponseEntity<?> showPageList(@PathVariable Long id, @RequestParam int page){
        List<Portfolio> res = wishListService.getPortfoliosByBuyerId(id, page);
        return ResponseEntity.status(HttpStatus.OK).body(new HashMap<>(){{
            put("result", true);
            put("msg", "찜목록 리스트입니다");
            put("wishlist", res);
        }});
    }



}
