import { useColorMode } from "../../components/ui/color-mode";
export const useColours = () => {
  const { colorMode } = useColorMode();
  const bgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #d6e9ff 0%, #f1f5f9 100%)"
      : "linear-gradient(135deg, #163c50ff 0%, #1c1c1c 100%)";

  const bgGradient2 =
    colorMode === "light"
      ? "linear-gradient(135deg, #a2b0efff 0%, #d6e9ffff 100%)"
      : "linear-gradient(135deg, #1c3a50ff 0%, #163c50ff 100%)";
  return {
    bgGradient,
    bgGradient2,
  };
};
