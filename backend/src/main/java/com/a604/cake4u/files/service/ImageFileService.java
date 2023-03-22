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
     * @param imageFileId : 삭제할 파일 PK
     * @return : 삭제된 파일의 PK
     */
    @Transactional
    public Long deleteImageFileByImageFileId(Long imageFileId) {
        imageFileRepository.deleteById(imageFileId);
        return imageFileId;
    }

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

    /**
     *
     * @param portfolioId : 삭제할 포트폴리오의 PK
     * @return : 삭제될 포트폴리오에 저장된 이미지 개수
     */
    @Transactional
    public int deleteImageFilesByPortfolioId(Long portfolioId) {
        int ret = 0;

        try {
            List<ImageFile> imageFileList = imageFileRepository.findAllByPortfolio_PortfolioId(portfolioId)
                    .orElseThrow(() -> new BaseException(ORDER_SHEET_GET_BY_ORDER_SHEET_ID_ERROR));
            ret = fileHandler.deleteImageFiles(imageFileList);
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }

    /**
     * 
     * @param sellerId : 탈퇴할 판매자의 PK
     * @return : 탈퇴한 판매자에 등록된 이미지 개수
     */
    @Transactional
    public int deleteImageFilesBySellerId(Long sellerId) {
        int ret = 0;

        try {
            List<ImageFile> imageFileList = imageFileRepository.findAllBySeller_SellerId(sellerId)
                    .orElseThrow(() -> new BaseException(ORDER_SHEET_GET_BY_ORDER_SHEET_ID_ERROR));
            ret = fileHandler.deleteImageFiles(imageFileList);
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }
}
