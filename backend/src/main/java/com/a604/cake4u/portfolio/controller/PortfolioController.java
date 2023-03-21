package com.a604.cake4u.portfolio.controller;

import com.a604.cake4u.portfolio.dto.CakeFilter;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.dto.PortfolioSaveDto;
import com.a604.cake4u.portfolio.dto.PortfolioUpdateDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.service.PortfolioService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@Api("Portfolio Controller")
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/portfolio")
public class PortfolioController {
    private final PortfolioService portfolioService;

    //포트폴리오 생성
    @ApiOperation(value = "포트폴리오 생성", notes = "req_data : " +
            "[" +
            "\n" +
            "    long sellerId\n" +
            "\n" +
            "    EGender gender\n" +
            "\n" +
            "    ESituation situation\n" +
            "\n" +
            "    int ageGroup\n" +
            "\n" +
            "    ESheetSize size\n" +
            "\n" +
            "    ESheetShape shape\n" +
            "\n" +
            "    EColor color\n" +
            "\n" +
            "    ESheetTaste sheetTaste\n" +
            "\n" +
            "    ECreamTaste creamTaste\n" +
            "\n" +
            "    private String detail\n" +
            "\n" +
            "    private LocalDateTime createdAt\n" +
            "]")
    @PostMapping
    public ResponseEntity<?> createPortfolio(@RequestBody PortfolioSaveDto portfolioSaveDto) {
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
    @ApiOperation(value = "포트폴리오 조회", notes = "req_data : [long portfolioId]")
    public ResponseEntity<?> getPortfolio(@PathVariable Long id) {
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
    @ApiOperation(value = "전체 포트폴리오 조회")
    public ResponseEntity<?> getAllPortfolios() {
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
    @ApiOperation(value = "특정 판매자의 모든 포트폴리오 조회", notes = "req_data : [long sellerId]")
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

    @PatchMapping
    @ApiOperation(value = "포트폴리오 수정", notes = "req_data : [long portfolioId]")
    public ResponseEntity<?> updatePortfolio(@RequestBody PortfolioUpdateDto portfolioUpdateDto) {
        Objects.requireNonNull(portfolioUpdateDto, "PortfolioUpdateDto must not be null");

        // 클라이언트로부터 받은 id 값으로 해당 포트폴리오를 수정합니다.
        Portfolio updatedPortfolio = portfolioService.modifyPortfolio(portfolioUpdateDto);

        // 수정된 포트폴리오를 클라이언트에게 반환합니다.
        return ResponseEntity.ok().body(updatedPortfolio);
    }


    // 포트폴리오 삭제
    @DeleteMapping("/{id}")
    @ApiOperation(value = "포트폴리오 삭제", notes = "req_data : [long portfolioId]")
    public ResponseEntity<?> deletePortfolio(@PathVariable Long id) {
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

    //포트폴리오 케이크 쿼리dsl 필터
    @GetMapping("/filter")
    @ApiOperation(value = "포트폴리오 필터 검색(케이크)", notes = "req_data : " +
            "[" +
            "\n" +
            "    ESheetSize size\n" +
            "\n" +
            "    EColor color\n" +
            "\n" +
            "    ESheetShape shape\n" +
            "\n" +
            "    ESheetTaste sheetTaste\n" +
            "\n" +
            "    ESituation situation\n" +
            "\n" +
            "    EGender gender\n" +
            "]")
    public ResponseEntity<List<PortfolioResponseDto>> getPortfolioFiltered(CakeFilter cakeFilter) {
        List<PortfolioResponseDto> portfolioList = portfolioService.findPortfolioCakeFilter(cakeFilter);
        return ResponseEntity.ok(portfolioList);
    }
}