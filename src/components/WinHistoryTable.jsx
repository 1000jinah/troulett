import React from "react";
import { Box } from "@mui/material";

const WinningHistoryTable = ({ winningHistory }) => {
  return (
    <Box>
      <div style={{ width: "100%", backgroundColor: "#bebebe" }}>
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
              fontWeight: "bold",
              color: "#fafafa",
              p: 1.5,
              fontSize: 12,
            }}
          >
            별
          </Box>
          <Box
            sx={{
              width: "60%",
              textAlign: "center",
              fontWeight: "bold",
              color: "#fafafa",
              p: 1.5,
              fontSize: 12,
            }}
          >
            당첨 내역
          </Box>
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
              fontWeight: "bold",
              color: "#fafafa",
              p: 1.5,
              fontSize: 12,
            }}
          >
            확률
          </Box>
        </Box>
      </div>

      <div style={{ maxHeight: 350, overflowY: "auto", width: "100%" }}>
        {winningHistory.map((win, index) => (
          <Box key={index} sx={{ width: "100%", display: "flex" }}>
            <Box
              sx={
                index === winningHistory.length - 1 &&
                winningHistory.length !== 0
                  ? {
                      borderBottom: "none",
                      width: "20%",
                      textAlign: "center",
                      p: 2,
                      fontSize: 12,
                    }
                  : winningHistory.length !== 0
                  ? {
                      borderBottom: "1px solid #b3b3b3",
                      width: "20%",
                      textAlign: "center",
                      p: 2,
                      fontSize: 12,
                    }
                  : null
              }
            >
              {win.starCount}
            </Box>
            <Box
              sx={
                index === winningHistory.length - 1 &&
                winningHistory.length !== 0
                  ? {
                      borderBottom: "none",
                      width: "60%",
                      textAlign: "center",
                      p: 2,
                      fontSize: 12,
                    }
                  : winningHistory.length !== 0
                  ? {
                      borderBottom: "1px solid #b3b3b3",
                      width: "60%",
                      textAlign: "center",
                      p: 2,
                      fontSize: 12,
                    }
                  : null
              }
            >
              {win.item}
            </Box>
            <Box
              sx={
                index === winningHistory.length - 1 &&
                winningHistory.length !== 0
                  ? {
                      borderBottom: "none",
                      width: "20%",
                      textAlign: "center",
                      p: 2,
                      fontSize: 12,
                    }
                  : winningHistory.length !== 0
                  ? {
                      borderBottom: "1px solid #b3b3b3",
                      width: "20%",
                      textAlign: "center",
                      p: 2,
                      fontSize: 12,
                    }
                  : null
              }
            >
              {win.probability}%
            </Box>
          </Box>
        ))}
        {/* Conditional rendering for "당첨 내역 없음" */}
        {winningHistory.length === 0 && (
          <Box>
            <Box sx={{ width: "100%", textAlign: "center", p: 2 }}>
              당첨 내역 없음
            </Box>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default WinningHistoryTable;
