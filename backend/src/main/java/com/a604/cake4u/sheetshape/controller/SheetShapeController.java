package com.a604.cake4u.sheetshape.controller;

import com.a604.cake4u.sheetshape.dto.SheetShapeResponseDto;
import com.a604.cake4u.sheetshape.dto.SheetShapeSaveRequestDto;
import com.a604.cake4u.sheetshape.dto.SheetShapeUpdateRequestDto;
import com.a604.cake4u.sheetshape.service.SheetShapeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "SheetShapeConroller")
@RequiredArgsConstructor
public class SheetShapeController {
    private final SheetShapeService sheetShapeService;

    @ApiOperation(value = "시트모양 폼 수정")
    @PutMapping("/sheetshape/update")
    public ResponseEntity<?> updateSheetShape(@RequestBody SheetShapeUpdateRequestDto sheet) {
        sheetShapeService.updateSheetShape(sheet);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "시트모양 폼 조회")
    @GetMapping("/sheetshape/{sellerId}")
    public ResponseEntity<?> showSheetShape(@PathVariable Long sellerId) {
        SheetShapeResponseDto shape = sheetShapeService.showSheetShape(sellerId);
        return new ResponseEntity<SheetShapeResponseDto>(shape, HttpStatus.OK);
    }
}
