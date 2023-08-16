import React, { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Box, Divider, Input } from "@mui/material";
import WinningHistoryTable from "components/WinHistoryTable";
import ListTable from "components/ListTable";
const TabContent = ({ isActive, children }) => {
  return (
    <div
      className="tab"
      style={{
        display: isActive ? "block" : "none",
      }}
    >
      {children}
    </div>
  );
};
const Roulette = () => {
  const [items, setItems] = useState(["꽝", "당첨"]); // 룰렛 내역들의 배열
  const [probabilities, setProbabilities] = useState([50, 50]); // 룰렛 내역들의 확률 배열
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
  const [activeTab, setActiveTab] = useState("tab1");
  // 엑셀 양식 다운로드 함수
  const downloadExcelTemplate = () => {
    const template = [
      ["상품목록", "확률"],
      ...items.map((item, index) => [item, probabilities[index]]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "룰렛양식");
    const excelFile = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelFile], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(blob, "룰렛_양식.xlsx");
  };
  // 엑셀 파일 업로드 함수
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // 첫 행(상품목록, 확률)을 제외한 데이터만 추출
      const excelData = rows.slice(1);

      // 상품목록과 확률을 업데이트
      const updatedItems = excelData.map((row) => row[0]);
      const updatedProbabilities = excelData.map((row) => parseFloat(row[1]));

      setItems(updatedItems);
      setProbabilities(updatedProbabilities);
    };
    reader.readAsArrayBuffer(file);
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
      if (randomValue <= 60) {
        starCount = 1; // 60%의 확률로 1개의 별이 나옴
      } else if (randomValue <= 85) {
        starCount = 2; // 25%의 확률로 2개의 별이 나옴
      } else if (randomValue <= 98) {
        starCount = 3; // 13%의 확률로 3개의 별이 나옴
      } else if (randomValue <= 99.7) {
        starCount = 4; // 1.7%의 확률로 4개의 별이 나옴
      } else {
        starCount = 5; // 나머지 0.3%의 확률로 5개의 별이 나옴
      }

      const winner = items[selectedItemIndex];
      const winnerPro = probabilities[selectedItemIndex];
      const newWinningHistory = [
        ...winningHistory,
        {
          starCount,
          item: winner,
          probability: winnerPro,
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
  const starCountAndItemFrequency =
    getStarCountAndItemFrequency(winningHistory);
  // Function to get the count of the selected target item in the winning history
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
    const fileInput = document.getElementById("excel-upload"); // Get the input element for file upload
    fileInput.value = ""; // Reset the value of the file input element to empty
  };

  return (
    <div>
      <div className="container">
        {/* 하나 - 타이틀 버전 */}
        <Box className="contents1">
          <h1>룰렛 확률 계산기</h1>
          <p style={{ color: "#808080", fontSize: 12 }}>
            업데이트 일자: 2023-08-11
          </p>
        </Box>
        {/* 둘 - 엑셀 관련 버튼 (파일 업로드, 양식 다운로드) */}
        <Box className="contents2">
          <label for="excel-upload">
            <div className="file-upload">파일 업로드하기</div>
          </label>
          <input
            style={{ display: "none" }}
            id="excel-upload"
            type="file"
            accept=".xlsx"
            onChange={handleExcelUpload}
          />

          <button className="button-dark" onClick={downloadExcelTemplate}>
            엑셀 양식 다운로드
          </button>
        </Box>
        {/* 셋 - 룰렛 1회 사용 금액 */}
        <Box className="contents3">
          <div style={{ textAlign: "center" }}>
            <h3>룰렛 1회 사용금액 (원) :</h3>
            <Input
              sx={{ fontSize: "2rem" }}
              type="number"
              value={oneTimeAmount}
              onChange={(e) =>
                handleInputChange("oneTimeAmount", e.target.value)
              }
            />
          </div>
        </Box>
        {/* 넷 - 룰렛 사용 버튼 (룰렛 돌리기 & 상품 내역 추가)*/}
        <Box className="contents4">
          <div style={{ display: "flex" }}>
            <button className="button-primary" onClick={handleSpin}>
              룰렛 돌리기
            </button>
            <button className="button-reset" onClick={handleExcelReset}>
              리셋
            </button>
          </div>
        </Box>
      </div>
      {/* 상품 내역 리스트 및 당첨 내역 리스트 */}
      <div className="listTableContainer">
        {/* 상품 등록 리스트 */}
        <Box className="list-table" sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
          <ListTable
            items={items}
            probabilities={probabilities}
            handleInputChange={handleInputChange}
          />
        </Box>
        {/* 당첨 내역 리스트 */}
        <Box
          className="list-table"
          sx={{ maxHeight: 250, border: "1px solid #e0e0e0" }}
        >
          <WinningHistoryTable winningHistory={winningHistory} />
        </Box>
      </div>
      {/* 결과 및 확률 데이터 */}
      <div className="tabContainer">
        <div style={{ display: "flex" }}>
          <button className="tab-button" onClick={() => setActiveTab("tab1")}>
            총 룰렛 횟수 및 상품 당첨 내역
          </button>
          <button className="tab-button" onClick={() => setActiveTab("tab2")}>
            선택한 상품 데이터의 확률
          </button>
          <button className="tab-button" onClick={() => setActiveTab("tab3")}>
            CoreView
          </button>
        </div>
        {/* 총 룰렛 사용 횟수 및 상품 당첨 내역 표시 */}
        <TabContent isActive={activeTab === "tab1"}>
          <div style={{ padding: 20 }}>
            <div>
              <div>
                <span className="textmain">당첨 내역 리스트</span>
              </div>
              <ul>
                {Object.entries(getItemFrequency(winningHistory)).map(
                  ([item, count]) => (
                    <li key={item} className="textsub">
                      {item} - {count}번 당첨
                    </li>
                  )
                )}
              </ul>
            </div>

            <Divider sx={{ my: 1.5 }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* 누적 룰렛 횟수  */}
              <div>
                <span className="textmain">누적 룰렛 횟수:</span>
                <span className="textsub">{totalSpins}회</span>
              </div>
              {/* 룰렛 사용 누적 금액  */}
              <div>
                <span className="textmain">룰렛 사용 누적 금액:</span>
                <span className="textsub">{cumulativeAmount} 원</span>
              </div>
            </div>
          </div>
        </TabContent>
        {/* 선택한 상품 데이터 확률 */}
        <TabContent isActive={activeTab === "tab2"}>
          <div style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="textmain">원하는 상품 선택</span>
              <select
                label="상품을 선택하세요"
                style={{
                  border: "1px solid #e0e0e0",
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
            </div>
            <Divider sx={{ my: 1.5 }} />

            <div>
              <span className="textmain">상품명:</span>
              <span className="textsub">
                {selectedTargetItem !== null ? selectedTargetItem : "-"}
              </span>
            </div>
            <div>
              <span className="textmain">상품 당첨 횟수:</span>
              <span className="textsub">
                {getItemFrequencyForSelectedTargetItem() > 0
                  ? getItemFrequencyForSelectedTargetItem()
                  : "-"}
              </span>
            </div>
            <div>
              <span className="textmain">상품 총 횟수:</span>
              <span className="textsub">
                {totalSpins > 0 ? totalSpins : "-"}
              </span>
            </div>
            <div>
              <span className="textmain">상품 확률(%):</span>
              <span className="textsub">
                {getItemFrequencyForSelectedTargetItem() > 0
                  ? (
                      (getItemFrequencyForSelectedTargetItem() / totalSpins) *
                      100
                    ).toFixed(2)
                  : "-"}
              </span>
            </div>
          </div>
        </TabContent>
        {/* coreview */}
        <TabContent isActive={activeTab === "tab3"}>
          {/* Content for tab3 */}
          {activeTab === "tab3" && <div style={{ padding: "20px" }}></div>}
        </TabContent>

        <div
          style={{
            marginTop: "65px",
            padding: "20px 0",
            pb: 0,
            position: "fiexd",
            bottom: 0,
            backgroundColor: "#787878",
          }}
        >
          <p style={{ fontSize: "10px", color: "#fff", textAlign: "center" }}>
            1000jinah@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roulette;
// 엑셀 양식 다운 받기
// 타켓팅 - 10, 30, 50,100회에 몇 번 - result 보여주기(오차 O)
// 엑셀 csv - 업로드 하면 적용 - 알맞게 템플릿 변경 될 예정.
// copyright, 오차존재 多, 문의 사항은 이메일로
