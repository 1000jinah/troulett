import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Input,
  ListItemText,
  List,
} from "@mui/material";
import GiftIcon from "@mui/icons-material/CardGiftcardOutlined";
import DeleteIcon from "@mui/icons-material/DeleteSweepOutlined";
import WinningHistoryTable from "components/WinHistoryTable";
import ListTable from "components/ListTable";
import Profile from "components/Profile";
import DefaultBox from "components/DefaultBox";
import Header from "components/Header";
import ExampleCompChart from "components/ExampleChart";

const Test = () => {
  const [items, setItems] = useState(["꽝", "당첨", "당첨광"]); // 룰렛 내역들의 배열
  const [probabilities, setProbabilities] = useState([50, 10, 40]); // 룰렛 내역들의 확률 배열
  const [oneTimeAmount, setOneTimeAmount] = useState(2000); // 룰렛 1회 사용 금액
  const [cumulativeAmount, setCumulativeAmount] = useState(0); // 룰렛 사용 누적 금액
  const [winningHistory, setWinningHistory] = useState([]); // 룰렛 당첨 내역 리스트
  const [targetItem, setTargetItem] = useState(""); // 원하는 상품목록
  const [targetItemWinCount, setTargetItemWinCount] = useState(0); // 원하는 상품 목록 당첨 횟수
  const [totalSpentForTargetItem, setTotalSpentForTargetItem] = useState(0); // 원하는 상품 목록 당첨을 위해 사용한 총 금액
  const [excelFile, setExcelFile] = useState(null);
  const [selectedTargetItem, setSelectedTargetItem] = useState("");
  const [selectedTargetItemCount, setSelectedTargetItemCount] = useState(0);
  const [selectedTargetItemTotalSpins, setSelectedTargetItemTotalSpins] =
    useState(0);
  const [selectedExcelItem, setSelectedExcelItem] = useState(null);

  const handleSelectExcelItem = (excelItem) => {
    setSelectedExcelItem(excelItem);
    // Update items and probabilities based on selectedExcelItem
    setItems(excelItem.excDownItem);
    setProbabilities(excelItem.excDownPercent);
  
  };

  // 별 개수별 당첨 횟수와 상품 당첨 내역을 계산하는 함수
  const getStarCountAndItemFrequency = (data) => {
    const frequency = {
      1: { count: 0, items: [] },
      2: { count: 0, items: [] },
      3: { count: 0, items: [] },
      4: { count: 0, items: [] },
      5: { count: 0, items: [] },
    };

    data.forEach((win) => {
      const { starCount, item } = win;
      frequency[starCount].count++;
      frequency[starCount].items.push(item);
    });

    return frequency;
  };

  // 총 돌린 횟수 계산
  const totalSpins = winningHistory.length;
  // 인풋 값 변경 시 실행되는 함수
  console.log(
    targetItemWinCount,
    totalSpentForTargetItem,
    excelFile,
    selectedTargetItemCount,
    selectedTargetItemTotalSpins,
    setTargetItem,
    "12121212"
  );

  const handleInputChange = (name, value, index) => {
    if (name === "oneTimeAmount") {
      setOneTimeAmount(value);
    } else if (name === "cumulativeAmount") {
      setCumulativeAmount(value);
    } else if (name === "items") {
      const updatedItems = [...items];
      updatedItems[index] = value;
      setItems(updatedItems);
    } else if (name === "probabilities") {
      const updatedProbabilities = [...probabilities];
      updatedProbabilities[index] = parseFloat(value);
      setProbabilities(updatedProbabilities);
    } else if (name === "selectedTargetItem") {
      setSelectedTargetItem(value);
    }
  };
  const handleSpin = () => {
    if (!oneTimeAmount) {
      alert("1회 사용 금액을 입력해주세요.");
      return;
    }

    const totalProbability = probabilities.reduce((acc, curr) => {
      // 소수점 5자리까지 유효하도록 각 확률 값을 문자열로 변환 후 숫자로 다시 변환
      const currValue = parseFloat(curr.toFixed(5));
      return acc + currValue;
    }, 0);

    // 총 확률이 100%를 넘어섰을 경우, 최대 5자리까지만 표시하여 알림창에 보여줌
    if (totalProbability > 100) {
      alert(
        `확률의 합이 100%를 넘었습니다. 총 확률: ${totalProbability.toFixed(5)}`
      );
      return;
    }

    // 룰렛 돌리기 로직 구현
    const randomValue = Math.random() * 100;
    let selectedItemIndex = null;
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i];
      if (randomValue <= cumulativeProbability) {
        selectedItemIndex = i;
        setCumulativeAmount(cumulativeAmount + parseFloat(oneTimeAmount));
        break;
      }
    }

    // 당첨 내역 리스트 업데이트
    if (selectedItemIndex !== null) {
      let starCount = 1;

      // 확률에 따라 별 개수 결정
      if (randomValue <= 30) {
        starCount = 1; // 30% probability for 1 star
      } else if (randomValue <= 86) {
        starCount = 2; // 56% probability for 2 stars
      } else if (randomValue <= 99.02) {
        starCount = 3; // 13.02% probability for 3 stars
      } else if (randomValue <= 99.97) {
        starCount = 4; // 0.95% probability for 4 stars
      } else {
        starCount = 5; // 0.03% probability for 5 stars
      }
      let losingProbability = 0;

      if (starCount === 1) {
        losingProbability = probabilities[0]; // 1개 별일 때는 원래 확률 그대로
      } else if (starCount === 2) {
        losingProbability = probabilities[0] * 0.8; // 80% 확률로 조정
      } else if (starCount === 3) {
        losingProbability = probabilities[0] * 0.5; // 50% 확률로 조정
      } else if (starCount === 4) {
        losingProbability = probabilities[0] * 0.3; // 30% 확률로 조정
      } else if (starCount === 5) {
        losingProbability = probabilities[0] * 0.1; // 10% 확률로 조정
      }

      // probabilities 배열의 첫 번째 값을 losingProbability로 변경

      // probabilities 배열에서 첫 번째 값을 제외한 나머지 값을 저장할 변수
      const otherProbabilities = [...probabilities];
      otherProbabilities.shift(); // 첫 번째 요소 제거
      // "꽝"을 제외한 상품들의 확률 계산
      const sumOfOtherProbabilities = otherProbabilities.reduce(
        (sum, prob) => sum + prob,
        0
      );
      let sumValue = losingProbability + sumOfOtherProbabilities;
      const totalProbabilityExcludingLosing = 100 - sumValue;
      // 비율 계산 및 재분배
      const redistributedProbabilities = otherProbabilities.map(
        (prob) =>
          (prob / sumOfOtherProbabilities) * totalProbabilityExcludingLosing
      );

      // 재분배된 확률을 각각의 확률에 더해주기
      const finalProbabilities = [
        losingProbability,
        ...redistributedProbabilities,
      ];

      // 기존 확률과 재분배된 확률을 더해서 최종 확률 배열 생성
      const totalProbabilities = probabilities.map(
        (prob, index) => prob + finalProbabilities[index]
      );

      // Console.log를 통해 결과 확인
      console.log("등록내역:", probabilities);
      console.log(`별의 개수: ${starCount}`);
      console.log(`맨 처음 "꽝"의 확률: ${losingProbability}`);
      console.log(`꽝 제외 확률 합산:${sumOfOtherProbabilities}`);
      console.log("맨 처음 변화된 꽝의 확률 + 제외 기존 확률", sumValue);
      console.log("잔여 확률:", totalProbabilityExcludingLosing);
      console.log("각 상품의 확률:");
      console.log("재분배된 각 상품의 확률:");
      finalProbabilities.forEach((prob, index) => {
        if (index !== 0) {
          console.log(`${items[index - 1]}: ${prob.toFixed(2)}%`);
        }
      });

      console.log("최종 확률:");
      totalProbabilities.forEach((prob, index) => {
        if (index !== 0) {
          console.log(`${items[index]}: ${prob.toFixed(2)}%`);
        }
      });

      const winner = items[selectedItemIndex];
      let winnerPro = finalProbabilities[selectedItemIndex]; // 초기 winnerPro를 수정된 확률로 설정

      // index가 0인 경우, 초기 꽝의 확률을 추가하지 않음
      if (selectedItemIndex !== 0) {
        winnerPro += probabilities[selectedItemIndex];
      }
      const newWinningHistory = [
        ...winningHistory,
        {
          starCount,
          item: winner,
          probability: winnerPro, // 수정된 코드
        },
      ];
      setWinningHistory(newWinningHistory);

      // 원하는 상품이 당첨되었는지 체크
      if (winner === targetItem) {
        // Update the count of the selected target item wins
        setSelectedTargetItemCount((prevCount) => prevCount + 1);
        setSelectedTargetItemTotalSpins((prevTotalSpins) => prevTotalSpins + 1);
        setTotalSpentForTargetItem(
          (prevTotal) => prevTotal + parseFloat(oneTimeAmount)
        );
      }
    }
  };
  // 별 개수별 당첨 횟수와 상품 당첨 내역 계산
  // const starCountAndItemFrequency =
  //   getStarCountAndItemFrequency(winningHistory);
  // Function to get the count of the selected target item in the winning history
  // 별의 개수에 따라 "꽝"의 확률을 조정

  const getItemFrequencyForSelectedTargetItem = () => {
    return winningHistory.filter((win) => win.item === selectedTargetItem)
      .length;
  };
  // Function to calculate the count of each item in the winning history
  const getItemFrequency = (data) => {
    const frequency = {};

    data.forEach((win) => {
      const { item } = win;
      if (!frequency[item]) {
        frequency[item] = 0;
      }
      frequency[item]++;
    });

    return frequency;
  };

  const handleExcelReset = () => {
    setItems(["꽝", "당첨"]);
    setProbabilities([50, 50]);
    setWinningHistory([]);
    setTargetItemWinCount(0);
    setTotalSpentForTargetItem(0);
    setCumulativeAmount(0);
    setExcelFile(null); // Clear the uploaded Excel file data
    const fileInput = document.getElementById("excel-upload");
    if (fileInput) {
      fileInput.value = ""; // Only modify value if fileInput is not null
    }
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundColor: "#F8FAFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          position: "relative",
          py: "55px",
          "@media (max-width:1440px)": {
            position: "relative",
            height: "100%",
            paddingBottom: "95px",
          },
          "@media (max-width: 900px)": {
            justifyContent: "space-between",
            height: "auto",
            flexDirection: "column",

            p: 0,
          },
        }}
      >
        <>d</>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            "@media (max-width: 866px)": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: "10px",
              padding: "20px",
            }}
          >
            {/* 타이틀박스 */}
            <DefaultBox sx={{ backgroundColor: "transparent" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 30,
                  mb: 1,

                  color: "#3B3B3B",
                }}
              >
                룰렛 확률 계산기
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Button
                  sx={{
                    backgroundColor: "#26eae6",
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#fafafa",
                    mr: 3,
                    ":hover": {
                      backgroundColor: "#26eae6",
                    },
                  }}
                  onClick={handleSpin}
                  startIcon={<GiftIcon sx={{ marginBottom: "1px" }} />}
                >
                  룰렛 돌리기
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#faaaab",
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#fafafa",
                    ":hover": {
                      backgroundColor: "#faaaab",
                    },
                  }}
                  onClick={handleExcelReset}
                  startIcon={<DeleteIcon sx={{ marginBottom: "1px" }} />}
                >
                  리셋
                </Button>
              </Box>
            </DefaultBox>

            {/* 룰렛 1회 사용금액 */}
            <DefaultBox>
              <Typography sx={{ color: "#3B3B3B" }}>
                룰렛 1회 사용금액 (원) :
              </Typography>

              {selectedExcelItem && (
                <Input
                  sx={{ fontSize: "2rem", color: "#3B3B3B" }}
                  type="number"
                  value={
                    selectedExcelItem
                      ? selectedExcelItem.excDownPrice
                      : oneTimeAmount
                  }
                  onChange={(e) =>
                    handleInputChange("oneTimeAmount", e.target.value)
                  }
                />
              )}
            </DefaultBox>

            {/* 등록내역(테이블) */}
            <DefaultBox>
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                등록 내역
              </Typography>
              <ExampleCompChart
                items={items}
                probabilities={probabilities}
             
                handleInputChange={handleInputChange}
              />

              {/* <Box>
                <ListTable
                  items={items}
                  probabilities={probabilities}
                  handleInputChange={handleInputChange}
                />
              </Box> */}
            </DefaultBox>

            {/* 당첨내역(테이블) */}
            <DefaultBox>
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                당첨 내역
              </Typography>
              <Box sx={{ maxHeight: 250, border: "0px solid transparent" }}>
                <WinningHistoryTable winningHistory={winningHistory} />
              </Box>
            </DefaultBox>

            {/* 당첨내역리스트(횟수) */}
            <DefaultBox>
              {selectedExcelItem && (
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {selectedExcelItem.name}의 {selectedExcelItem.streamname}{" "}
                  {/* Display streamname here */}
                </Typography>
              )}
              <List sx={{ my: 0, py: 0 }}>
                {Object.entries(getItemFrequency(winningHistory)).map(
                  ([item, count]) => (
                    <ListItemText
                      sx={{ display: "flex" }}
                      key={item}
                      className="textsub"
                    >
                      {item} -{" "}
                      <Typography
                        variant="span"
                        sx={{ fontSize: 18, fontWeight: "bold" }}
                      >
                        {count}번
                      </Typography>{" "}
                      당첨
                    </ListItemText>
                  )
                )}
              </List>
            </DefaultBox>

            {/* 상품선택(셀렉트) */}
            <DefaultBox>
              <Box className="textmain">상품 선택</Box>
              <select
                label="상품을 선택하세요"
                style={{
                  border: "0px solid transparent",
                  padding: "8px 4px",
                  paddingRight: "12px",

                  outline: "none",
                }}
                value={selectedTargetItem}
                onChange={(e) =>
                  handleInputChange("selectedTargetItem", e.target.value)
                }
              >
                {items.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </DefaultBox>

            <DefaultBox>
              {/* 상품명 */}
              <Box>
                <Typography variant="span" className="textmain">
                  상품명:
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontWeight: "bold" }}
                  className="textsub"
                >
                  {selectedTargetItem !== null ? selectedTargetItem : "-"}
                </Typography>
              </Box>
              {/* 상품 확률(%) */}
              <Box>
                <Typography variant="span" className="textmain">
                  상품 확률(%):
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontWeight: "bold" }}
                  className="textsub"
                >
                  {getItemFrequencyForSelectedTargetItem() > 0
                    ? (
                        (getItemFrequencyForSelectedTargetItem() / totalSpins) *
                        100
                      ).toFixed(2)
                    : "-"}
                </Typography>
              </Box>
              {/* 룰렛 사용 누적 금액 */}
              <Box>
                <Typography variant="span" className="textmain">
                  룰렛 사용 누적 금액:
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontWeight: "bold" }}
                  className="textsub"
                >
                  {cumulativeAmount}원
                </Typography>
              </Box>
            </DefaultBox>

            <DefaultBox>
              {/* 상품 당첨 횟수 */}
              <Box>
                <Typography variant="span" className="textmain">
                  상품 당첨 횟수:
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontWeight: "bold" }}
                  className="textsub"
                >
                  {getItemFrequencyForSelectedTargetItem() > 0
                    ? getItemFrequencyForSelectedTargetItem()
                    : "-"}
                </Typography>
              </Box>
              {/* 상품 총 횟수 */}
              <Box>
                <Typography variant="span" className="textmain">
                  상품 총 횟수:
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontWeight: "bold" }}
                  className="textsub"
                >
                  {totalSpins > 0 ? totalSpins : "-"}
                </Typography>
              </Box>

              {/* 누적 룰렛 횟수 */}
              <Box>
                <Typography variant="span" className="textmain">
                  누적 룰렛 횟수:
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontWeight: "bold" }}
                  className="textsub"
                >
                  {totalSpins}회
                </Typography>
              </Box>
            </DefaultBox>

            {/* footer */}
          </Box>

          {/* 스트리머 검색 */}
          <DefaultBox sx={{ margin: "20px", marginTop: "-10px" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
              스트리머 검색
            </Typography>

            <Box
              sx={{
                height: "400px",
                overflowY: "auto",
              }}
            >
              <Profile
                onSelectExcelItem={(excelItem) => {
                  handleSelectExcelItem(excelItem);
                }}
              />
            </Box>
          </DefaultBox>
        </Box>
        <>d</>
        <Box
          sx={{
            width: "100%",
            marginTop: "65px",
            padding: "20px 0",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            "@media (max-width: 900px)": {
              position: "static",
            },
          }}
        >
          <p
            style={{ fontSize: "10px", color: "#3b3b3b", textAlign: "center" }}
          >
            1000jinah@gmail.com
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Test;

// 해당 코드에서 확률을 수정할거야. 조건이 2가지가 있는데 당첨될 떄 나타나는 별의 개수가 나올 확률과 별의 개수에 따라서 맨 처음의 꽝의 확률변화와 확률 재분배의 조건을 추가할거야.

// 우선 별의 개수는 1부터 5까지 있고, 별이 특정 개수가 될 확률은 1개는 30%, 2개은 56%, 3개은 13.02% 4개은 0.95, 5개은 0.03% 야.
// 그리고 별의 개수에 따라서 맨 처음의 꽝의 확률변화 값은 1개일 때는 원래 적용한 확률, 2개일 떄는 적용한 확률의 80%로 변화되고, 3개일 떄는 적용한 확률의 50%로 변화되고, 4개일 떄는 적용한 확률의 30%로 변화되고, 5개일 떄는 적용한 확률의 10%로 변화되게 할거야. 그렇게 되었을 때, 변화된 맨 첫번째의 꽝의 확률과 기존에 있었던 상품들의 확률들이 있을 텐데, 맨 첫번째의 꽝의 확률 변화로 100%가 안되고 나머지 확률이 있을 텐데 나머지 확률을 기존의 있었던 상품들의 확률을 비율에 맞게 재분배해서 합했을 때 100%가 되도록 만들어줘
