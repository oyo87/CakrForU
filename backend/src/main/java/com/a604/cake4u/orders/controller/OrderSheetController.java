package com.a604.cake4u.orders.controller;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.imagefile.service.ImageFileService;
import com.a604.cake4u.orders.dto.request.OrderSheetRegistVO;
import com.a604.cake4u.orders.dto.request.OrderSheetReviewVO;
import com.a604.cake4u.orders.dto.response.OrderSheetResponseDto;
import com.a604.cake4u.orders.service.OrderSheetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import static com.a604.cake4u.exception.ErrorMessage.*;
import static com.a604.cake4u.exception.ErrorMessage.ORDER_REVIEW_SERVER_ERROR;

@RestController
@RequestMapping("/order-sheet")
@RequiredArgsConstructor
@Slf4j
public class OrderSheetController {
    private final OrderSheetService orderSheetService;
    private final ImageFileService imageFileService;

    @PostMapping
    public ResponseEntity<?> registOrderSheet(
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "orderSheetRegistVOString")String orderSheetRegistVOString) {
        ResponseEntity<?> ret = null;
        
        try {
            JSONParser jsonParser = new JSONParser(orderSheetRegistVOString);
            Object obj = jsonParser.parse();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.convertValue(obj, Map.class);

            log.info("map = " + map);

            OrderSheetRegistVO orderSheetRegistVO = createRegistVO(map);

            log.info("OrderSheetRegistVO = " + orderSheetRegistVO);

            Long orderId = orderSheetService.registOrderSheet(files, orderSheetRegistVO);
            ret = new ResponseEntity<>("주문 등록 성공\n주문 번호 : " + orderId, HttpStatus.OK);
        } catch(ParseException e) { //  client가 요청을 잘못한 경우
            ret = new ResponseEntity<>("주문 등록 실패, 주문 양식 에러", HttpStatus.BAD_REQUEST);
            throw new BaseException(ORDER_SHEET_REGIST_CLIENT_ERROR);
        } catch(Exception e) {  //  server 문제인 경우
            ret = new ResponseEntity<>("주문 등록 실패, 서버 에러", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new BaseException(ORDER_SHEET_REGIST_SERVER_ERROR);
        } finally {
            return ret;
        }
    }

    @GetMapping("/{orderSheetId}")
    public ResponseEntity<?> getOrderSheet(@PathVariable(name = "orderSheetId") Long orderSheetId) {
        OrderSheetResponseDto orderSheetResponseDto = orderSheetService.getOrderSheetByOrderSheetId(orderSheetId);
        return new ResponseEntity<>(orderSheetResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{buyerId}")
    public ResponseEntity<?> getBuyerOrderSheet(@PathVariable(name = "buyerId") Long buyerId) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getOrderSheetsByBuyerId(buyerId);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/{sellerId}")
    public ResponseEntity<?> getSellerOrderSheet(@PathVariable(name = "sellerId") Long sellerId) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getOrderSheetsBySellerId(sellerId);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/{buyerId}/{status}")
    public ResponseEntity<?> getBuyerOrderSheetWithStatus(@PathVariable(name = "buyerId") Long buyerId, @PathVariable(name = "status")String status) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getBuyerOrderSheetsByStatus(buyerId, EStatus.valueOf(status));
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/{sellerId}/{status}")
    public ResponseEntity<?> getSellerOrderSheetWithStatus(@PathVariable(name = "sellerId") Long sellerId, @PathVariable(name = "status") String status) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getBuyerOrderSheetsByStatus(sellerId, EStatus.valueOf(status));
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @PutMapping("/{orderSheetId}")
    public ResponseEntity<?> registReview(
            @PathVariable(name = "orderSheetId") Long orderSheetId,
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "orderSheetReviewVOString")String orderSheetReviewVOString) {
        ResponseEntity<?> ret = null;

        try {
            JSONParser jsonParser = new JSONParser(orderSheetReviewVOString);
            Object obj = jsonParser.parse();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.convertValue(obj, Map.class);

            log.info("map : " + map);
            
            OrderSheetReviewVO orderSheetReviewVO = createReviewVO(map);

            log.info("OrderSheetReviewVO = " + orderSheetReviewVO);

            Long retId = orderSheetService.registReview(orderSheetId, files, orderSheetReviewVO);
            ret = new ResponseEntity<>("리뷰 등록 성공", HttpStatus.OK);
        } catch(ParseException e) {
            ret = new ResponseEntity<>("리뷰 등록 실패, 리뷰 양식 에러", HttpStatus.BAD_REQUEST);
            throw new BaseException(ORDER_REVIEW_CLIENT_ERROR);
        } catch(Exception e) {
            ret = new ResponseEntity<>("리뷰 등록 실패, 서버 에러", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new BaseException(ORDER_REVIEW_SERVER_ERROR);
        } finally {
            return ret;
        }
    }

    @DeleteMapping("/{orderSheetId}")
    public ResponseEntity<?> cancelOrderSheet(@PathVariable(name = "orderSheetId") Long orderSheetId) {
        //  주문서에 저장된 이미지 파일 전부 제거
        int deletedImages = imageFileService.deleteImageFilesByOrderSheetId(orderSheetId);
        //  DB에서 주문서 정보 삭제
        Long deletedOrderSheetId = orderSheetService.deleteOrderSheetByOrderSheetId(orderSheetId);  //  삭제된 주문 id

        StringBuilder sb = new StringBuilder("삭제된 이미지 개수 : ").append(deletedImages).append("\n")
                .append("삭제된 주문서 id = ").append(deletedOrderSheetId).append("\n");

        return new ResponseEntity<>(sb, HttpStatus.OK);
    }

    @PutMapping("/{orderSheetId}/update_status/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable(name = "orderSheetId") Long orderSheetId, @PathVariable(name = "status") String status) {
        return new ResponseEntity<>("상태 업데이트 된 주문서 번호 : " + orderSheetService.updateStatus(orderSheetId, status) + "\n업데이트 상태 : " + status, HttpStatus.OK);
    }

    private OrderSheetRegistVO createRegistVO(Map<String, Object> map) {
        return OrderSheetRegistVO.builder()
                .buyerId(Long.parseLong(String.valueOf(map.get("buyerId"))))
                .sellerId(Long.parseLong(String.valueOf(map.get("sellerId"))))
//                .createdAt(Timestamp.valueOf(String.valueOf(map.get("createdAt"))))
                .price(Integer.parseInt("0"))
                .dueDate(LocalDate.parse(String.valueOf(map.get("dueDate")), DateTimeFormatter.ISO_DATE))
                .pickUpDate(LocalDate.parse(String.valueOf(map.get("pickUpDate")), DateTimeFormatter.ISO_DATE))
                .sheetSize(ESheetSize.valueOf(String.valueOf(map.get("sheetSize"))))
                .sheetShape(ESheetShape.valueOf(String.valueOf(map.get("sheetShape"))))
                .sheetTaste(ESheetTaste.valueOf(String.valueOf(map.get("sheetTaste"))))
                .creamTaste(ECreamTaste.valueOf(String.valueOf(map.get("creamTaste"))))
                .buyerMessage(String.valueOf(map.get("buyerMessage")))
                .build();
    }

    private OrderSheetReviewVO createReviewVO(Map<String, Object> map) {
        return OrderSheetReviewVO.builder()
                .reviewContent(String.valueOf(map.get("reviewContent")))
                .reviewCreatedAt(Timestamp.valueOf(String.valueOf(map.get("reviewCreatedAt"))))
                .reviewRating(Integer.parseInt(String.valueOf(map.get("reviewRating"))))
                .build();
    }
}
