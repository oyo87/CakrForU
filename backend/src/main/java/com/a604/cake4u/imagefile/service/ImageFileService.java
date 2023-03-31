package com.a604.cake4u.imagefile.service;

import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.imagefile.entity.ImageFile;
import com.a604.cake4u.imagefile.repository.ImageFileRepository;
import com.a604.cake4u.imagefile.handler.S3ImageFileHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static com.a604.cake4u.exception.ErrorMessage.ORDER_SHEET_GET_BY_ORDER_SHEET_ID_ERROR;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ImageFileService {
    private final ImageFileRepository imageFileRepository;
    private final S3ImageFileHandler s3ImageFileHandler;

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
//            ret = fileHandler.deleteImageFiles(imageFileList);
            log.info("imageFileList = " + imageFileList);
            ret = s3ImageFileHandler.deleteImageFiles(imageFileList);
            log.info("imageFileService ret = " + ret);
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
//            ret = fileHandler.deleteImageFiles(imageFileList);
            ret = s3ImageFileHandler.deleteImageFiles(imageFileList);
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
//            ret = fileHandler.deleteImageFiles(imageFileList);
            ret = s3ImageFileHandler.deleteImageFiles(imageFileList);
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }
}
