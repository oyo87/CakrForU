package com.a604.cake4u.sheetsize.service;

import com.a604.cake4u.sheetsize.dto.SheetSizeResponseDto;
import com.a604.cake4u.sheetsize.dto.SheetSizeSaveRequestDto;
import com.a604.cake4u.sheetsize.dto.SheetSizeUpdateRequestDto;
import com.a604.cake4u.sheetsize.repository.SheetSizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SheetSizeService {

    private final SheetSizeRepository sheetSizeRepository;

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