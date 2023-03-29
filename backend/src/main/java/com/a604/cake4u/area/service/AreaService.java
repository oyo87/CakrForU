package com.a604.cake4u.area.service;

import com.a604.cake4u.area.dto.DongDto;
import com.a604.cake4u.area.dto.GugunDto;
import com.a604.cake4u.area.dto.SiGuDongDto;
import com.a604.cake4u.area.dto.SidoDto;
import com.a604.cake4u.area.repository.DongCodeRepository;
import com.a604.cake4u.area.repository.GugunCodeRepository;
import com.a604.cake4u.area.repository.SidoCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AreaService {
    private final SidoCodeRepository sidoCodeRepository;
    private final GugunCodeRepository gugunCodeRepository;
    private final DongCodeRepository dongCodeRepository;

    public List<SidoDto> getSido() {
        return sidoCodeRepository.getSido();
    }

    public List<GugunDto> getGugunInSido(String sidoCode) {
        return gugunCodeRepository.getGugunInSido(sidoCode);
    }

    public List<DongDto> getDongInGugun(String gugunCode) {
        return dongCodeRepository.getDongInGugun(gugunCode);
    }

    public SiGuDongDto getAddressName(String dongCode) {
        return dongCodeRepository.getAddressName(dongCode);
    }


}
