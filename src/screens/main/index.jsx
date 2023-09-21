import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "components/Head";
import MainContent from "components/MainContent";


const Main = () => {
  const [showSidebar, setShowSidebar] = useState(true);


  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Box sx={{ height: "100vh", overflow: "clip" }}>
      <Header toggleSideBar={toggleSideBar} onClick={toggleSideBar} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "clip",
        }}
      >
        {showSidebar && (
          <Box
            sx={{
              //   sideBarWidth={showSidebar ? "20%" : 350}
              // minSideBarWidth={showSidebar ? 350 : 350}
              width: showSidebar ? "20%" : 350,
              minWidth: showSidebar ? 350 : 350,
              height: "100%",
              backgroundColor: "#f7f7f7",
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",

                flexDirection: "column",
                // justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  borderBottom: "1px solid #e8e8e8",
                  fontWeight: "bold",
                  fontSize: 16,
                  m: 0,
                  pl: 3,
                  lineHeight: 3.6,
                  boxSizing: "border-box",
                  height: 56,
                }}
              >
                Goal Detail
              </Typography>
              <Box
                sx={{
                  px: 3,
                  height: "100%",

                  display: "flex",

                  flexDirection: "column",
                }}
              >
             
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    borderRadius: 0,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    fontSize: 16,
                    minWidth: "100%",
                  }}
                >
                  Calculate
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        <MainContent
          mainWidth={showSidebar ? "80%" : "100%"}
        
        ></MainContent>
      </Box>
    </Box>
  );
};

export default Main;
