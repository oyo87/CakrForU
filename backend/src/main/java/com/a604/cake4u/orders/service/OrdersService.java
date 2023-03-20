package com.a604.cake4u.orders.service;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.exception.ErrorMessage;
import com.a604.cake4u.files.entity.Files;
import com.a604.cake4u.files.handler.FileHandler;
import com.a604.cake4u.orders.dto.request.OrdersRegistVO;
import com.a604.cake4u.orders.dto.response.OrdersResponseDto;
import com.a604.cake4u.orders.entity.Orders;
import com.a604.cake4u.orders.repository.OrdersRepository;
import com.a604.cake4u.seller.entity.Seller;
import com.a604.cake4u.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OrdersService {
    private final OrdersRepository ordersRepository;
    private final FileHandler fileHandler;
    private final BuyerRepository buyerRepository;      //  주문 등록 때 PK로 구매자 찾아야 함
    private final SellerRepository sellerRepository;    //  주문 등록 때 PK로 판매자 찾아야 함

    @Transactional
    public Long registOrders(List<MultipartFile> files, OrdersRegistVO ordersRegistVO) {
        Long ret = -1L;
        //  구매자 Entity 찾아내기
        Buyer buyer = buyerRepository.findById(ordersRegistVO.getBuyerId()).orElseThrow(() -> new BaseException(ErrorMessage.NO_BUYER_INFO));
        //  판매자 Entity 찾아내기
        Seller seller = sellerRepository.findById(ordersRegistVO.getSellerId()).orElseThrow(() -> new BaseException(ErrorMessage.NO_SELLER_INFO));

        log.info("buyer = " + buyer);
        log.info("seller = " + seller);

        Orders orders = Orders.builder()
                .buyer(buyer)
                .seller(seller)
                .status(ordersRegistVO.getStatus())
                .createdAt(ordersRegistVO.getCreatedAt())
                .price(ordersRegistVO.getPrice())
                .dueDate(ordersRegistVO.getDueDate())
                .pickUpDate(ordersRegistVO.getPickUpDate())
                .sheetSize(ordersRegistVO.getSheetSize())
                .sheetShape(ordersRegistVO.getSheetShape())
                .sheetTaste(ordersRegistVO.getSheetTaste())
                .creamTaste(ordersRegistVO.getCreamTaste())
                .buyerMessage(ordersRegistVO.getBuyerMessage())
                .build();

        try {
            List<Files> fileList = fileHandler.parseFileInfo(files);
            ret = ordersRepository.save(orders).getId();

            //  파일이 존재하면 처리
            if(!fileList.isEmpty()) {
                for(Files file : fileList) {
                    //  파일을 DB에 저장
                    file.setOrders(orders); //  사진에 주문서 등록
                    orders.addOrdersFile(file); //  주문서에 사진 등록
                }
            }
        } catch(IOException e) {
            e.printStackTrace();
            throw new BaseException(ErrorMessage.NOT_STORE_FILE);
        } finally {
            return ret;
        }
    }

    public OrdersResponseDto getOrderByOrdersId(Long ordersId) throws BaseException {
        Orders orders = ordersRepository.findById(ordersId).orElseThrow(() -> new BaseException(ErrorMessage.ORDERS_GET_BY_ID_ERROR));
        return null;
    }

    private OrdersResponseDto entityToResponse(Orders orders) {
        return OrdersResponseDto.builder().build();
    }
}
