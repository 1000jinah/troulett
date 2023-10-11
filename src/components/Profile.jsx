import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Link } from "react-router-dom";
import listData from "data/data";

const Profile = ({ onSelectExcelItem }) => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [selectedExcelItem, setSelectedExcelItem] = useState(null); // 선택된 엑셀 아이템 상태 추가
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
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
          스트리머 검색
        </Typography>
        <input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: "none",
            borderBottom: "1px solid #eee",
            width: "auto",
            minWidth: 200,
            outline: 0,
          }}
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
          listData.map((item, index) => {
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
                          color: "#3B3B3B",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#3B3B3B",
                        }}
                      >
                        {`(${item.id})`}
                      </Typography>
                    </Box>
                    <Box>
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
                    </Box>
                  </CardContent>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <Accordion
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
                  <Divider orientation="vertical" variant="middle" />
                  <Accordion
                    expanded={expandedAccordion === `excelAccordion-${index}`}
                    onChange={handleAccordionChange(`excelAccordion-${index}`)}
                    sx={{ borderRadius: 0, width: "100%", color: "#3b3b3b" }}
                  >
                    <AccordionSummary
                      sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>엑셀 다운로드</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {item.execelItems.map((excelItem, excelIndex) => (
                          <Typography
                            sx={{ color: "#3b3b3b" }}
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
    </Box>
  );
};

export default Profile;
// 매핑 - 이미지, 링크, 이름, 아이디, 라벨
// 엑셀 업로드 데이터 구별 - 1번은 1번으로 2번은 2번으로
// 엑셀 업로드 데이터 좌측 리스트에 연결 및 회전 가능, 결과 가능.
