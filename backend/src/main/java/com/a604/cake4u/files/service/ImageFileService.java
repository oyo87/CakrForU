package com.a604.cake4u.files.service;

import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.files.entity.ImageFile;
import com.a604.cake4u.files.handler.FileHandler;
import com.a604.cake4u.files.repository.ImageFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.util.List;

import static com.a604.cake4u.exception.ErrorMessage.IMAGE_FILE_CANT_DELETE;
import static com.a604.cake4u.exception.ErrorMessage.ORDER_SHEET_GET_BY_ORDER_SHEET_ID_ERROR;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ImageFileService {
    private final ImageFileRepository imageFileRepository;
    private final FileHandler fileHandler;

    /**
     *
     * @param orderSheetId : 삭제할 주문서의 PK
     * @return : 삭제될 주문서에 저장된 이미지 개수
     */
    @Transactional
    public int deleteImageFilesByOrderSheetId(Long orderSheetId) {
        int ret = 0;

        try {
            List<ImageFile> imageFileList = imageFileRepository.findAllByOrderSheet_OrderSheetId(orderSheetId)
                    .orElseThrow(() -> new BaseException(ORDER_SHEET_GET_BY_ORDER_SHEET_ID_ERROR));
            ret = fileHandler.deleteImageFiles(imageFileList);
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }

    @Transactional
    public int deleteImageFilesByPortfolioId(Long portfolioId) {
        int ret = 0;

        try {
            List<ImageFile> imageFileList = imageFileRepository.findAllByOrderSheet_OrderSheetId(portfolioId)
                    .orElseThrow(() -> new BaseException(ORDER_SHEET_GET_BY_ORDER_SHEET_ID_ERROR));
            ret = fileHandler.deleteImageFiles(imageFileList);
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }
}
