package com.a604.cake4u.seller.controller;

import com.a604.cake4u.auth.config.AppProperties;
import com.a604.cake4u.auth.entity.AuthReqModel;
import com.a604.cake4u.auth.entity.UserPrincipal;
import com.a604.cake4u.auth.service.AuthToken;
import com.a604.cake4u.auth.service.AuthTokenProvider;
import com.a604.cake4u.auth.service.CustomUserDetailsService;
import com.a604.cake4u.auth.util.CookieUtil;
import com.a604.cake4u.buyer.dto.BuyerInfoDto;
import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.creamtaste.dto.CreamTasteResponseDto;
import com.a604.cake4u.creamtaste.dto.CreamTasteSaveRequestDto;
import com.a604.cake4u.creamtaste.dto.CreamTasteUpdateRequestDto;
import com.a604.cake4u.creamtaste.service.CreamTasteService;
import com.a604.cake4u.enums.EGender;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.imagefile.repository.ImageFileRepository;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.service.PortfolioService;
import com.a604.cake4u.seller.dto.CustomDto;
import com.a604.cake4u.seller.dto.SellerResponseDto;
import com.a604.cake4u.seller.dto.SellerSaveRequestDto;
import com.a604.cake4u.seller.dto.SellerUpdateDto;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import com.a604.cake4u.seller.service.SellerService;
import com.a604.cake4u.sheetshape.dto.SheetShapeResponseDto;
import com.a604.cake4u.sheetshape.dto.SheetShapeSaveRequestDto;
import com.a604.cake4u.sheetshape.dto.SheetShapeUpdateRequestDto;
import com.a604.cake4u.sheetshape.service.SheetShapeService;
import com.a604.cake4u.sheetsize.dto.SheetSizeResponseDto;
import com.a604.cake4u.sheetsize.dto.SheetSizeSaveRequestDto;
import com.a604.cake4u.sheetsize.dto.SheetSizeUpdateRequestDto;
import com.a604.cake4u.sheetsize.service.SheetSizeService;
import com.a604.cake4u.sheettaste.dto.SheetTasteResponseDto;
import com.a604.cake4u.sheettaste.dto.SheetTasteSaveRequestDto;
import com.a604.cake4u.sheettaste.dto.SheetTasteUpdateRequestDto;
import com.a604.cake4u.sheettaste.entity.SheetTaste;
import com.a604.cake4u.sheettaste.service.SheetTasteService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames.REFRESH_TOKEN;

@RestController
@Api(value = "SellerController")
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/seller")
public class SellerController {

