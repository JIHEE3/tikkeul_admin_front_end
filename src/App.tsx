import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple, indigo } from "@mui/material/colors";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./components/pages/signIn";
import SignUp from "./components/pages/signUp";

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: indigo,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
