package com.a604.cake4u.files.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PortfolioFileDto {
    private String fileUri;
    private String fileName;
    private String fileType;
}
