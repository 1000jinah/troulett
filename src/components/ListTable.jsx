import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Input,
} from "@mui/material";
const ListTable = ({ items, probabilities, handleInputChange }) => {
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
              <TableCell sx={{ fontWeight: "bold" }}>순번</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>룰렛 내역</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>확률</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={
                    index === items.length - 1 ? { borderBottom: "none" } : null
                  }
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={
                    index === items.length - 1 ? { borderBottom: "none" } : null
                  }
                >
                  <Input
                    sx={{ fontSize: 14 }}
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleInputChange("items", e.target.value, index)
                    }
                  />
                </TableCell>
                <TableCell
                  sx={
                    index === items.length - 1 ? { borderBottom: "none" } : null
                  }
                >
                  <Input
                    sx={{ fontSize: 14, width: "50px" }}
                    type="number"
                    value={probabilities[index]}
                    onChange={(e) =>
                      handleInputChange("probabilities", e.target.value, index)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ListTable;
