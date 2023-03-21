package com.a604.cake4u.creamtaste.controller;

import com.a604.cake4u.creamtaste.dto.CreamTasteResponseDto;
import com.a604.cake4u.creamtaste.dto.CreamTasteUpdateRequestDto;
import com.a604.cake4u.creamtaste.entity.CreamTaste;
import com.a604.cake4u.creamtaste.service.CreamTasteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "CreamTasteConroller")
@RequiredArgsConstructor
public class CreamTasteController {
    @Autowired
    private final CreamTasteService creamTasteService;

    @ApiOperation(value = "크림맛폼 수정")
    @PostMapping("/creamtaste/update")
    public ResponseEntity<?> updateCreamTaste(CreamTasteUpdateRequestDto cream) {
        creamTasteService.updateCreamTaste(cream);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "크림맛폼 조회")
    @GetMapping("/creamtaste/{sellerId}")
    public ResponseEntity<?> showCreamTaste(@PathVariable Long sellerId) {
        CreamTasteResponseDto cream = creamTasteService.showCreamTaste(sellerId);
        return new ResponseEntity<>(cream, HttpStatus.OK);
    }
}
