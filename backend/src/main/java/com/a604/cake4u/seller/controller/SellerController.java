package com.a604.cake4u.seller.controller;

import com.a604.cake4u.creamtaste.dto.CreamTasteSaveRequestDto;
import com.a604.cake4u.creamtaste.service.CreamTasteService;
import com.a604.cake4u.seller.dto.SellerLoginDto;
import com.a604.cake4u.seller.dto.SellerResponseDto;
import com.a604.cake4u.seller.dto.SellerSaveRequestDto;
import com.a604.cake4u.seller.dto.SellerUpdateDto;
import com.a604.cake4u.seller.service.SellerService;
import com.a604.cake4u.sheetshape.dto.SheetShapeSaveRequestDto;
import com.a604.cake4u.sheetshape.service.SheetShapeService;
import com.a604.cake4u.sheetsize.dto.SheetSizeSaveRequestDto;
import com.a604.cake4u.sheetsize.service.SheetSizeService;
import com.a604.cake4u.sheettaste.dto.SheetTasteSaveRequestDto;
import com.a604.cake4u.sheettaste.service.SheetTasteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Api(value = "SellerConroller")
@RequiredArgsConstructor
public class SellerController {
    @Autowired
    private final SellerService sellerService;
    @Autowired
    private final SheetShapeService sheetShapeService;
    @Autowired
    private final SheetSizeService sheetSizeService;
    @Autowired
    private final SheetTasteService sheetTasteService;
    @Autowired
    private final CreamTasteService creamTasteService;


    @ApiOperation(value = "판매자 회원가입")
    @PostMapping("/seller/new")
    public ResponseEntity<?> newSeller(@RequestBody SellerSaveRequestDto seller) {
        Long id = sellerService.saveSeller(seller);
        Map<String, Object> msg = new HashMap<>();
        msg.put("result", false);
        msg.put("msg", "회원가입 실패");
        HttpStatus sts = HttpStatus.UNAUTHORIZED;

        if (id != null) {
            msg.put("result", true);
            msg.put("msg", "회원가입 성공");
            sts = HttpStatus.OK;

            //가입과 동시에 폼 초기화
            //시트모양 초기화
            SheetShapeSaveRequestDto shape = new SheetShapeSaveRequestDto(id, false, false, false, false);
            sheetShapeService.saveSheetShape(shape);

            //시트사이즈 초기화
            SheetSizeSaveRequestDto size = new SheetSizeSaveRequestDto(id, false, false, false, false);
            sheetSizeService.saveSheetSize(size);

            //시트맛 초기화
            SheetTasteSaveRequestDto taste = new SheetTasteSaveRequestDto(id, false, false, false, false, false, false, false, false, false);
            sheetTasteService.saveSheetTaste(taste);

            //크림맛 초기화
            CreamTasteSaveRequestDto cream = new CreamTasteSaveRequestDto(id, false, false, false, false, false, false,false,false);
            creamTasteService.saveCreamTaste(cream);

        }

        return ResponseEntity.status(sts).body(msg);
    }

    @ApiOperation(value = "판매자 로그인")
    @PostMapping("/seller/login")
    public ResponseEntity<?> login(@RequestBody SellerLoginDto seller) throws Exception{
            Map<String, Object> info = sellerService.sellerLogin(seller);
            Map<String, Object> msg = new HashMap<>();

            HttpStatus sts = HttpStatus.BAD_REQUEST;

            sts = HttpStatus.OK;
            msg.put("result", true);
            msg.put("msg", "로그인을 성공하였습니다.");
        return ResponseEntity.status(sts).body(msg);
    }

    @ApiOperation(value = "판매자 정보 조회")
    @GetMapping("/seller/info/{sellerId}")
    public ResponseEntity<?> showSellerInfo(@PathVariable Long sellerId) {
        SellerResponseDto seller = sellerService.showSellerInfo(sellerId);
        return new ResponseEntity<SellerResponseDto>(seller, HttpStatus.OK);
    }

    @ApiOperation(value = "판매자 정보 수정")
    @PostMapping("/seller/change")
    public ResponseEntity<?> changeSellerInfo(@RequestBody SellerUpdateDto seller) {
        sellerService.changeSellerInfo(seller);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "모든 가게 조회(판매량순)")
    @GetMapping("/seller/search/all")
    public ResponseEntity<?> searchAll() {
        List<SellerResponseDto> list = sellerService.allSeller();
        if (list != null)
            return new ResponseEntity<List<SellerResponseDto>>(list, HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "지역 기반으로 가게 검색(판매량순)")
    @GetMapping("/seller/search/{dongCode}")
    public ResponseEntity<?> searchStore(@PathVariable String dongCode) {
        List<SellerResponseDto> list = sellerService.searchSeller(dongCode);
        if (list != null)
            return new ResponseEntity<List<SellerResponseDto>>(list, HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}