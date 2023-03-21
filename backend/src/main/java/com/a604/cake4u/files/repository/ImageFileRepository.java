package com.a604.cake4u.files.repository;

import com.a604.cake4u.files.entity.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFile, Long> {
    ImageFile save(ImageFile imageFile);

    //  주문서 id에 해당하는 이미지 파일을 모두 찾음
    Optional<List<ImageFile>> findAllByOrderSheet_OrderSheetId(Long orderSheetId);
    
    //  포트폴리오 id에 해당하는 이미지 파일을 모두 찾음
    Optional<List<ImageFile>> findAllByPortfolio_PortfolioId(Long portfolioId);
    
    //  판매자 id에 해당하는 이미지 파일을 모두 찾음
    Optional<List<ImageFile>> findAllBySeller_SellerId(Long sellerId);
}
