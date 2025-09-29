import { useEffect } from "react";
import { useColorMode } from "../../components/ui/color-mode";
export default function MapPopupStyles() {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === "light") {
      root.style.setProperty("--popup-bg", "#bfc6e6ff");
      root.style.setProperty("--popup-color", "#1c1c1c");
    } else {
      root.style.setProperty("--popup-bg", "#163c50");
      root.style.setProperty("--popup-color", "#f7fafc");
    }
  }, [colorMode]);

  return null;
}
