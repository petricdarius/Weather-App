import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Box, Button } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Firstrow from "./components/Firstrow";

function App() {
  return (
    <>
      <Box min={"100vh"}>
        <Navbar />
        <Box mt={10}>
          <Firstrow />
        </Box>
      </Box>
    </>
  );
}

export default App;
