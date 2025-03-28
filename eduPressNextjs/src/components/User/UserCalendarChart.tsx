"use client";

import { useMemo, useEffect, useRef } from "react";

interface CommitData {
  date: string;
  count: number;
}

interface CalendarContributionChartProps {
  data: CommitData[];
  startDate?: Date;
  endDate?: Date;
}

const COLORS_BY_COUNT: Record<string, string> = {
  "0": "#ebedf0",
  "1-2": "#9be9a8",
  "3-5": "#40c463",
  "6-9": "#30a14e",
  "10+": "#216e39",
} as const;

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;
const DAYS_IN_YEAR = 364;


const getColor = (count: number): string => {
  if (count === 0) return COLORS_BY_COUNT["0"];
  if (count < 3) return COLORS_BY_COUNT["1-2"];
  if (count < 6) return COLORS_BY_COUNT["3-5"];
  if (count < 10) return COLORS_BY_COUNT["6-9"];
  return COLORS_BY_COUNT["10+"];
};


const getMonthRange = (start: Date, end: Date): Array<{ year: number; month: number }> => {
  const range: Array<{ year: number; month: number }> = [];
  const current = new Date(start.getFullYear(), start.getMonth(), 1);
  while (current <= end) {
    range.push({ year: current.getFullYear(), month: current.getMonth() });
    current.setMonth(current.getMonth() + 1);
  }
  return range;
};

const getDaysInMonth = (year: number, month: number, start: Date, end: Date): Date[] => {
    const days: Date[] = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const from = firstDay < start ? start : firstDay;
    const to = lastDay > end ? end : lastDay;
    let temp = new Date(from);

    while (temp.getTime() <= to.getTime()) {
        days.push(new Date(temp));
        temp = new Date(temp);
        temp.setDate(temp.getDate() + 1);
    }

    const lastDayInRange = days[days.length - 1];
    if (lastDayInRange.toISOString().slice(0, 10) !== to.toISOString().slice(0, 10)) {
        days.push(new Date(to));
    }
    return days;
};


const groupByWeeks = (days: Date[]): (Date | null)[][] => {
    if (!days.length) return [];
    const weeks: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    const firstDayOfWeek = days[0].getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
        week.push(null);
    }

    for (const day of days) {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        while (week.length < 7) {
            week.push(null);
        }
        weeks.push(week);
    }
    return weeks;
};

const getDefaultEnd = (): Date => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
};

const getDefaultStart = (data: CommitData[], endDate: Date): Date => {
  if (!data.length) {
    return new Date(endDate.getTime() - DAYS_IN_YEAR * 24 * 60 * 60 * 1000);
  }
  const earliestDate = data.reduce((min, item) => {
    const itemDate = new Date(item.date);
    return itemDate < min ? itemDate : min;
  }, new Date(data[0].date));
  return new Date(earliestDate.getTime() - DAYS_IN_YEAR * 24 * 60 * 60 * 1000);
};

export const CalendarContributionChart: React.FC<CalendarContributionChartProps> = ({
  data,
  startDate,
  endDate,
}) => {

  const commitMap = useMemo(() => {
    return Object.fromEntries(data.map((item) => [item.date, item.count || 0]));
  }, [data]);

  const totalCommits = useMemo(() => data.reduce((acc, item) => acc + (item.count || 0), 0), [data]);

  const defaultEnd = useMemo(() => endDate || getDefaultEnd(), [endDate]);
  const defaultStart = useMemo(() => startDate || getDefaultStart(data, defaultEnd), [data, startDate, defaultEnd]);

  const monthRange = useMemo(() => getMonthRange(defaultStart, defaultEnd), [defaultStart, defaultEnd]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
    }
  }, [monthRange, totalCommits]);

 if(data.length === 0) {
  return (
    <div className="w-full">
      <div className="mb-3 text-sm font-semibold text-gray-800">
        No submissions
      </div>
    </div>
  );
}

  return (
    <div className="w-full">
      <div className="mb-3 text-sm font-semibold text-gray-800">
        {totalCommits} submissions in {defaultStart.getFullYear()}–{defaultEnd.getFullYear()}
      </div>
      <div className="relative flex">
        <div className="sticky left-0 z-10 gap-2 flex flex-col bg-white">
          {DAY_LABELS.map((label, idx) => (
            <div
              key={idx}
              className="flex h-3 items-center justify-end pr-1 text-sm text-gray-600"
            >
              {label}
            </div>
          ))}
        </div>
        <div ref={containerRef} className="overflow-x-auto overflow-y-hidden pl-2">
          <div className="min-w-max">
            <div className="flex space-x-4">
              {monthRange.map(({ year, month }) => {
                const daysInMonth = getDaysInMonth(year, month, defaultStart, defaultEnd);
                if (!daysInMonth.length) return null;
                const weeks = groupByWeeks(daysInMonth);
                const monthName = new Date(year, month, 1).toLocaleString("en-US", {
                  month: "short",
                });

                return (
                  <div key={`${year}-${month}`} className="flex flex-col items-center">
                    <div className="flex space-x-1">
                      {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col space-y-1">
                          {week.map((day, dayIndex) => {
                            if (!day) {
                              return <div key={dayIndex} className="h-3 w-3 bg-transparent" />;
                            }
                            const dateStr = day.toISOString().slice(0, 10);
                            const count = commitMap[dateStr] || 0;
                            return (
                              <div
                                key={dayIndex}
                                className="h-3 w-3 rounded-sm transition-transform duration-200 hover:scale-105"
                                style={{ backgroundColor: getColor(count) }}
                                title={`${dateStr}: ${count} submissions`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <div className="mt-1 text-center text-sm text-gray-600">{monthName}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
