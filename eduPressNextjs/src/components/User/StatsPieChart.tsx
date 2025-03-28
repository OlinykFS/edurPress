"use client";

import React, { useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ChartDataWithRender extends ChartData {
  renderValue: number;
  originalValue: number;
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: ChartDataWithRender;
  percent?: number;
}

const renderActiveShape = (props: ActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const arcAngle = endAngle - startAngle;

  const pointerExtension = outerRadius * 0;
  const additionalOffset = Math.min(
    outerRadius * 0.25,
    (arcAngle / (2 * Math.PI)) * outerRadius * 1.25
  );
  const pointerLength = outerRadius + pointerExtension + additionalOffset;

  const sx = cx + pointerLength * cos;
  const sy = cy + pointerLength * sin;
  const secondOffset = outerRadius * 0.45;
  const mx = cx + (pointerLength + secondOffset) * cos;
  const my = cy + (pointerLength + secondOffset) * sin;
  const arrowHeadLength = outerRadius * 0.275;
  const ex = mx + (cos >= 0 ? 1 : -1) * arrowHeadLength;
  const ey = my;

  const textOffset = outerRadius * 0.175;
  const textAnchor = cos >= 0 ? "start" : "end";
  
  const displayValue = payload.originalValue;
  const displayPercent = payload.originalValue === 0 ? "0" : (percent ? (percent * 100).toFixed(1) : "");

  const ringInnerRadius = outerRadius * 1.05;
  const ringOuterRadius = outerRadius * 1.1;

  return (
    <g className="active-shape">
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={ringInnerRadius}
        outerRadius={ringOuterRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <g
        className="arrow-group"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
      >
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
          strokeWidth={2}
        />
        <circle cx={ex} cy={ey} r={outerRadius * 0.0375} fill="#222" />
        <text
          x={ex + (cos >= 0 ? textOffset : -textOffset)}
          y={ey}
          textAnchor={textAnchor}
          fill="#222"
          dominantBaseline="middle"
          className="text-sm font-bold"
          style={{
            pointerEvents: "none",
            transform: `translate(${cos >= 0 ? "5px" : "-5px"}, 0)`,
          }}
        >
          {`${payload.name}: ${displayValue} (${displayPercent}%)`}
        </text>
      </g>
      <style jsx>{`
        .arrow-group {
          opacity: 0;
          transform: translateY(5px);
          animation: arrowFadeIn 0.4s ease-out forwards;
        }
        @keyframes arrowFadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </g>
  );
};

export default function SmartPieChart({ data }: { data: ChartData[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hovered, setHovered] = useState<boolean>(false);

  const handleMouseEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(-1);
    setHovered(false);
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartData: ChartDataWithRender[] =
    total === 0
      ? data.map((item) => ({
          ...item,
          renderValue: 1,
          originalValue: 0,
        }))
      : data.map((item) => ({
          ...item,
          renderValue: item.value,
          originalValue: item.value,
        }));

  const activeData =
    activeIndex >= 0 && total !== 0 ? data[activeIndex] : null;
  const computedTotal = total;

  const percentage =
    activeData && computedTotal > 0
      ? ((activeData.value / computedTotal) * 100).toFixed(1)
      : "0";

  return (
    <div className="relative w-full h-full max-w-[200px] max-h-[300px] overflow-visible">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart className="overflow-visible" onMouseLeave={handleMouseLeave}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="100%"
            paddingAngle={2}
            dataKey="renderValue"
            activeIndex={activeIndex}
            activeShape={renderActiveShape as any}
            onMouseEnter={handleMouseEnter}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-300 ${
          hovered ? "opacity-100" : "opacity-80"
        }`}
      >
        {activeData ? (
          <>
            <p className="text-sm font-extrabold text-black">{activeData.name}</p>
            <p className="text-sm text-gray-700">
              Complete: {activeData.value} ({percentage}%)
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-extrabold text-black">Total</p>
            <p className="text-sm text-gray-700">Complete: {computedTotal}</p>
          </>
        )}
      </div>
    </div>
  );
}
