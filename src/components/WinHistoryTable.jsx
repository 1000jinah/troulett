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
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 214,
          overflowY: "auto",
          ".MuiTableCell-root": {
            textAlign: "center",
          },
          ".MuiTableHead-root .MuiTableCell-root": {
            backgroundColor: "#e9e9e9",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell sx={{ fontWeight: "bold" }}>순번</TableCell> */}
              <TableCell sx={{ fontWeight: "bold" }}>당첨 내역</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>확률</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default WinningHistoryTable;
