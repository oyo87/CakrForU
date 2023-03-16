package com.a604.cake4u.buyer.controller;

import com.a604.cake4u.buyer.dto.BuyerLoginDto;
import com.a604.cake4u.buyer.dto.BuyerResponseDto;
import com.a604.cake4u.buyer.dto.BuyerSaveRequestDto;
import com.a604.cake4u.buyer.dto.BuyerUpdatePasswordDto;
import com.a604.cake4u.buyer.service.BuyerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Api("Buyer Controller")
@RequiredArgsConstructor
@RestController
@RequestMapping("/buyer")
public class BuyerController {

    private final BuyerService buyerService;

    @ApiOperation(value = "회원가입", notes = "req_data : [email, password, nickname, gender, birthDate, phoneNumber]")
    @PostMapping("/signup")
    public ResponseEntity<?> signUpBuyer(@RequestBody BuyerSaveRequestDto buyerSaveRequestDto){

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
    public ResponseEntity<?> loginBuyer(@RequestBody BuyerLoginDto tryLoginDto) throws Exception {
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

    @ApiOperation(value = "비밀번호 변경", notes = "req_data : [email, prePassword, newPassword]")
    @PutMapping("/update")
    public ResponseEntity<?> changePassword(@RequestBody BuyerUpdatePasswordDto buyerUpdatePasswordDto){
        buyerService.updatePassword(buyerUpdatePasswordDto);

        Map<String, Object> responseResult = new HashMap<>();

        responseResult.put("result", true);
        responseResult.put("msg", "비밀번호 수정 성공");

        return ResponseEntity.status(HttpStatus.OK).body(responseResult);
    }

    @ApiOperation(value = "회원 정보 조회", notes = "req_data : [id]")
    @GetMapping("/{id}")
    public ResponseEntity<?> showBuyerInfo(@PathVariable @RequestBody Long id){

        BuyerResponseDto buyerResponseDto = buyerService.showBuyerInfo(id);

        Map<String, Object> responseResult = new HashMap<>();

        responseResult.put("result", true);
        responseResult.put("msg", "회원정보 조회 성공");
        responseResult.put("buyerInfo", buyerResponseDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseResult);
    }

}
