package com.a604.cake4u.sheetshape.service;

import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.seller.repository.SellerRepository;
import com.a604.cake4u.sheetshape.dto.SheetShapeResponseDto;
import com.a604.cake4u.sheetshape.dto.SheetShapeSaveRequestDto;
import com.a604.cake4u.sheetshape.dto.SheetShapeUpdateRequestDto;
import com.a604.cake4u.sheetshape.repository.SheetShapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SheetShapeService {
    @Autowired
    SheetShapeRepository sheetShapeRepository;
    @Autowired
    private SellerRepository sellerRepository;

    public void saveSheetShape(SheetShapeSaveRequestDto shape) {
        sheetShapeRepository.save(shape.toEntity());
    }

    public void updateSheetShape(SheetShapeUpdateRequestDto shape) {
        sheetShapeRepository.save(shape.toEntity());
    }

    public SheetShapeResponseDto showSheetShape(Long sellerId) {
        return sheetShapeRepository.findSheetShape(sellerId);
    }
}
