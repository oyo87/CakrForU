package com.a604.cake4u.buyer.controller;

import com.a604.cake4u.buyer.dto.BuyerLoginDto;
import com.a604.cake4u.buyer.dto.BuyerSaveRequestDto;
import com.a604.cake4u.buyer.service.BuyerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Api("Account Controller")
@RequiredArgsConstructor
@RestController
@RequestMapping("/buyer")
public class BuyerController {

    private final BuyerService buyerService;
    @ApiOperation(value = "회원가입", notes = "req_data : [email, password]")
    @PostMapping("/signup")
    public ResponseEntity<?> signUpBuyer(BuyerSaveRequestDto buyerSaveRequestDto){

        int result = buyerService.saveBuyer(buyerSaveRequestDto);

        Map<String, Object> resultMsg = new HashMap<>();

        resultMsg.put("result", false);
        resultMsg.put("msg", "회원가입 실패");
        HttpStatus sts = HttpStatus.UNAUTHORIZED;

        if(result == 1){
            resultMsg.put("result", true);
            resultMsg.put("msg", "회원가입 성공");
            sts = HttpStatus.OK;
        }

        return ResponseEntity.status(sts).body(resultMsg);
    }

    @ApiOperation(value = "로그인", notes = "req_data : [email, password]")
    @PostMapping("/login")
    public ResponseEntity<?> loginBuyer(BuyerLoginDto tryLoginDto) throws Exception {
        //Todo; 토큰 받아올 것
        Map<String, Object> info = buyerService.login(tryLoginDto);
        Map<String, Object> responseResult = new HashMap<>();

        HttpStatus sts = HttpStatus.BAD_REQUEST;

//        if (token != null) {
            sts = HttpStatus.OK;
            responseResult.put("result", true);
            responseResult.put("msg", "로그인을 성공하였습니다.");
//           responseResult.put("access-token", info.get("access-token"));
//           responseResult.put("refresh-token", info.get("refresh-token"));
//            responseResult.put("responseDto", info.get("buyer-response-dto"))
//        }

        return ResponseEntity.status(sts).body(responseResult);
    }
}
