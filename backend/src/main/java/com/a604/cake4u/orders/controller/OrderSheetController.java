package com.a604.cake4u.orders.controller;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.orders.dto.request.OrderSheetRegistVO;
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

import static com.a604.cake4u.exception.ErrorMessage.ORDER_SHEET_REGIST_CLIENT_ERROR;
import static com.a604.cake4u.exception.ErrorMessage.ORDER_SHEET_REGIST_SERVER_ERROR;

@RestController
@RequestMapping("/order-sheet")
@RequiredArgsConstructor
@Slf4j
public class OrderSheetController {
    private final OrderSheetService orderSheetService;
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

            OrderSheetRegistVO orderSheetRegistVO = createVO(map);

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
    public ResponseEntity<?> getOrderSheet(@PathVariable Long orderSheetId) {
        OrderSheetResponseDto orderSheetResponseDto = orderSheetService.getOrderSheetByOrderSheetId(orderSheetId);
        return new ResponseEntity<>(orderSheetResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{buyerId}")
    public ResponseEntity<?> getBuyerOrderSheet(@PathVariable Long buyerId) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getOrderSheetsByBuyerId(buyerId);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/{sellerId}")
    public ResponseEntity<?> getSellerOrderSheet(@PathVariable Long sellerId) {
        List<OrderSheetResponseDto> orderSheetResponseDtoList = orderSheetService.getOrderSheetsBySellerId(sellerId);
        return new ResponseEntity<>(orderSheetResponseDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/{orderSheetId}")
    public ResponseEntity<?> cancleOrderSheet(@PathVariable Long orderSheetId) {

        Long ret = orderSheetService.deleteOrderSheetByOrderSheetId(orderSheetId);  //  삭제된 주문 id

        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    private OrderSheetRegistVO createVO(Map<String, Object> map) {
        return OrderSheetRegistVO.builder()
                .buyerId(Long.parseLong(String.valueOf(map.get("buyerId"))))
                .sellerId(Long.parseLong(String.valueOf(map.get("sellerId"))))
                .status(EStatus.valueOf(String.valueOf(map.get("status"))))     //  String to Enum
                .createdAt(Timestamp.valueOf(String.valueOf(map.get("createdAt"))))
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
}
