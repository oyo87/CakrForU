package com.a604.cake4u.creamtaste.service;

import com.a604.cake4u.creamtaste.dto.CreamTasteResponseDto;
import com.a604.cake4u.creamtaste.dto.CreamTasteSaveRequestDto;
import com.a604.cake4u.creamtaste.dto.CreamTasteUpdateRequestDto;
import com.a604.cake4u.creamtaste.repository.CreamTasteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CreamTasteService {

    private final CreamTasteRepository creamTasteRepository;

    public void saveCreamTaste(CreamTasteSaveRequestDto cream) {
        creamTasteRepository.save(cream.toEntity());
    }

    public void updateCreamTaste(CreamTasteUpdateRequestDto cream) {
        creamTasteRepository.save(cream.toEntity());
    }

    public CreamTasteResponseDto showCreamTaste(Long sellerId) {
        return creamTasteRepository.findCreamTaste(sellerId);
    }
}
