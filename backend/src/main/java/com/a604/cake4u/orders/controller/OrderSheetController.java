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

    /**
     * 
     * @param files : 주문 등록 시 같이 등록할 사진 파일 리스트
     * @param orderSheetRegistVOString : 주문서 내용
     * @return
     */
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
            e.printStackTrace();
            ret = new ResponseEntity<>("주문 등록 실패, 주문 양식 에러", HttpStatus.BAD_REQUEST);
            throw new BaseException(ORDER_SHEET_REGIST_CLIENT_ERROR);
        } catch(Exception e) {  //  server 문제인 경우
            e.printStackTrace();
            ret = new ResponseEntity<>("주문 등록 실패, 서버 에러", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new BaseException(ORDER_SHEET_REGIST_SERVER_ERROR);
        } finally {
            return ret;
        }
    }

    /**
     * 
     * @param orderSheetId : 리뷰 등록할 주문서 id
     * @param files : 리뷰와 함께 등록할 사진 파일 리스트
     * @param orderSheetReviewVOString : 리뷰 내용
     * @return
     */
    @PutMapping("/{orderSheetId}")
    public ResponseEntity<?> registReview(
            @PathVariable(name = "orderSheetId") Long orderSheetId,
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "orderSheetReviewVOString")String orderSheetReviewVOString) {
        log.info("registReview!!!!!!!!");
        log.info("orderSheetId = " + orderSheetId);

        ResponseEntity<?> ret = null;
        log.info("ret = " + ret);

        try {
            log.info("orderSheetReviewVOString = " + orderSheetReviewVOString);
            JSONParser jsonParser = new JSONParser(orderSheetReviewVOString);
            log.info("1!!!!!");
            Object obj = jsonParser.parse();
            log.info("obj = " + obj);
            log.info("2!!!!!");
            ObjectMapper mapper = new ObjectMapper();
            log.info("3!!!!!");
            Map<String, Object> map = mapper.convertValue(obj, Map.class);
            log.info("4!!!!!");

            log.info("map : " + map);
            
            OrderSheetReviewVO orderSheetReviewVO = createReviewVO(map);

            log.info("OrderSheetReviewVO = " + orderSheetReviewVO);

            Long retId = orderSheetService.registReview(orderSheetId, files, orderSheetReviewVO);

            log.info("retId = " + retId);

            ret = new ResponseEntity<>("리뷰 등록 성공", HttpStatus.OK);
        } catch(ParseException e) {
            e.printStackTrace();
            ret = new ResponseEntity<>("리뷰 등록 실패, 리뷰 양식 에러", HttpStatus.BAD_REQUEST);
            throw new BaseException(ORDER_REVIEW_CLIENT_ERROR);
        } catch(Exception e) {
            e.printStackTrace();
            ret = new ResponseEntity<>("리뷰 등록 실패, 서버 에러", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new BaseException(ORDER_REVIEW_SERVER_ERROR);
        } finally {
            log.info("종국엔 여기로 옴");
            return ret;
        }
    }

    /**
     *  https://web-dev.tistory.com/927
     * @param orderSheetId : 견적서 보낼 id
     * @param estimate : 견적서 내용 (Key : price, dueDate)
     * @return
     */
    @PutMapping("/{orderSheetId}/send_estimation")
    public ResponseEntity<?> sendEstimation(
            @PathVariable(name = "orderSheetId")Long orderSheetId,
            @RequestBody Map<String, Object> estimate) {
        log.info("sendEstimation!!!");

        int price = Integer.parseInt(String.valueOf(estimate.get("price")));
        log.info("price = " + price);

        LocalDate dueDate = LocalDate.parse(String.valueOf(estimate.get("dueDate")), DateTimeFormatter.ISO_DATE);
        log.info("dueDate = " + dueDate);

        Long send = orderSheetService.sendOrderSheetEstimate(orderSheetId, price, dueDate);

        return send == 1L ? new ResponseEntity<>("견적서 전송 성공", HttpStatus.OK) : new ResponseEntity<>("견적서 전송 실패", HttpStatus.BAD_REQUEST);
    }

    /**
     *
     * @param orderSheetId : 취소할 주문 id
     * @return
     */
    @DeleteMapping("/{orderSheetId}")
    public ResponseEntity<?> cancelOrderSheet(@PathVariable(name = "orderSheetId") Long orderSheetId) {
        //  주문서에 저장된 이미지 파일 전부 제거
        int deletedImages = imageFileService.deleteImageFilesByOrderSheetId(orderSheetId);

        log.info("deletedImages = " + deletedImages);
        //  DB에서 주문서 정보 삭제
        Long deletedOrderSheetId = orderSheetService.deleteOrderSheetByOrderSheetId(orderSheetId);  //  삭제된 주문 id
        log.info("deletedOrderSheetId = " + deletedOrderSheetId);
        StringBuilder sb = new StringBuilder("삭제된 이미지 개수 : ").append(deletedImages).append("\n")
                .append("삭제된 주문서 id = ").append(deletedOrderSheetId).append("\n");

        return new ResponseEntity<>(sb, HttpStatus.OK);
    }

    @GetMapping("/{orderSheetId}")
    public ResponseEntity<?> getOrderSheet(@PathVariable(name = "orderSheetId") Long orderSheetId) {
        OrderSheetResponseDto orderSheetResponseDto = orderSheetService.getOrderSheetByOrderSheetId(orderSheetId);
        return new ResponseEntity<>(orderSheetResponseDto, HttpStatus.OK);
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<?> getBuyerOrderSheet(@PathVariable(name = "buyerId") Long buyerId) {
        System.out.println("ordersheet get buyerId test");
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getOrderSheetsByBuyerId(buyerId);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/buyer/review/{buyerId}")
    public ResponseEntity<?> getBuyerReview(@PathVariable(name = "buyerId") Long buyerId) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getOrderReviewByBuyerId(buyerId);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<?> getSellerOrderSheet(@PathVariable(name = "sellerId") Long sellerId) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getOrderSheetsBySellerId(sellerId);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/buyer-status/{buyerId}/{status}")
    public ResponseEntity<?> getBuyerOrderSheetWithStatus(@PathVariable(name = "buyerId") Long buyerId, @PathVariable(name = "status")String status) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getBuyerOrderSheetsByStatus(buyerId, status);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/seller-status/{sellerId}/{status}")
    public ResponseEntity<?> getSellerOrderSheetWithStatus(@PathVariable(name = "sellerId") Long sellerId, @PathVariable(name = "status") String status) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getBuyerOrderSheetsByStatus(sellerId, status);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @PutMapping("/{orderSheetId}/update_status/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable(name = "orderSheetId") Long orderSheetId, @PathVariable(name = "status") String status) {
        return new ResponseEntity<>("상태 업데이트 된 주문서 번호 : " + orderSheetService.updateStatus(orderSheetId, status) + "\n업데이트 상태 : " + status, HttpStatus.OK);
    }

    private OrderSheetRegistVO createRegistVO(Map<String, Object> map) {
        return OrderSheetRegistVO.builder()
                .buyerId(Long.parseLong(String.valueOf(map.get("buyerId"))))
                .sellerId(Long.parseLong(String.valueOf(map.get("sellerId"))))
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
                .reviewRating(Integer.parseInt(String.valueOf(map.get("reviewRating"))))
                .build();
    }
}
