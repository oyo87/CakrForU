package com.a604.cake4u.sheettaste.service;

import com.a604.cake4u.sheettaste.dto.SheetTasteResponseDto;
import com.a604.cake4u.sheettaste.dto.SheetTasteSaveRequestDto;
import com.a604.cake4u.sheettaste.dto.SheetTasteUpdateRequestDto;
import com.a604.cake4u.sheettaste.repository.SheetTasteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SheetTasteService {
    @Autowired
    private SheetTasteRepository sheetTasteRepository;

    public void saveSheetTaste(SheetTasteSaveRequestDto taste) {
        sheetTasteRepository.save(taste.toEntity());
    }

    public void updateSheetTaste(SheetTasteUpdateRequestDto taste) {
        sheetTasteRepository.save(taste.toEntity());
    }

    public SheetTasteResponseDto showSheetTaste(Long sellerId) {
        return sheetTasteRepository.findSheetTaste(sellerId);
    }
}