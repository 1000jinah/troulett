import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        position: "absolute",
        zIndex:3000,
        backgroundColor: "#fff",
        "@media (max-width: 900px)": {
          position: "static",
        },
      }}
    >
      <Box sx={{display:"flex", justifyContent:"space-between"}}>
      <Typography sx={{ fontSize: "10px", color: "#fff", textAlign: "center" }}>
        Header
      </Typography>
      <Box sx={{display:"flex"}}>
        <Link to="/nickname">Nickname</Link>
        <Link to="/roulette">Roulette</Link>
        <Link to="/short">Notice</Link>
      </Box>
      <Typography sx={{ fontSize: "10px", color: "#fff", textAlign: "center" }}>
        Header
      </Typography>
      </Box>
    </Box>
  );
};

export default Header;
