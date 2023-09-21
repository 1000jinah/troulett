import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
} from "@mui/material";

const WinningHistoryTable = ({ winningHistory }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        backgroundColor: "transparent",
        border: "1px solid #fafafa",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 214,
          overflowY: "auto",
          ".MuiTableHead-root .MuiTableCell-root": {
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          },
          ".MuiTableCell-root": {
            textAlign: "center",
            color: "#3b3b3b",
          },
          "& .MuiInput-root:before": {
            borderBottom: "1px solid #fafafa",
          },
          "& .MuiInput-root:after": {
            borderBottom: "1px solid #fafafa",
          },
          ".MuiInput-root": {
            color: "#3b3b3b",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#fafafa" }}>
                별
              </TableCell>
              {/* <TableCell sx={{ fontWeight: "bold" }}>순번</TableCell> */}
              <TableCell sx={{ fontWeight: "bold", color: "#fafafa" }}>
                당첨 내역
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fafafa" }}>
                확률
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {winningHistory.map((win, index) => (
              <TableRow key={index}>
                {/* <TableCell>{win.starCount}</TableCell> */}

                <TableCell
                  sx={
                    index === winningHistory.length - 1
                      ? { borderBottom: "none" }
                      : null
                  }
                >
                  {win.starCount}
                </TableCell>
                <TableCell
                  sx={
                    index === winningHistory.length - 1
                      ? { borderBottom: "none" }
                      : null
                  }
                >
                  {win.item}
                </TableCell>
                <TableCell
                  sx={
                    index === winningHistory.length - 1
                      ? { borderBottom: "none" }
                      : null
                  }
                >
                  {win.probability}%
                </TableCell>
              </TableRow>
            ))}
            {/* Conditional rendering for "당첨 내역 없음" */}
            {winningHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={2}>당첨 내역 없음</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default WinningHistoryTable;
