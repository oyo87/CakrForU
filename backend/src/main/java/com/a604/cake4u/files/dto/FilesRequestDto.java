package com.a604.cake4u.files.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class FilesRequestDto {

    private Orders orderSheet;
    private Cake cake;
    private Seller seller;
    private String fileUri;
    private String fileName;
    public String fileType;
}
