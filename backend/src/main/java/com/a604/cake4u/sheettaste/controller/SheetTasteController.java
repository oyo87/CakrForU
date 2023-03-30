package com.a604.cake4u.sheettaste.controller;

import com.a604.cake4u.sheetsize.dto.SheetSizeResponseDto;
import com.a604.cake4u.sheetsize.dto.SheetSizeUpdateRequestDto;
import com.a604.cake4u.sheetsize.service.SheetSizeService;
import com.a604.cake4u.sheettaste.dto.SheetTasteResponseDto;
import com.a604.cake4u.sheettaste.dto.SheetTasteUpdateRequestDto;
import com.a604.cake4u.sheettaste.entity.SheetTaste;
import com.a604.cake4u.sheettaste.service.SheetTasteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "SheetTasteConroller")
@RequiredArgsConstructor
public class SheetTasteController {

    private final SheetTasteService sheetTasteService;

    @ApiOperation(value = "시트맛 폼 수정")
    @PutMapping("/sheettaste/update")
    public ResponseEntity<?> updateSheetTaste(@RequestBody SheetTasteUpdateRequestDto taste) {
        sheetTasteService.updateSheetTaste(taste);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "시트맛 폼 조회")
    @GetMapping("/sheettaste/{sellerId}")
    public ResponseEntity<?> showSheetSize(@PathVariable Long sellerId) {
        SheetTasteResponseDto taste = sheetTasteService.showSheetTaste(sellerId);
        return new ResponseEntity<SheetTasteResponseDto>(taste, HttpStatus.OK);
    }
}
