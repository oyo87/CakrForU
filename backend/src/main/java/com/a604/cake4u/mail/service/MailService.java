package com.a604.cake4u.mail.service;

import com.a604.cake4u.orders.dto.request.OrderSheetMailVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional
public class MailService {
    private final JavaMailSender javaMailSender;

    /**
     * @param orderSheetMailVO : 전송할 견적서 형식
     * @param buyerEmail : 메일을 전송할 구매자 email
     * return : 메일 전송 성공 시 1, 실패 시 -1 반환
     */
    public Long sendMail(OrderSheetMailVO orderSheetMailVO, String buyerEmail) {
        Long ret = 1L;
        
        try {
            //  단순 텍스트로 구성된 메일 메시지 생성할 때 이용
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

            //  수신자 설정
            simpleMailMessage.setTo(buyerEmail);

            //  메일 제목
            simpleMailMessage.setSubject("주문 확인서");

            //  메일 내용
            simpleMailMessage.setText(orderSheetMailVO.toString());

            //  메일 발송
            javaMailSender.send(simpleMailMessage);
        } catch(MailException e) {
            e.printStackTrace();
            ret = -1L;
        } finally {
            return ret;
        }
    }
}
