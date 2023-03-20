package com.a604.cake4u.files.handler;

import com.a604.cake4u.exception.BaseException;
import com.a604.cake4u.files.entity.Files;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import io.jsonwebtoken.lang.Collections;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.a604.cake4u.exception.ErrorMessage.NOT_CREATE_DIRECTORY;

@Component
@RequiredArgsConstructor
@Slf4j
public class FileHandler {
    private String publicPath = "";
    private String webPath;

    /**
     *
     * @param multipartFileList : 입력받은 다중 파일 리스트
     * @return                  : 입력받은 다중 파일 리스트에서 파일 각각을 Files Entity로 변환하여 Entity 리스트에 저장 후 그 리스트를 반환한다.
     * @throws BaseException
     */
    public List<Files> parseFileInfo(List<MultipartFile> multipartFileList) throws BaseException, IOException {
        //  반환할 파일 리스트
        List<Files> retFilesList = new ArrayList<>();

        //  전달된 파일 리스트가 존재할 경우
        if(Collections.isEmpty(multipartFileList)) {
            //  파일명을 파일을 업로드한 날짜로 변환하여 저장
            LocalDateTime now = LocalDateTime.now();    //  현재 날짜
            String currentDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));   //  현재 날짜를 yyyyMMdd 꼴의 문자열로 변경

            //  프로젝트 디렉토리 내의 저장을 위한 절대 경로 projAbsolutePath 설정
            //  경로 구분자 File.seperator 사용

            //  프로젝트 디렉토리의 절대 경로 얻어옴.
            StringBuilder projAbsolutePath = new StringBuilder(new File(publicPath).getAbsolutePath()).append(File.separator);
            log.info("projAbsolutePath = ", projAbsolutePath.toString());

            //  파일을 저장할 디렉토리 세부 경로
            StringBuilder directoryPath = new StringBuilder(projAbsolutePath).append(File.separator).append("images").append(File.separator).append(currentDate);
            webPath = currentDate;

            log.info("directoryPath = ", directoryPath.toString());
            log.info("webPath = ", webPath);

            //  디렉토리
            File file = new File(directoryPath.toString());

            //  해당 디렉토리가 존재하지 않을 경우
            if(!file.exists()) {
                //  디렉토리 생성
                boolean success = file.mkdirs();

                if(!success) {  //  디렉토리 생성에 실패한 경우
                    log.error("directory was not successful");
                    throw new BaseException(NOT_CREATE_DIRECTORY);  //  디렉토리 생성 실패 예외 발생
                }
            }

            //  다중 파일 처리
            for(MultipartFile multipartFile : multipartFileList) {
                //  파일 확장자 추출
                String origFileExtension = null;
                String contentType = multipartFile.getContentType();

                //  확장자명이 존재하지 않을 경우 해당 파일은 처리 x
                if(ObjectUtils.isEmpty(contentType))
                    continue;

                else {  //  확장자가 jpeg, jpg, png인 파일들만 받아서 처리
                    if(contentType.contains("image/jpeg") || contentType.contains("image/jpg"))
                        origFileExtension = ".jpg";
                    else if(contentType.contains("image/png"))
                        origFileExtension = ".png";
                    else continue;
                }

                //  파일명 중복 방지를 위해 나노초까지 가져와서 저장함
                String newFileName = System.nanoTime() + origFileExtension;

//                //  파일 DTO 생성
//                FilesDto filesDto = FilesDto.builder()
//                        .origFileName(multipartFile.getOriginalFilename())
//                        .fileUri(webPath + "/" + newFileName)
//                        .build();
//
//                log.info("fileDto uri = ", filesDto.getFileUri());

                //  파일 DTO를 이용하여 Files 엔티티를 생성
                Files files = Files.builder()
                        .origFileName(multipartFile.getOriginalFilename())
                        .fileUri(webPath + "/" + newFileName)
                        .build();

                log.info("files entity uri = ", files.getFileUri());

                //  생성 후 리스트에 추가
                retFilesList.add(files);

                //  업로드한 파일 데이터를 지정한 파일에 저장
                file = new File(directoryPath + File.separator + newFileName);
                multipartFile.transferTo(file);

                //  파일 권한 설정(실행, 쓰기, 읽기)
                file.setExecutable(true);
                file.setReadable(true);
                file.setWritable(true);
            }

        }   //  if-not-empty-end

        return retFilesList;
    }
}
