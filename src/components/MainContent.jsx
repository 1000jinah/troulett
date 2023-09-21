import React from "react";
import { Button, Box, Typography } from "@mui/material";
import DefaultBox from "./DefaultBox";

const MainContent = ({ mainWidth }) => {
  return (
    <Box sx={{ width: mainWidth }}>
      <Box sx={{ p: 6 }}>
        {/* Questionnaire +  Button 2 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button sx={{ color: "#ff754b", textTransform: "capitalize" }}>
            Questionnaire
          </Button>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              sx={{
                padding: "4px 13px",
                color: "#211d1d",
                backgroundColor: "#f3f3f3",
                textTransform: "capitalize",
                ":hover": {
                  color: "#211d1d",
                  backgroundColor: "#f3f3f3",
                },
                mr: 2,
              }}
            >
              Share Plan
            </Button>
            <Button
              sx={{
                padding: "4px 13px",
                color: "#ffffff",
                backgroundColor: "#ff754b",
                textTransform: "capitalize",
                ":hover": {
                  color: "#ffffff",
                  backgroundColor: "#ff754b",
                },
              }}
            >
              Save Plan
            </Button>
          </Box>
        </Box>
        {/* Title */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mr: 3 }}>
            Set Your Portfolio
          </Typography>
          <Box
            sx={{
              backgroundColor: "#dff7f1",
              display: "flex",
              height: "auto",
              p: 0.78,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mr: 0.78,
                borderRadius: "50%",
                backgroundColor: "#10b388",
                width: 12,
                height: 12,
              }}
            ></Box>
            <Typography
              sx={{ color: "#10b388", fontWeight: "bold", fontSize: 14 }}
            >
              On Track
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", mb: 3 }}>
          <Box
            sx={{
              border: "1px solid #ccc",
              py: 1,
              px: 2,
              mr: 2,
              width: 273,
            }}
          >
            <Typography sx={{ color: "#b3b3b3", fontSize: 14, mb: 0.5 }}>
              Your Risk Score
            </Typography>
            <Box>
              <Typography
                variant="span"
                sx={{
                  color: "#211d1d",
                  fontSize: 21,
                  mr: 1,
                  fontWeight: "bold",
                }}
              >
                3
              </Typography>
              <Typography
                variant="span"
                sx={{ color: "#b3b3b3", fontSize: 14 }}
              >
                / 5
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #ccc",
              py: 1,
              px: 2,
              mr: 2,
              width: 273,
            }}
          >
            <Typography sx={{ color: "#b3b3b3", fontSize: 14, mb: 0.5 }}>
              Goal Risk Score
            </Typography>
            <Box>
              <Typography
                variant="span"
                sx={{
                  color: "#211d1d",
                  fontSize: 21,
                  mr: 1,
                  fontWeight: "bold",
                }}
              >
                4
              </Typography>
              <Typography
                variant="span"
                sx={{ color: "#b3b3b3", fontSize: 14 }}
              >
                / 5
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #ccc",
              py: 1,
              px: 2,
              mr: 2,
              width: 273,
            }}
          >
            <Typography sx={{ color: "#b3b3b3", fontSize: 14, mb: 0.5 }}>
              Required Return
            </Typography>
            <Box>
              <Typography
                variant="span"
                sx={{
                  color: "#211d1d",
                  fontSize: 21,
                  mr: 1,
                  fontWeight: "bold",
                }}
              >
                7.2%
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #ccc",
              py: 1,
              px: 2,
              mr: 2,
              width: 273,
            }}
          >
            <Typography sx={{ color: "#b3b3b3", fontSize: 14, mb: 0.5 }}>
              Expected Return
            </Typography>
            <Box>
              <Typography
                variant="span"
                sx={{
                  color: "#211d1d",
                  fontSize: 21,
                  mr: 1,
                  fontWeight: "bold",
                }}
              >
                9.8%
              </Typography>
              <DefaultBox>asd         <Typography sx={{ color: "#fafafa" }}>
                룰렛 1회 사용금액 (원) :
              </Typography>asd</DefaultBox>
            </Box>
          </Box>
        
        </Box>
      </Box>
    </Box>
  );
};
export default MainContent;
