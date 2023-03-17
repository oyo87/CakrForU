package com.a604.cake4u.portfolio.controller;

import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.dto.PortfolioSaveDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/portfolio")
public class PortfolioController {
    private final PortfolioService portfolioService;

    //포트폴리오 생성
    @PostMapping
    public ResponseEntity<?> createPortfolio(@RequestBody PortfolioSaveDto portfolioSaveDto){
        try {
            log.info("In createPortfolio");
            log.info("portfolioSaveDto = " + portfolioSaveDto);

            Portfolio portfolio = portfolioService.uploadPortfolio(portfolioSaveDto);

            return new ResponseEntity<>(portfolio, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error creating portfolio: " + e.getMessage());
            return new ResponseEntity<>("Error creating portfolio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 포트폴리오 하나 얻기
    @GetMapping("/{id}")
    public ResponseEntity<?> getPortfolio(@PathVariable Long id){
        try {
            log.info("In getPortfolio");
            log.info("id = " + id);

            PortfolioResponseDto portfolio = portfolioService.getPortfolio(id);

            return new ResponseEntity<>(portfolio, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error getting portfolio: " + e.getMessage());
            return new ResponseEntity<>("Error getting portfolio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 모든 포트폴리오 얻기
    @GetMapping
    public ResponseEntity<?> getAllPortfolios(){
        try {
            log.info("In getAllPortfolios");

            List<PortfolioResponseDto> portfolios = portfolioService.getAllPortfolios();

            return new ResponseEntity<>(portfolios, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error getting all portfolios: " + e.getMessage());
            return new ResponseEntity<>("Error getting all portfolios: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //특정 판매자의 모든 포트폴리오 가져오기
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<?> getPortfoliosBySellerId(@PathVariable Long sellerId) {
        try {
            log.info("In getPortfoliosBySellerId");
            List<PortfolioResponseDto> portfolios = portfolioService.getPortfoliosBySellerId(sellerId);
            return new ResponseEntity<>(portfolios, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error getting portfolios by seller id: " + e.getMessage());
            return new ResponseEntity<>("Error getting portfolios by seller id: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 포트폴리오 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePortfolio(@PathVariable Long id){
        try {
            log.info("In deletePortfolio");
            log.info("id = " + id);

            portfolioService.deletePortfolio(id);

            return new ResponseEntity<>("Portfolio deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error deleting portfolio: " + e.getMessage());
            return new ResponseEntity<>("Error deleting portfolio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}