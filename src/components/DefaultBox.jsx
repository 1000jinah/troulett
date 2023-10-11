const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const DefaultBox = styled(Box)({
  backgroundColor: "#fff",
  color: "#3B3B3B",
  padding: 24,
  borderRadius: 3,
  display:"flex",
  flexDirection:"column",
  // justifyContent:"center",
  boxShadow:"0px 0px 30px #7176791A"
});

export default DefaultBox;
