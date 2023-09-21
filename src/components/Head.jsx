import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";


import { Menu } from "@mui/icons-material";
const Header = ({toggleSideBar}) => {
  return (
    <Box
      sx={{
        width: "100%",
        p: 2.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu sx={{ mr: 2 }} onClick={toggleSideBar}/>
        <img src={Image.Logo} alt="logo" />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{
            mr: 3,
            "& .MuiInputBase-root ": {
              borderRadius: 0,
              borderColor: "#cccccc",
            },

            "& .MuiOutlinedInput-input": {
              p: 0,
              padding: "6px 8px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#cccccc",
            },
            "& .Mui-focused ": {
              borderColor: "#cccccc",
            },
          }}
          id="input-with-icon-textfield"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
             
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Button
          sx={{
            mr: 3,
            p: "4.6px 8px",
            borderRadius: 0,
            border: "1px solid #cccccc",
            color: "#211d1d",
            textTransform: "capitalize",
          }}
        
        >
          Add New Icon
        </Button>
        <img src={Image.User} alt="user" width={35} height={35} />
      </Box>
    </Box>
  );
};

export default Header;
