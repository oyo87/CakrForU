package com.a604.cake4u.buyer.controller;

import com.a604.cake4u.auth.config.AppProperties;
import com.a604.cake4u.auth.entity.AuthReqModel;
import com.a604.cake4u.auth.entity.UserPrincipal;
import com.a604.cake4u.auth.service.AuthToken;
import com.a604.cake4u.auth.service.AuthTokenProvider;
import com.a604.cake4u.auth.service.CustomUserDetailsService;
import com.a604.cake4u.auth.util.CookieUtil;
import com.a604.cake4u.buyer.dto.BuyerInfoDto;
import com.a604.cake4u.buyer.dto.BuyerLoginDto;
import com.a604.cake4u.buyer.dto.BuyerSaveRequestDto;
import com.a604.cake4u.buyer.dto.BuyerUpdatePasswordDto;
import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.buyer.service.BuyerService;
import com.a604.cake4u.exception.BaseException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames.REFRESH_TOKEN;

@Api("Buyer Controller")
@RequiredArgsConstructor
@RestController
@RequestMapping("/buyer")
public class BuyerController {

    private final BuyerService buyerService;
    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final BuyerRepository buyerRepository;
    private final CustomUserDetailsService customUserDetailsService;

    @ApiOperation(value = "회원가입", notes = "req_data : [email, password, nickname, gender, age, phoneNumber]")
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

    @ApiOperation(value="토큰정보얻기")
    @GetMapping("/")
    public ResponseEntity getUser() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Buyer buyer = buyerRepository.findByEmail(principal.getUsername()).get();
        BuyerInfoDto dto = new BuyerInfoDto(buyer.getId(), buyer.getEmail(), buyer.getNickname(), buyer.getPhoneNumber(), buyer.getAge(), buyer.getGender());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @ApiOperation(value = "로그인", notes = "req_data : [email, password]")
    @PostMapping("/login")
    public ResponseEntity<?> loginBuyer
            (HttpServletRequest request,
             HttpServletResponse response,
             @RequestBody AuthReqModel authReqModel) {
        try{
            customUserDetailsService.loadUserByUsername(authReqModel.getId());
        } catch(BaseException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getErrorMessage());
        }

        Authentication authentication;
        try{
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authReqModel.getId(),
                            authReqModel.getPassword()
                    )
            );
        } catch(BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch(InternalAuthenticationServiceException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }

        String userId = authReqModel.getId();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userId,
                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())    // 만료 시점
        );

        // New refresh token
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // userId refresh token 으로 DB 확인
        Buyer buyer = buyerRepository.findByEmail(userId).orElse(null);
        if (buyer == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        String userRefreshToken = buyer.getRefreshToken();
        if (userRefreshToken == null) {
            // 없는 경우 새로 등록
            userRefreshToken = refreshToken.getToken();
            buyer.setRefreshToken(userRefreshToken);
            buyerRepository.saveAndFlush(buyer);
        } else {
            // DB에 refresh 토큰 업데이트
            buyer.setRefreshToken(refreshToken.getToken());
            buyerRepository.saveAndFlush(buyer);
        }

        int cookieMaxAge = (int) refreshTokenExpiry / 60;
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        return ResponseEntity.status(HttpStatus.OK).body(accessToken.getToken());

    }

    @ApiOperation(value = "비밀번호 변경", notes = "req_data : [email, prePassword, newPassword]")
    @PutMapping("/pw")
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

        BuyerInfoDto buyerResponseDto = buyerService.showBuyerInfo(id);

        Map<String, Object> responseResult = new HashMap<>();

        responseResult.put("result", true);
        responseResult.put("msg", "회원정보 조회 성공");
        responseResult.put("buyerInfo", buyerResponseDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseResult);
    }

    @ApiOperation(value = "회원 정보 수정", notes = "req_data : [nickname, phonenumber, age]")
    @PutMapping("/info")
    public ResponseEntity<?> changeInfo(@RequestBody BuyerInfoDto buyerInfoDto){
        buyerService.updateBuyerInfo(buyerInfoDto);

        Map<String, Object> responseResult = new HashMap<>();

        responseResult.put("result", true);
        responseResult.put("msg", "회원정보 수정 성공");

        return ResponseEntity.status(HttpStatus.OK).body(responseResult);
    }
}
