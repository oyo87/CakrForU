package com.a604.cake4u.sheetsize.controller;

import com.a604.cake4u.sheetsize.dto.SheetSizeResponseDto;
import com.a604.cake4u.sheetsize.dto.SheetSizeUpdateRequestDto;
import com.a604.cake4u.sheetsize.service.SheetSizeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "SheetSizeConroller")
@RequiredArgsConstructor
public class SheetSizeController {
    @Autowired
    private final SheetSizeService sheetSizeService;

    @ApiOperation(value = "시트사이즈 폼 수정")
    @PostMapping("/sheetsize/update")
    public ResponseEntity<?> updateSheetSize(@RequestBody SheetSizeUpdateRequestDto size) {
        sheetSizeService.updateSheetSize(size);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "시트사이즈 폼 조회")
    @GetMapping("/sheetsize/{sellerId}")
    public ResponseEntity<?> showSheetSize(@PathVariable Long sellerId) {
        SheetSizeResponseDto size = sheetSizeService.showSheetSize(sellerId);
        return new ResponseEntity<SheetSizeResponseDto>(size, HttpStatus.OK);
    }
}
