import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Example from "screens/example";
import Main from "screens/main";
import Short from "screens/short";
// import Main from "screens/main";
import Test from "screens/test";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/example" replace />} />
          <Route path="/test" element={<Test />} />
          <Route path="/short" element={<Short />} />
          <Route path="/main" element={<Main />} />
          <Route path="/example" element={<Example />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
