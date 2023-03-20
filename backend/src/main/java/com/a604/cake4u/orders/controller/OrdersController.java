package com.a604.cake4u.orders.controller;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.orders.dto.request.OrdersRegistVO;
import com.a604.cake4u.orders.service.OrdersService;
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

import static com.a604.cake4u.exception.ErrorMessage.ORDERS_REGIST_CLIENT_ERROR;
import static com.a604.cake4u.exception.ErrorMessage.ORDERS_REGIST_SERVER_ERROR;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Slf4j
public class OrdersController {
    private final OrdersService ordersService;
    @PostMapping
    public ResponseEntity<?> registOrder(
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "ordersVO")String ordersVOString) {
        ResponseEntity<?> ret = null;
        
        try {
            JSONParser jsonParser = new JSONParser(ordersVOString);
            Object obj = jsonParser.parse();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.convertValue(obj, Map.class);

            log.info("map = " + map);

            OrdersRegistVO ordersRegistVO = createVO(map);

            log.info("OrdersRegistVO = " + ordersRegistVO);

            Long orderId = ordersService.registOrders(files, ordersRegistVO);
            ret = new ResponseEntity<>("주문 등록 성공\n주문 번호 : " + orderId, HttpStatus.OK);
        } catch(ParseException e) { //  client가 요청을 잘못한 경우
            ret = new ResponseEntity<>("주문 등록 실패, 주문 양식 에러", HttpStatus.BAD_REQUEST);
            throw new BaseException(ORDERS_REGIST_CLIENT_ERROR);
        } catch(Exception e) {  //  server 문제인 경우
            ret = new ResponseEntity<>("주문 등록 실패, 서버 에러", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new BaseException(ORDERS_REGIST_SERVER_ERROR);  
        } finally {
            return ret;
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable Long orderId) {
        return null;
    }

    @GetMapping("/{buyerId}")
    public ResponseEntity<?> getBuyerOrders(@PathVariable Long buyerId) {
        return null;
    }

    @GetMapping("/{sellerId}")
    public ResponseEntity<?> getSellerOrders(@PathVariable Long sellerId) {
        return null;
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> cancleOrder(@PathVariable Long orderId) {
        return null;
    }

    private OrdersRegistVO createVO(Map<String, Object> map) {
        return OrdersRegistVO.builder()
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
