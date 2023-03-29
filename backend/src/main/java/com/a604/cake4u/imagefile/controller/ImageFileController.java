package com.a604.cake4u.imagefile.controller;

import com.a604.cake4u.imagefile.service.ImageFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ImageFileController {

    private final ImageFileService imageFileService;
}
