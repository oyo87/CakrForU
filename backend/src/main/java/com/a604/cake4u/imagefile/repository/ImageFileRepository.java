package com.a604.cake4u.imagefile.repository;

import com.a604.cake4u.imagefile.entity.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFile, Long> {
    ImageFile save(ImageFile imageFile);
    @Query(value="select imageFileUri from ImageFile where portfolio.id = :portfolioId")
    Optional<List<String>> findURLsByPortfolioId(@Param("portfolioId") Long portfolioId);

    @Query(value="select imageFileUri from ImageFile where seller.id = :sellerId")
    Optional<List<String>> findURLsBySellerId(@Param("sellerId") Long sellerId);
    
    @Query(value="select imageFileUri from ImageFile where orderSheet.id = :orderSheetId")
    Optional<List<String>> findURLsByOrderSheetId(@Param("orderSheetId") Long orderSheetId);

    //  주문서 id에 해당하는 이미지 파일을 모두 찾음
    @Query(value = "select imageFile from ImageFile imageFile where imageFile.orderSheet.id = :orderSheetId")
    Optional<List<ImageFile>> findAllByOrderSheet_OrderSheetId(@Param("orderSheetId")Long orderSheetId);

    //  포트폴리오 id에 해당하는 이미지 파일을 모두 찾음
    @Query(value = "select imageFile from ImageFile imageFile where imageFile.portfolio.id = :portfolioId")
    Optional<List<ImageFile>> findAllByPortfolio_PortfolioId(@Param("portfolioId")Long portfolioId);
    
    //  판매자 id에 해당하는 이미지 파일을 모두 찾음
    @Query(value = "select imageFile from ImageFile imageFile where imageFile.seller.id = :sellerId")
    Optional<List<ImageFile>> findAllBySeller_SellerId(@Param("sellerId")Long sellerId);
}
