import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Snackbar,
  Alert,
  // Chip,
  // Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import { Link } from "react-router-dom";
import listData from "data/data";
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
const Profile = ({ onSelectExcelItem }) => {
  const [shuffledListData, setShuffledListData] = useState([]);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [selectedExcelItem, setSelectedExcelItem] = useState(null); // 선택된 엑셀 아이템 상태 추가
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    setShuffledListData(shuffleArray(listData));
  }, []);
  if (!Array.isArray(listData)) {
    return null; // or render a loading state or error message
  }
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };
  const handleExcelItemClick = (excelItem, streamerName, excDownPrice) => {
    setSelectedExcelItem(excelItem);
    onSelectExcelItem(excelItem, streamerName, excDownPrice); // Update the parent component's state
    console.log(selectedExcelItem);
    if (selectedExcelItem !== null) {
      setSnackbarMessage("Excel item selected successfully!");
    } else {
      setSnackbarMessage("No data available for this Excel item.");
    }

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const noMatchingItems = listData.every((item) => {
    const isMatching =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(item.labels)
        ? item.labels.some((label) =>
            label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : item.labels?.toLowerCase()?.includes(searchTerm.toLowerCase()));
    return !isMatching;
  });

  const inputStyles = {
    border: "none",
    borderBottom: "1px solid #eee",
    outline: 0,
  };

  if (window.innerWidth <= 450) {
    inputStyles.minWidth = "none";
    inputStyles.width = "100%";
  } else {
    inputStyles.minWidth = 200;
    inputStyles.width = "auto";
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20000,
          pb: 3,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "@media (max-width: 450px)": {
            display: "block",
          },
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
          스트리머 검색
        </Typography>
        <input
          type="text"
          placeholder="관련 정보를 기입해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyles}
        />
      </Box>
      <Card
        sx={{
          backgroundColor: "#fff",

          borderRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: 0,
          border: "0px solid transparent",
          ".MuiAccordion-root:before": {
            display: "none",
          },
          ".MuiAccordion-root:last-of-type": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          ".MuiAccordion-root": {
            boxShadow: 0,
          },

          ".MuiAccordionSummary-content.Mui-expanded": {
            m: 0,
          },
          ".MuiAccordion-root.Mui-expanded": {
            m: 0,
          },
          ".MuiAccordionSummary-root.Mui-expanded": {
            minHeight: "48px",
          },
        }}
      >
        {/* 검색어 입력란 */}

        {noMatchingItems ? (
          <Box key={0}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                height: "367px",
                borderRadius: 0,
              }}
            >
              <CardMedia />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* Typography */}
                  <Typography variant="h5" component="div"></Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </Box>
                <Box></Box>
              </CardContent>
            </Box>
          </Box>
        ) : (
          shuffledListData.map((item, index) => {
            // 검색어와 일치하는지 확인하는 로직
            const isMatching =
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (Array.isArray(item.labels)
                ? item.labels.some((label) =>
                    label.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                : item.labels
                    ?.toLowerCase()
                    ?.includes(searchTerm.toLowerCase()));

            if (!isMatching) {
              return null; // 일치하지 않으면 해당 아이템을 숨김
            }
            return (
              <Box key={index}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    borderRadius: 0,
                  }}
                >
                  <CardMedia
                    sx={{ borderRadius: "50%", width: "50px", height: "50px" }}
                    component="img"
                    image={item.profileSource}
                    alt=""
                  />
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {/* Typography */}
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          "@media (max-width: 450px)": {
                            fontSize: "0.9rem",
                          },
                          color: "#3B3B3B",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          "@media (max-width: 450px)": {
                            fontSize: "0.78rem",
                          },
                          color: "#9a9a9a",
                        }}
                      >
                        {`(${item.id})`}
                      </Typography>
                    </Box>
                    {/* <Box>
                      {item.labels.map((label, labelIndex) => (
                        <Chip
                          sx={{
                            color: "#3b3b3b",
                            backgroundColor: "rgba(0, 0, 0, 0.06)",
                            // Add styles specific to chips
                            margin: "0 4px", // Adjust spacing as needed
                          }}
                          key={labelIndex}
                          label={label}
                        />
                      ))}
                      {item.language &&
                        item.language.map((lang, langIndex) => (
                          <Chip
                            sx={{
                              color: "#3b3b3b",
                              backgroundColor: "rgba(0, 0, 0, 0.06)",
                              // Add styles specific to chips
                              margin: "0 4px", // Adjust spacing as needed
                            }}
                            key={langIndex}
                            label={lang}
                          />
                        ))}
                    </Box> */}
                  </CardContent>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  {/* <Accordion
                    expanded={expandedAccordion === `urlAccordion-${index}`}
                    onChange={handleAccordionChange(`urlAccordion-${index}`)}
                    sx={{
                      borderRadius: 0,
                      width: "100%",
                      color: "#3b3b3b",
                    }}
                  >
                    <AccordionSummary
                      sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>링크</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {item.urlItems.map((urlItem, urlIndex) => (
                          <Link
                            style={{ color: "#3b3b3b", textDecoration: "none" }}
                            target="_blank"
                            key={urlIndex}
                            to={urlItem.urlLink}
                          >
                            {urlItem.name}
                          </Link>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Divider orientation="vertical" variant="middle" /> */}
                  <Accordion
                    expanded={expandedAccordion === `excelAccordion-${index}`}
                    onChange={handleAccordionChange(`excelAccordion-${index}`)}
                    sx={{ borderRadius: 0, width: "100%", color: "#3b3b3b" }}
                  >
                    <AccordionSummary
                      sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography
                        sx={{
                          "@media (max-width: 450px)": {
                            fontSize: "0.9rem",
                          },
                          color: "#3B3B3B",
                        }}
                      >
                        {item.name}의 룰렛 내역
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {item.execelItems.map((excelItem, excelIndex) => (
                          <Typography
                            sx={{
                              "@media (max-width: 450px)": {
                                fontSize: "0.78rem",
                              },
                              color: "#3b3b3b",
                            }}
                            key={excelIndex}
                            onClick={() =>
                              handleExcelItemClick(
                                excelItem,
                                item.name,
                                item.price
                              )
                            }
                          >
                            {excelItem.name}
                          </Typography>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            );
          })
        )}
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Set the duration in milliseconds (here it's 6 seconds)
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Positions the Snackbar at bottom center
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={selectedExcelItem === null ? "error" : "success"} // Change severity to 'error' for red color or 'warning' for yellow color, etc.
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
// 매핑 - 이미지, 링크, 이름, 아이디, 라벨
// 엑셀 업로드 데이터 구별 - 1번은 1번으로 2번은 2번으로
// 엑셀 업로드 데이터 좌측 리스트에 연결 및 회전 가능, 결과 가능.
