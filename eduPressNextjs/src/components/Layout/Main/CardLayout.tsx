"use client";
import { useState, useEffect } from "react";
import { useResponsiveLayout, LayoutType } from "@/services/hooks/useResponsiveLayout";

type LayoutWithCardsProps<T> = {
  title?: string;
  data: T[];
  renderGridCard: (item: T) => JSX.Element;
  renderListCard: (item: T) => JSX.Element;
  showHeader?: boolean;
  layout?: LayoutType;
  toggleLayout?: (newLayout: LayoutType) => void;
  children?: React.ReactNode;
};

export default function LayoutWithCards<T>({
  title,
  data,
  renderGridCard,
  renderListCard,
  showHeader = true,
  layout: externalLayout,
  toggleLayout: externalToggleLayout,
  children,
}: LayoutWithCardsProps<T>) {
  const [items, setItems] = useState<T[]>(data);
  const [localLayout, localToggleLayout] = useResponsiveLayout();
  const layout = externalLayout ?? localLayout;
  const toggleLayout = externalToggleLayout ?? localToggleLayout;

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <section className="relative flex flex-col gap-8 w-full">
      {showHeader && (
        <div className="flex justify-between items-start gap-4 mb-8">
          <div className="flex gap-4">
            <div onClick={() => toggleLayout("grid")} className="cursor-pointer">
              <svg width="20" height="20" className={layout === "grid" ? "fill-orange-500" : "fill-black"}>
                <path d="M2.5 2.5V9.16667H9.16667V2.5H2.5ZM2.5 10.8333V17.5H9.16667V10.8333H2.5ZM10.8333 2.5V9.16667H17.5V2.5H10.8333ZM10.8333 10.8333V17.5H17.5V10.8333Z" />
              </svg>
            </div>
            <div onClick={() => toggleLayout("list")} className="cursor-pointer">
              <svg width="20" height="20" className={layout === "list" ? "fill-orange-500" : "fill-black"}>
                <path d="M2.5 2.5H17.5V5H2.5V2.5ZM2.5 7.5H17.5V10H2.5V7.5ZM2.5 12.5H17.5V15H2.5V12.5Z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      <main>
        <div
          className={`grid gap-6 ${
            layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {items.map((item, index) => (
            <div key={index}>
              {layout === "grid" ? renderGridCard(item) : renderListCard(item)}
            </div>
          ))}
        </div>
      </main>
      {children}
    </section>
  );
}
