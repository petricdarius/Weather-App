import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Firstrow from "./components/Firstrow";
import { useColorMode } from "./components/ui/color-mode";
import ChartComponent from "./components/ChartComponent";
import "./assets/css/style.css";
import NavigateCities from "./components/NavigateCities";
import { useLocalCities } from "./weather/fetchLocalCities.js";

function App() {
  const { colorMode } = useColorMode();
  const localCities = useLocalCities(); // Hook-ul aici, la nivel de App

  const bgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #d6e9ff 0%, #f1f5f9 100%)"
      : "linear-gradient(135deg, #163c50ff 0%, #1c1c1c 100%)";

  return (
    <Box
      className="scrollable-element"
      bg={bgGradient}
      h={{
        base: "200vh",
        sm: "100vh",
      }}
      overflowY="auto"
    >
      <Navbar localCities={localCities} />
      <Box
        mt={{
          base: "10",
          sm: "0",
        }}
      >
        <Flex flexDir={"column"}>
          <Firstrow />
          <ChartComponent />
          <NavigateCities localCities={localCities} />
        </Flex>
      </Box>
    </Box>
  );
}

export default App;