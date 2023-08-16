import React, { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  Box,
  Typography,
  Button,
  Divider,
  Input,
  InputLabel,
  Tooltip,
  ListItemText,
  List,
} from "@mui/material";
import GiftIcon from "@mui/icons-material/CardGiftcardOutlined";
import DeleteIcon from "@mui/icons-material/DeleteSweepOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFileOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownloadOutlined";
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
const Test = () => {
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
    <Box
      sx={{
        backgroundColor: "#eee",
        p: 2,
        // pb: 6,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "@media (max-width: 900px)": {
          height: "auto",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "1200px",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          "@media (max-width: 900px)": {
            width: "100%",
            p: 3,
            mb: 6,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* 등록 & 회전 & 리셋 */}
          <Box sx={{ backgroundColor: "#fff", p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
                  룰렛 확률 계산기
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InputLabel for="excel-upload" sx={{ lineHeight: "1.55em" }}>
                  <Tooltip title="파일 업로드" arrow>
                    <Box
                      className="file-upload"
                      sx={{
                        backgroundColor: "#31e381",
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 14,
                        borderRadius: "4px",
                        width: 40,
                        height: 40,
                        mr: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        ":hover": {
                          backgroundColor: "#23dc2c",
                        },
                      }}
                    >
                      <UploadFileIcon />
                    </Box>
                  </Tooltip>
                </InputLabel>
                <Input
                  style={{
                    display: "none",
                    ".MuiInput-input": {
                      padding: "none",
                    },
                  }}
                  id="excel-upload"
                  type="file"
                  accept=".xlsx"
                  onChange={handleExcelUpload}
                />
                <Tooltip title=" 엑셀 양식 다운로드" arrow>
                  <Button
                    className="button-dark"
                    onClick={downloadExcelTemplate}
                    sx={{
                      backgroundColor: "#31e381",
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 14,
                      borderRadius: "4px",
                      minWidth: 40,
                      height: 40,
                      ":hover": {
                        backgroundColor: "#23dc2c",
                      },
                    }}
                  >
                    <FileDownloadIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
            <Box sx={{ display: "flex", pt: 3 }}>
              <Box style={{ textAlign: "center", width: "100%" }}>
                <Typography>룰렛 1회 사용금액 (원) :</Typography>
                <Input
                  sx={{ fontSize: "2rem" }}
                  type="number"
                  value={oneTimeAmount}
                  onChange={(e) =>
                    handleInputChange("oneTimeAmount", e.target.value)
                  }
                />
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", pt: 3 }}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Button
                    sx={{
                      backgroundColor: "#2fcce3",
                      width: "70%",
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#fff",
                      ":hover": {
                        backgroundColor: "#519cff",
                      },
                    }}
                    onClick={handleSpin}
                    startIcon={<GiftIcon sx={{ marginBottom: "1px" }} />}
                  >
                    룰렛 돌리기
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#f75b5b",
                      width: "30%",
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#fff",
                      ":hover": {
                        backgroundColor: "#e93131",
                      },
                    }}
                    onClick={handleExcelReset}
                    startIcon={<DeleteIcon sx={{ marginBottom: "1px" }} />}
                  >
                    리셋
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* 사용 금액 & 누적 금액 & 참여 리스트 & 당첨 리스트 */}
          <Box sx={{ backgroundColor: "#fff", p: 3 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
              등록 내역
            </Typography>
            <Box sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
              <ListTable
                items={items}
                probabilities={probabilities}
                handleInputChange={handleInputChange}
              />
            </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
              당첨 내역
            </Typography>
            <Box sx={{ maxHeight: 250, border: "1px solid #e0e0e0" }}>
              <WinningHistoryTable winningHistory={winningHistory} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            "@media (max-width: 900px)": {
              pt: 3,
            },
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Button onClick={() => setActiveTab("tab1")}>
              총 룰렛 횟수 및 상품 당첨 내역
            </Button>
            <Button onClick={() => setActiveTab("tab2")}>Roulette List View</Button>
          </Box>
          <Box
            sx={{
              backgroundColor: "#fff",
              position: "relative",
              width: 430,
      
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ffdde8",
                position: "absolute",
                right: 0,
                width: 20,
                height: "100%",
              }}
            >
              a
            </Box>

            <Box
              sx={{
                p: 3,
              }}
            >
              {/* 결과 및 확률 데이터 */}
              <Box>
                {/* 총 룰렛 사용 횟수 및 상품 당첨 내역 표시 */}
                <TabContent isActive={activeTab === "tab1"}>
                  <Box sx={{ padding: "20px" }}>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                          <GiftIcon sx={{ fontSize: 45 }} />
                          <Box>
                            <Typography sx={{ fontWeight: "bold" }}>
                              룰렛
                            </Typography>
                            <Box
                              sx={{ display: "flex", alignItems: "flex-end" }}
                            >
                              <Typography
                                sx={{ fontWeight: "bold", fontSize: 22 }}
                              >
                                당첨 내역{" "}
                              </Typography>
                              <Typography
                                sx={{ fontWeight: "bold", fontSize: 16 }}
                              >
                                리스트
                              </Typography>
                            </Box>
                          </Box>
                          <Box></Box>
                        </Box>
                        <Box>QR코드</Box>
                      </Box>

                      <List sx={{ my: 2 }}>
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
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    {/* 누적 룰렛 횟수  */}
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="span" className="textmain">
                        누적 룰렛 횟수
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{ fontWeight: "bold" }}
                        className="textsub"
                      >
                        {totalSpins}회
                      </Typography>
                    </Box>
                    {/* 룰렛 사용 누적 금액  */}
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="span" className="textmain">
                        룰렛 사용 누적 금액
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{ fontWeight: "bold" }}
                        className="textsub"
                      >
                        {cumulativeAmount}원
                      </Typography>
                    </Box>
                  </Box>
                  <Box style={{ padding: "20px" }}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box className="textmain">원하는 상품 선택</Box>
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
                          handleInputChange(
                            "selectedTargetItem",
                            e.target.value
                          )
                        }
                      >
                        {items.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Box>
                    <Divider sx={{ my: 1.5 }} />

                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
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
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
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
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
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
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
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
                              (getItemFrequencyForSelectedTargetItem() /
                                totalSpins) *
                              100
                            ).toFixed(2)
                          : "-"}
                      </Typography>
                    </Box>
                  </Box>
                </TabContent>
                {/* 선택한 상품 데이터 확률 */}
                <TabContent isActive={activeTab === "tab2"}></TabContent>
                {/* coreview */}
                <TabContent isActive={activeTab === "tab3"}>
                  {/* Content for tab3 */}
                  {activeTab === "tab3" && <Box sx={{ padding: "20px" }}></Box>}
                </TabContent>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "65px",
          padding: "20px 0",
          position: "absolute",
          bottom: 0,
          backgroundColor: "#787878",
          "@media (max-width: 900px)": {
            position: "static",
          },
        }}
      >
        <p style={{ fontSize: "10px", color: "#fff", textAlign: "center" }}>
          1000jinah@gmail.com
        </p>
      </Box>
    </Box>
  );
};

export default Test;