    private final SellerRepository sellerRepository;
    private final ImageFileRepository imageFileRepository;
    private final SellerService sellerService;
    private final PortfolioService portfolioService;
    private final SheetShapeService sheetShapeService;
    private final SheetSizeService sheetSizeService;
    private final SheetTasteService sheetTasteService;
    private final CreamTasteService creamTasteService;
    private final CustomUserDetailsService customUserDetailsService;
    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @ApiOperation(value = "판매자 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signUpSeller(
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "sellerSaveRequestDtoString") String sellerSaveRequestDtoString) {
        Long retId = -1L;
        Map<String, Object> message = new HashMap<>();
        HttpStatus status = null;

        try {
            JSONParser jsonParser = new JSONParser(sellerSaveRequestDtoString);
            Object obj = jsonParser.parse();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.convertValue(obj, Map.class);
            log.info("obj = " + obj);
            log.info("map = " + map);

            SellerSaveRequestDto sellerSaveRequestDto = createSaveRequestDto(map);

            log.info("sellerSaveRequestDto = " + sellerSaveRequestDto);
            retId = sellerService.saveSeller(sellerSaveRequestDto, files);
            log.info("retId = " + retId);

            //가입과 동시에 폼 초기화
            //시트모양 초기화
            SheetShapeSaveRequestDto shape = new SheetShapeSaveRequestDto(retId, false, false, false, false);
            sheetShapeService.saveSheetShape(shape);

            //시트사이즈 초기화
            SheetSizeSaveRequestDto size = new SheetSizeSaveRequestDto(retId, false, false, false, false);
            sheetSizeService.saveSheetSize(size);

            //시트맛 초기화
            SheetTasteSaveRequestDto taste = new SheetTasteSaveRequestDto(retId, false, false, false, false, false, false, false, false, false);
            sheetTasteService.saveSheetTaste(taste);

            //크림맛 초기화
            CreamTasteSaveRequestDto cream = new CreamTasteSaveRequestDto(retId, false, false, false, false, false, false,false,false);
            creamTasteService.saveCreamTaste(cream);

            message.put("result", true);
            message.put("msg", "회원가입 성공");
            status = HttpStatus.OK;
        } catch(Exception e) {
            e.printStackTrace();

            message.put("result", false);
            message.put("msg", "회원가입 실패");
            status = HttpStatus.UNAUTHORIZED;
        } finally {
            return ResponseEntity.status(status).body(message);
        }
    }

    @ApiOperation(value="토큰정보얻기")
    @GetMapping("/")
    public ResponseEntity getUser() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Seller seller = sellerRepository.findByEmail(principal.getUsername()).get();
        SellerResponseDto dto = new SellerResponseDto(seller.getId(), seller.getEmail(), seller.getRoadAddress(),
                seller.getDetailedAddress(), seller.getBuildingName(), seller.getPhoneNumber(), seller.getName(),
                seller.getBusinessNumber(), seller.getBusinessLocation(), seller.getBusinessName(), seller.getContact(),
                seller.getAccount(), seller.getBusinessDescription(), imageFileRepository.findURLsBySellerId(seller.getId()).get());

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @ApiOperation(value = "판매자 로그인")
    @PostMapping("/login")
    public ResponseEntity<?> loginSeller
            (HttpServletRequest request,
             HttpServletResponse response,
             @RequestBody AuthReqModel authReqModel) {
        try{
            customUserDetailsService.loadUserByUsername(authReqModel.getEmail());
        } catch(BaseException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getErrorMessage());
        }
        Authentication authentication;
        try{
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authReqModel.getEmail(),
                            authReqModel.getPassword()
                    )
            );
        } catch(BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch(InternalAuthenticationServiceException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }

        String userId = authReqModel.getEmail();
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
        Seller seller = sellerRepository.findByEmail(userId).orElse(null);
        if (seller == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        String userRefreshToken = seller.getRefreshToken();
        if (userRefreshToken == null) {
            // 없는 경우 새로 등록
            userRefreshToken = refreshToken.getToken();
            seller.setRefreshToken(userRefreshToken);
            sellerRepository.saveAndFlush(seller);
        } else {
            // DB에 refresh 토큰 업데이트
            seller.setRefreshToken(refreshToken.getToken());
            sellerRepository.saveAndFlush(seller);
        }

        int cookieMaxAge = (int) refreshTokenExpiry / 60;
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        return ResponseEntity.status(HttpStatus.OK).body(accessToken.getToken());

    }

    @ApiOperation(value = "판매자 정보 조회")
    @GetMapping("/info/{sellerId}")
    public ResponseEntity<?> showSellerInfo(@PathVariable Long sellerId) {
        SellerResponseDto seller = sellerService.showSellerInfo(sellerId);
        return new ResponseEntity<SellerResponseDto>(seller, HttpStatus.OK);
    }

    @ApiOperation(value = "판매자 정보 수정")
    @PostMapping("/change")
    public ResponseEntity<?> changeSellerInfo(@RequestBody SellerUpdateDto seller) {
        sellerService.changeSellerInfo(seller);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "모든 가게 조회(리뷰 별점순)")
    @GetMapping("/search/all")
    public ResponseEntity<?> searchAll() {
        List<SellerResponseDto> list = sellerService.allSeller();
        if (list != null)
            return new ResponseEntity<List<SellerResponseDto>>(list, HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "지역 기반으로 가게 검색(리뷰 별점순)")
    @GetMapping("/search/{dongCode}")
    public ResponseEntity<?> searchStore(@PathVariable String dongCode) {
        List<SellerResponseDto> list = sellerService.searchSeller(dongCode);
        if (list != null)
            return new ResponseEntity<List<SellerResponseDto>>(list, HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "커스텀 폼 수정")
    @PutMapping("/custom/update")
    public ResponseEntity<?> updateCustom(@RequestBody ObjectNode custom) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        SheetShapeUpdateRequestDto shape = mapper.treeToValue(custom.get("sheetShape"), SheetShapeUpdateRequestDto.class);
        SheetSizeUpdateRequestDto size = mapper.treeToValue(custom.get("sheetSize"), SheetSizeUpdateRequestDto.class);
        SheetTasteUpdateRequestDto taste = mapper.treeToValue(custom.get("sheetTaste"), SheetTasteUpdateRequestDto.class);
        CreamTasteUpdateRequestDto cream = mapper.treeToValue(custom.get("creamTaste"), CreamTasteUpdateRequestDto.class);

        sheetShapeService.updateSheetShape(shape);
        sheetSizeService.updateSheetSize(size);
        sheetTasteService.updateSheetTaste(taste);
        creamTasteService.updateCreamTaste(cream);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "커스텀폼 조회")
    @GetMapping("/form/{sellerId}")
    public ResponseEntity<?> showCustomForm(@PathVariable Long sellerId) {
        SheetShapeResponseDto shape = sheetShapeService.showSheetShape(sellerId);
        SheetSizeResponseDto size = sheetSizeService.showSheetSize(sellerId);
        SheetTasteResponseDto taste = sheetTasteService.showSheetTaste(sellerId);
        CreamTasteResponseDto cream = creamTasteService.showCreamTaste(sellerId);

        CustomDto custom = new CustomDto(shape, size, taste, cream);

        return new ResponseEntity<>(custom, HttpStatus.OK);
    }

    @ApiOperation(value = "인기 케이크")
    @GetMapping("/popular/{sellerId}")
    public ResponseEntity<?> getPopularPortfolio(@PathVariable Long sellerId) {
        List<PortfolioResponseDto> res = portfolioService.findPopularBySeller(sellerId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    private SellerSaveRequestDto createSaveRequestDto(Map<String, Object> map) {
        return SellerSaveRequestDto.builder()
                .email(String.valueOf(map.get("email")))
                .password(String.valueOf(map.get("password")))
                .gender(EGender.valueOf(String.valueOf(map.get("gender"))))
                .birthDate(LocalDate.parse(String.valueOf(map.get("birthDate")), DateTimeFormatter.ISO_DATE))
                .roadAddress(String.valueOf(map.get("roadAddress")))
                .detailedAddress(String.valueOf(map.get("detailedAddress")))
                .dongCode(String.valueOf(map.get("dongCode")))
                .buildingName(String.valueOf(map.get("buildingName")))
                .phoneNumber(String.valueOf(map.get("phoneNumber")))
                .name(String.valueOf(map.get("name")))
                .businessNumber(String.valueOf(map.get("businessNumber")))
                .businessLocation(String.valueOf(map.get("businessLocation")))
                .businessName(String.valueOf(map.get("businessName")))
                .contact(String.valueOf(map.get("contact")))
                .account(String.valueOf(map.get("account")))
                .businessDescription(String.valueOf(map.get("businessDescription")))
                .build();
    }
}
