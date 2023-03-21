package com.a604.cake4u.sheetsize.service;

import com.a604.cake4u.sheetsize.dto.SheetSizeResponseDto;
import com.a604.cake4u.sheetsize.dto.SheetSizeSaveRequestDto;
import com.a604.cake4u.sheetsize.dto.SheetSizeUpdateRequestDto;
import com.a604.cake4u.sheetsize.repository.SheetSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SheetSizeService {
    @Autowired
    SheetSizeRepository sheetSizeRepository;

    public void saveSheetSize(SheetSizeSaveRequestDto size) {
        sheetSizeRepository.save(size.toEntity());
    }

    public void updateSheetSize(SheetSizeUpdateRequestDto size) {
        sheetSizeRepository.save(size.toEntity());
    }

    public SheetSizeResponseDto showSheetSize(Long sellerId) {
        return sheetSizeRepository.findSheetSize(sellerId);
    }
}