import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Box, Button } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Firstrow from "./components/Firstrow";
import { useColorMode } from "./components/ui/color-mode";

function App() {
  const { colorMode } = useColorMode(); 

  const bgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #163c50ff 0%, #1c1c1c 100%)";

  return (
    <Box bg={bgGradient} minH="100vh">
      <Navbar />
      <Box mt={10}>
        <Firstrow />
      </Box>
    </Box>
  );
}

export default App;
