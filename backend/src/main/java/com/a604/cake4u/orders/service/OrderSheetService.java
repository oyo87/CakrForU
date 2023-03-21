package com.a604.cake4u.orders.service;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.enums.EImageFileType;
import com.a604.cake4u.enums.EStatus;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.exception.ErrorMessage;
import com.a604.cake4u.files.dto.ImageFileDto;
import com.a604.cake4u.files.entity.ImageFile;
import com.a604.cake4u.files.handler.FileHandler;
import com.a604.cake4u.files.repository.ImageFileRepository;
import com.a604.cake4u.orders.dto.request.OrderSheetRegistVO;
import com.a604.cake4u.orders.dto.request.OrderSheetReviewVO;
import com.a604.cake4u.orders.dto.response.OrderSheetResponseDto;
import com.a604.cake4u.orders.entity.OrderSheet;
import com.a604.cake4u.orders.repository.OrderSheetRepository;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OrderSheetService {
    private final OrderSheetRepository orderSheetRepository;
    private final FileHandler fileHandler;
    private final ImageFileRepository imageFileRepository;
    private final BuyerRepository buyerRepository;      //  주문 등록 때 PK로 구매자 찾아야 함
    private final SellerRepository sellerRepository;    //  주문 등록 때 PK로 판매자 찾아야 함

    @Transactional
    public Long registOrderSheet(List<MultipartFile> files, OrderSheetRegistVO orderSheetRegistVO) {
        Long ret = -1L;
        //  구매자 Entity 찾아내기
        Buyer buyer = buyerRepository.findById(orderSheetRegistVO.getBuyerId()).orElseThrow(() -> new BaseException(ErrorMessage.NO_BUYER_INFO));
        //  판매자 Entity 찾아내기
        Seller seller = sellerRepository.findById(orderSheetRegistVO.getSellerId()).orElseThrow(() -> new BaseException(ErrorMessage.NO_SELLER_INFO));

        log.info("buyer = " + buyer);
        log.info("seller = " + seller);

        OrderSheet orderSheet = OrderSheet.builder()
                .buyer(buyer)
                .seller(seller)
                .status(orderSheetRegistVO.getStatus())
                .createdAt(orderSheetRegistVO.getCreatedAt())
                .price(orderSheetRegistVO.getPrice())
                .dueDate(orderSheetRegistVO.getDueDate())
                .pickUpDate(orderSheetRegistVO.getPickUpDate())
                .sheetSize(orderSheetRegistVO.getSheetSize())
                .sheetShape(orderSheetRegistVO.getSheetShape())
                .sheetTaste(orderSheetRegistVO.getSheetTaste())
                .creamTaste(orderSheetRegistVO.getCreamTaste())
                .buyerMessage(orderSheetRegistVO.getBuyerMessage())
                .build();

        try {
            List<ImageFile> fileList = fileHandler.parseFileInfo(files);
            ret = orderSheetRepository.save(orderSheet).getId();

            //  파일이 존재하면 처리
            if(!fileList.isEmpty()) {
                for(ImageFile file : fileList) {
                    //  파일을 DB에 저장
                    file.setOrderSheet(orderSheet); //  사진에 주문서 등록
                    file.setImageFileType(EImageFileType.ORDERS_PICTURE);   //  사진 유형 등록
                    orderSheet.addOrderSheetImageFile(file); //  주문서에 사진 등록
                }
            }
        } catch(IOException e) {
            e.printStackTrace();
            throw new BaseException(ErrorMessage.NOT_STORE_FILE);
        } finally {
            return ret;
        }
    }

    public OrderSheetResponseDto getOrderSheetByOrderSheetId(Long orderSheetId) throws BaseException {
        OrderSheet orderSheet = orderSheetRepository.findById(orderSheetId).orElseThrow(() -> new BaseException(ErrorMessage.ORDER_SHEET_GET_BY_ORDER_SHEET_ID_ERROR));
        return entityToResponse(orderSheet);
    }

    public List<OrderSheetResponseDto> getOrderSheetsByBuyerId(Long buyerId) throws BaseException {
        List<OrderSheet> orderSheetList = orderSheetRepository.findAllOrderSheetByBuyerId(buyerId).orElseThrow(() -> new BaseException(ErrorMessage.ORDER_SHEET_GET_BY_BUYER_ID_ERROR));
        List<OrderSheetResponseDto> ret = new ArrayList<>();

        for(OrderSheet orderSheet : orderSheetList)
            ret.add(entityToResponse(orderSheet));

        return ret;
    }

    public List<OrderSheetResponseDto> getOrderSheetsBySellerId(Long sellerId) throws BaseException {
        List<OrderSheet> orderSheetList = orderSheetRepository.findAllOrderSheetBySellerId(sellerId).orElseThrow(() -> new BaseException(ErrorMessage.ORDER_SHEET_GET_BY_SELLER_ID_ERROR));
        List<OrderSheetResponseDto> ret = new ArrayList<>();

        for(OrderSheet orderSheet : orderSheetList)
            ret.add(entityToResponse(orderSheet));

        return ret;
    }
    public List<OrderSheetResponseDto> getBuyerOrderSheetsByStatus(Long buyerId, EStatus status) throws BaseException {
        List<OrderSheet> orderSheetList = orderSheetRepository.findOrderSheetsByBuyer_IdAndStatus(buyerId, status).orElseThrow(() -> new BaseException(ErrorMessage.ORDER_SHEET_GET_BY_STATUS_ERROR));
        List<OrderSheetResponseDto> ret = new ArrayList<>();

        for(OrderSheet orderSheet : orderSheetList)
            ret.add(entityToResponse(orderSheet));

        return ret;
    }

    public List<OrderSheetResponseDto> getSellerOrderSheetsByStatus(Long sellerId, EStatus status) throws BaseException {
        List<OrderSheet> orderSheetList = orderSheetRepository.findOrderSheetsBySeller_IdAndStatus(sellerId, status).orElseThrow(() -> new BaseException(ErrorMessage.ORDER_SHEET_GET_BY_STATUS_ERROR));
        List<OrderSheetResponseDto> ret = new ArrayList<>();

        for(OrderSheet orderSheet : orderSheetList)
            ret.add(entityToResponse(orderSheet));

        return ret;
    }

    @Transactional
    public Long registReview(Long orderSheetId, List<MultipartFile> files, OrderSheetReviewVO orderSheetReviewVO) {
        Long ret = -1L;

        //  PK로 리뷰 작성할 주문서 찾기
        OrderSheet orderSheet = orderSheetRepository.findById(orderSheetId).orElseThrow(() -> new BaseException(ErrorMessage.ORDER_SHEET_GET_BY_ORDER_SHEET_ID_ERROR));

        //  리뷰 관련 내용 등록
        orderSheet.setReviewContent(orderSheetReviewVO.getReviewContent());
        orderSheet.setReviewRating(orderSheetReviewVO.getReviewRating());
        orderSheet.setCreatedAt(orderSheetReviewVO.getReviewCreatedAt());

        try {
            List<ImageFile> fileList = fileHandler.parseFileInfo(files);

            //  파일이 존재하면 처리
            if(!fileList.isEmpty()) {
                for(ImageFile file : fileList) {
                    //  파일을 DB에 저장
                    file.setOrderSheet(orderSheet); //  사진에 주문서 등록
                    file.setImageFileType(EImageFileType.REVIEW_PICTURE);   //  사진 유형 등록
                    orderSheet.addOrderSheetImageFile(file); //  주문서에 사진 등록
                }
            }

            ret = orderSheetId;
        } catch(IOException e) {
            e.printStackTrace();
            throw new BaseException(ErrorMessage.NOT_STORE_FILE);
        } finally {
            return ret;
        }
    }

    @Transactional
    public Long deleteOrderSheetByOrderSheetId(Long orderSheetId) {
        orderSheetRepository.deleteById(orderSheetId);
        return orderSheetId;
    }

    private List<ImageFileDto> getImageFileDtoListByOrderSheetId(Long orderSheetId) {
        Optional<List<ImageFile>> imageFileList = imageFileRepository.findAllByOrderSheet_OrderSheetId(orderSheetId);
        List<ImageFileDto> imageFileDtoList = new ArrayList<>();

        if(imageFileList.isPresent()) {
            for(ImageFile imageFile : imageFileList.get()) {
                imageFileDtoList.add(entityToImageFileDto(imageFile));
            }
        }

        return imageFileDtoList;
    }
    private OrderSheetResponseDto entityToResponse(OrderSheet orderSheet) {
        return OrderSheetResponseDto.builder()
                .id(orderSheet.getId())
                .buyerId(orderSheet.getBuyer().getId())
                .sellerId(orderSheet.getSeller().getId())
                .imageFileDtoList(getImageFileDtoListByOrderSheetId(orderSheet.getId()))
                .status(orderSheet.getStatus())
                .createdAt(orderSheet.getCreatedAt())
                .price(orderSheet.getPrice())
                .dueDate(orderSheet.getDueDate())
                .pickUpDate(orderSheet.getPickUpDate())
                .sheetSize(orderSheet.getSheetSize())
                .sheetShape(orderSheet.getSheetShape())
                .sheetTaste(orderSheet.getSheetTaste())
                .creamTaste(orderSheet.getCreamTaste())
                .buyerMessage(orderSheet.getBuyerMessage())
                .reviewContent(orderSheet.getReviewContent())
                .reviewCreatedAt(orderSheet.getReviewCreatedAt())
                .reviewRating(orderSheet.getReviewRating())
                .build();
    }

    private ImageFileDto entityToImageFileDto(ImageFile imageFile) {
        return ImageFileDto.builder()
                .origImageFileName(imageFile.getOrigImageFileName())
                .imageFileUri(imageFile.getImageFileUri())
                .build();
    }
}
