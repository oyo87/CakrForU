package com.a604.cake4u.area.controller;

import com.a604.cake4u.area.dto.DongDto;
import com.a604.cake4u.area.dto.GugunDto;
import com.a604.cake4u.area.dto.SiGuDongDto;
import com.a604.cake4u.area.dto.SidoDto;
import com.a604.cake4u.area.service.AreaService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@ApiOperation(value = "AreaController")
@RequiredArgsConstructor
public class AreaController {
    @Autowired
    private final AreaService areaService;

    @ApiOperation(value="시,도 가져오기")
    @GetMapping("/area/sido")
    public ResponseEntity<List<SidoDto>> sido() {
        List<SidoDto> list = areaService.getSido();
        if (list != null && !list.isEmpty())
            return new ResponseEntity<List<SidoDto>>(list, HttpStatus.OK);
        else return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="구,군 가져오기")
    @GetMapping("/area/gugun/{sidoCode}")
    public ResponseEntity<List<GugunDto>> gugun(@PathVariable("sidoCode") String sidoCode) {
        List<GugunDto> list = areaService.getGugunInSido(sidoCode);
        if (list != null && !list.isEmpty())
            return new ResponseEntity<List<GugunDto>>(list, HttpStatus.OK);
        else return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="동 가져오기")
    @GetMapping("/area/dong/{gugunCode}")
    public ResponseEntity<List<DongDto>> dong(@PathVariable("gugunCode") String gugunCode) {
        List<DongDto> list = areaService.getDongInGugun(gugunCode);
        if (list != null && !list.isEmpty())
            return new ResponseEntity<List<DongDto>>(list, HttpStatus.OK);
        else return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="시,구,동 조회 후 이름 return")
    @GetMapping("/area/sigudong/{dongCode}")
    public ResponseEntity<?> sigudong(@PathVariable("dongCode") String dongCode) {
        SiGuDongDto s = areaService.getAddressName(dongCode);
        if (s != null)
            return new ResponseEntity<SiGuDongDto>(s, HttpStatus.OK);
        else return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
