/* eslint-disable prefer-template */
/* eslint-disable no-else-return */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import originalAxios from "axios";
import axios from "./util/axiosInstance";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";
import GoBack from "./assets/img/go_back.png";
import GapH from "./components/layout/GapH";
import GapW from "./components/layout/GapW";
import RowContainer from "./components/layout/RowContainer";
import BoldLarge from "./components/text/BoldLarge";
import BoldMediumSmall from "./components/text/BoldMediumSmall";
import Button1 from "./components/button/Button1";
import Button4 from "./components/button/Button4";
import Large from "./components/text/Large";
import AddFile from "./assets/img/add_file.png";
import Select from "./components/Select";

const Text = styled.textarea`
  width: 542px;
  height: 230px;
  border: 1px solid #d8d8d8;
  padding-left: 20px;
  padding-top: 20px;
`;
const FileButton = styled.img`
  cursor: pointer;
`;

function MakeOrder() {
  const { storeId } = useParams();
  const user = useSelector((state) => state.login.user);
  const diyImage = useSelector((state) => state.image.diyImage);
  const BUYER_ID = user && user.id;
  const navigate = useNavigate();

  const [sellerSheetShape, setSellerSheetShape] = useState([]); //  가게에서 다루는 케이크 재료 정보들
  const [sellerSheetSize, setSellerSheetSize] = useState([]);
  const [sellerSheetTaste, setSellerSheetTaste] = useState([]);
  const [sellerCreamTaste, setSellerCreamTaste] = useState([]);

  const [imageSrcs, setImageSrcs] = useState([diyImage]);
  const [sheetShape, setSheetShape] = useState(null); //  선택된 것들 저장
  const [sheetSize, setSheetSize] = useState(null);
  const [sheetTaste, setSheetTaste] = useState(null);
  const [creamTaste, setCreamTaste] = useState(null);
  const [details, setDetails] = useState(null);

  const [imageFiles, setImageFiles] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [dict, setDict] = useState({});

  useEffect(() => {
    setDict({
      CIRCLE: "원형",
      HEART: "하트",
      RECTANGLE: "사각",
      OTHERS: "입체",
      MINI: "미니",
      NO1: "1호",
      NO2: "2호",
      NO3: "3호",
      VANILLA: "바닐라",
      CHOCOLATE: "초코",
      EARL_GRAY: "얼그레이",
      RED_VELVET: "레드벨벳",
      MATCHA: "말차",
      MOCHA: "모카",
      CHEESE: "치즈",
      CARROT: "당근",
      SWEET_POTATO: "고구마",
      CREAM_CHEESE: "크림치즈",
      WHIPPING_CREAM: "휘핑크림",
      CHOCOLATE_CREAM: "초코크림",
      OREO_CREAM: "오레오크림",
      MATCHA_CREAM: "말차크림",
      BLACK_SESAME_CREAM: "흑임자크림",
      SWEET_POTATO_CREAM: "고구마무스",
      EARL_GRAY_CREAM: "얼그레이크림",
      STRAWBERRY_CREAM: "딸기크림",
    });

    console.log("diyImage", diyImage);

    axios
      .get(`/seller/form/${storeId}`)
      .then((response) => {
        console.log(response.data);
        const tmp1 = Object.entries(response.data.sheetShape);
        const filtered1 = tmp1.filter(([, ok]) => ok === true);
        const tmp2 = Object.entries(response.data.sheetSize);
        const filtered2 = tmp2.filter(([, ok]) => ok === true);
        const tmp3 = Object.entries(response.data.sheetTaste);
        const filtered3 = tmp3.filter(([, ok]) => ok === true);
        const tmp4 = Object.entries(response.data.creamTaste);
        const filtered4 = tmp4.filter(([, ok]) => ok === true);

        setSellerSheetShape(Object.entries(filtered1));
        setSellerSheetSize(Object.entries(filtered2));
        setSellerSheetTaste(Object.entries(filtered3));
        setSellerCreamTaste(Object.entries(filtered4));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  버튼 클릭으로 선택 저장
  const handleShape = (shape) => {
    setSheetShape(shape);
  };
  const handleSize = (size) => {
    setSheetSize(size);
  };
  const handleTaste = (taste) => {
    setSheetTaste(taste);
  };
  const handleCream = (cream) => {
    setCreamTaste(cream);
  };

  const handleDetails = (event) => {
    setDetails(event.target.value);
  };

  const readUploadedFileAsDataURL = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  const handleImageFiles = async (event) => {
    setImageFiles(event.target.files);

    // Read the uploaded files and update the imageSrcs state
    for (let i = 0; i < event.target.files.length; i += 1) {
      const file = event.target.files[i];
      try {
        // eslint-disable-next-line no-await-in-loop
        const dataUrl = await readUploadedFileAsDataURL(file);
        setImageSrcs((prevImageSrcs) => [...prevImageSrcs, dataUrl]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDiffusion = () => {
    const promptParts = ["LETTERING CAKE"];
    if (sheetShape) {
      promptParts.push(sheetShape.toUpperCase());
    }
    if (sheetTaste) {
      promptParts.push(sheetTaste.toUpperCase());
    }
    if (creamTaste) {
      promptParts.push(creamTaste.toUpperCase());
    }
    const finalPrompt = promptParts.join(", ");

    // prompt: "LETTERING CAKE, RED, CREAM_CHEESE, CIRCLE, VANILLA",
    originalAxios
      .post("https://6ee367948a09.ngrok.app/sdapi/v1/txt2img", {
        prompt: finalPrompt,
        steps: 20,
        sampler_index: "Euler a",
      })
      .then((res) => {
        const imageData = res.data.images[0];
        const imageUrl = `data:image/png;base64,${imageData}`;
        setImageSrcs((prevImageSrcs) => [...prevImageSrcs, imageUrl]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    // eslint-disable-next-line prefer-template
    const pickUpDate = year + "-" + month + "-" + day;

    const VO = {
      buyerId: BUYER_ID,
      sellerId: storeId,
      sheetShape,
      sheetSize,
      sheetTaste,
      creamTaste,
      buyerMessage: details,
      pickUpDate,
    };

    const formSendData = new FormData();
    for (let i = 0; i < imageFiles.length; i += 1)
      formSendData.append("files", imageFiles[i]);
    formSendData.append("orderSheetRegistVOString", JSON.stringify(VO));

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post(`/order-sheet`, formSendData, config)
      .then((response) => {
        console.log("response : ", response);
        window.alert("주문이 완료되었습니다.");
        navigate(-1);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  const getDaysInMonth = (yearParam, monthParam) => {
    if (monthParam === 2) {
      if (
        yearParam % 4 === 0 &&
        (yearParam % 100 !== 0 || yearParam % 400 === 0)
      ) {
        return 29;
      } else {
        return 28;
      }
    } else if ([4, 6, 9, 11].includes(monthParam)) {
      return 30;
    } else {
      return 31;
    }
  };

  const daysInSelectedMonth =
    month && year ? getDaysInMonth(year, Number(month)) : null;

  return (
    <div>
      <Header />
      <LeftRightContainer background="#F5F2EF">
        <ColContainer width="468px">
          <GapH height="140px" />
          <RowContainer justify="end">
            <img
              src={GoBack}
              alt="img"
              style={{
                width: "50px",
              }}
            />
            <GapW width="41px" />
          </RowContainer>
        </ColContainer>
        <ColContainer width="631px" align="start">
          <GapH height="137px" />
          <BoldLarge>주문서 작성</BoldLarge>
          <GapH height="37px" />
          <RowContainer justify="start">
            <Select
              options={Array.from(
                { length: 50 },
                (_, i) => new Date().getFullYear() - i
              ).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
              placeholder="--년도--"
              width="200px"
              onChange={(e) => {
                console.log(e.value.key);
                setYear(e.value.key);
              }}
            />
            <Select
              options={Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m.toString().padStart(2, "0")}>
                  {m.toString().padStart(2, "0")}
                </option>
              ))}
              placeholder="--월--"
              width="200px"
              onChange={(e) => {
                if (e.value.key.length === 1) {
                  const m = "0".concat(e.value.key);
                  setMonth(m);
                } else {
                  setMonth(e.value.key);
                }
                // setMonth(e.value);
                // setDay(e.value);
                // console.log(daysInSelectedMonth);
              }}
            />
            <Select
              options={Array.from(
                { length: daysInSelectedMonth },
                (_, i) => i + 1
              ).map((d) => (
                <option key={d} value={d.toString().padStart(2, "0")}>
                  {d.toString().padStart(2, "0")}
                </option>
              ))}
              placeholder="--일--"
              width="200px"
              onChange={(e) => {
                console.log(e.value.key);
                if (e.value.key.length === 1) {
                  const d = "0".concat(e.value.key);
                  setDay(d);
                } else {
                  setDay(e.value.key);
                }
              }}
            />
          </RowContainer>
          <GapH height="33px" />
          <ColContainer width="631px" background="white" justify="start">
            <GapH height="20px" />
            <RowContainer justify="start">
              <GapW width="40px" />
              <BoldMediumSmall>시트 모양 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 124px)",
                  gridGap: "18px 19px",
                }}
              >
                {sellerSheetShape.map((element) => (
                  <Button1
                    key={element[1][0]}
                    background={
                      sheetShape === element[1][0].toUpperCase()
                        ? "#FFACAC"
                        : "grey"
                    }
                    onClick={() => {
                      handleShape(element[1][0].toUpperCase());
                    }}
                  >
                    {dict[element[1][0].toUpperCase()]}
                  </Button1>
                ))}
              </div>
            </RowContainer>
            <GapH height="20px" />
          </ColContainer>
          <GapH height="18px" />
          <ColContainer width="631px" background="white" justify="start">
            <GapH height="18px" />
            <RowContainer justify="start">
              <GapW width="40px" />
              <BoldMediumSmall>호수 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 124px)",
                  gridGap: "18px 19px",
                }}
              >
                {sellerSheetSize.map((element) => (
                  <Button1
                    key={element[1][0]}
                    background={
                      sheetSize === element[1][0].toUpperCase()
                        ? "#FFACAC"
                        : "grey"
                    }
                    onClick={() => {
                      handleSize(element[1][0].toUpperCase());
                    }}
                  >
                    {dict[element[1][0].toUpperCase()]}
                  </Button1>
                ))}
              </div>
            </RowContainer>
            <GapH height="18px" />
          </ColContainer>
          <GapH height="18px" />
          <ColContainer
            // height="246px"
            width="631px"
            background="white"
            justify="start"
          >
            <GapH height="20px" />
            <RowContainer justify="start">
              <GapW width="40px" />
              <BoldMediumSmall>시트 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 124px)",
                  gridGap: "18px 19px",
                }}
              >
                {sellerSheetTaste.map((element) => (
                  <Button1
                    key={element[1][0]}
                    background={
                      sheetTaste === element[1][0].toUpperCase()
                        ? "#FFACAC"
                        : "grey"
                    }
                    onClick={() => {
                      handleTaste(element[1][0].toUpperCase());
                    }}
                  >
                    {dict[element[1][0].toUpperCase()]}
                  </Button1>
                ))}
              </div>
            </RowContainer>
            <GapH height="20px" />
          </ColContainer>

          <GapH height="18px" />
          <ColContainer width="631px" background="white" justify="start">
            <GapH height="20px" />
            <RowContainer justify="start">
              <GapW width="40px" />
              <BoldMediumSmall>크림 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 124px)",
                  gridGap: "18px 19px",
                }}
              >
                {sellerCreamTaste.map((element) => (
                  <Button1
                    key={element[1][0]}
                    background={
                      creamTaste === element[1][0].toUpperCase()
                        ? "#FFACAC"
                        : "grey"
                    }
                    onClick={() => {
                      handleCream(element[1][0].toUpperCase());
                    }}
                  >
                    {dict[element[1][0].toUpperCase()]}
                  </Button1>
                ))}
              </div>
            </RowContainer>
            <GapH height="20px" />
          </ColContainer>

          <GapH height="18px" />

          <RowContainer justify="start">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => handleImageFiles(event)}
              className="hidden"
              id="file"
            />
          </RowContainer>

          <GapH height="18px" />
          <ColContainer height="246px" width="581px" background="white">
            <GapH height="38px" />
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>추가 전달 사항</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <Text onChange={handleDetails} />
            <GapH height="32px" />
          </ColContainer>
        </ColContainer>
        <ColContainer
          width="871px"
          height="1432px"
          justify="start"
          align="start"
          paddingLeft="132px"
        >
          <GapH height="160px" />
          <ColContainer height="1170px" width="378px">
            <ColContainer
              height="1100px"
              width="378px"
              background="white"
              justify="start"
              borderRadius="20px 0px 20px 0px"
            >
              <GapH height="59px" />
              <Large fontsize="40px" color="#9E9E9E">
                Fleuve cake
              </Large>
              <GapH height="47px" />
              <ColContainer height="700px" overflowY="auto" justify="start">
                {imageSrcs.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Generated ${index + 1}`}
                    style={{
                      width: "242px",
                      height: "242px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </ColContainer>

              <div
                style={{
                  flexGrow: 1,
                }}
              />
              <FileButton src={AddFile} alt="img" onClick={handleDiffusion} />
              <GapH height="63px" />
            </ColContainer>
            <GapH height="57px" />
            <Button4
              width="378px"
              height="115px"
              onClick={() => {
                handleSubmit();
              }}
            >
              <BoldLarge fontsize="40px" color="white">
                주문하기
              </BoldLarge>
            </Button4>
          </ColContainer>
        </ColContainer>
      </LeftRightContainer>
      ;
    </div>
  );
}

export default MakeOrder;
