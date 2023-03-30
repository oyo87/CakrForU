package com.a604.cake4u.seller.dto;

import com.a604.cake4u.creamtaste.dto.CreamTasteResponseDto;
import com.a604.cake4u.creamtaste.entity.CreamTaste;
import com.a604.cake4u.sheetshape.dto.SheetShapeResponseDto;
import com.a604.cake4u.sheetshape.entity.SheetShape;
import com.a604.cake4u.sheetsize.dto.SheetSizeResponseDto;
import com.a604.cake4u.sheetsize.entity.SheetSize;
import com.a604.cake4u.sheettaste.dto.SheetTasteResponseDto;
import com.a604.cake4u.sheettaste.entity.SheetTaste;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomDto {
    private SheetShapeResponseDto sheetShape;
    private SheetSizeResponseDto sheetSize;
    private SheetTasteResponseDto sheetTaste;
    private CreamTasteResponseDto creamTaste;

    public CustomDto(SheetShapeResponseDto sheetShape, SheetSizeResponseDto sheetSize, SheetTasteResponseDto sheetTaste, CreamTasteResponseDto creamTaste) {
        this.sheetShape = sheetShape;
        this.sheetSize = sheetSize;
        this.sheetTaste = sheetTaste;
        this.creamTaste = creamTaste;
    }
}
