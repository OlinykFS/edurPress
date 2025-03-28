import { useState, useEffect, useCallback } from "react";

export type LayoutType = "grid" | "list";

export const useResponsiveLayout = (): [LayoutType, (newLayout: LayoutType) => void] => {
  const [layout, setLayout] = useState<LayoutType>("grid");

  const updateLayout = useCallback(() => {
    const width = window.innerWidth;
    if (width < 1024) {
      setLayout(width < 768 ? "grid" : "list");
    } else {
      setLayout("grid");
    }
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  return [layout, setLayout];
};
