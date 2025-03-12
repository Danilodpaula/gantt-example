import React, { forwardRef, useEffect, useState } from "react";
import { TimeHeader, VerticalLine, HourMark } from "./styles";
import { totalMinutesInDaysGap } from "../../utils/utils";

interface TimeHeaderProps {
  startOfDay: Date;
  endOfDay: Date;
  containerHeight: number;
  timeHeaderHeight: number;
  tableHeaderHeight: number;
}

const TimeHeaderComponent = forwardRef<HTMLDivElement, TimeHeaderProps>(
  (
    {
      startOfDay,
      endOfDay,
      containerHeight,
      timeHeaderHeight,
      tableHeaderHeight,
    },
    ref
  ) => {
    const [isOverTable, setIsOverTable] = useState(false);
    const totalMinutes = totalMinutesInDaysGap(startOfDay, endOfDay);
    
    

    const timeMarks = [];

    useEffect(() => {
      // Monitora o scroll para saber se a linha vertical ainda está sobre a tabela de eventos
      const handleScroll = () => {
        const headerHeight =
          document.getElementById("event-table")?.offsetHeight || 0;
        setIsOverTable(window.scrollY > headerHeight);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    for (let i = 0; i <= totalMinutes; i += 30) {
      const currentTime = new Date(startOfDay);
      currentTime.setMinutes(currentTime.getMinutes() + i);
      const hour = currentTime.getHours().toString().padStart(2, "0");
      const minute = currentTime.getMinutes().toString().padStart(2, "0");
      const left = (i / totalMinutes) * 100;

      timeMarks.push(
        <React.Fragment key={`minute-${i}`}>
          <VerticalLine
            id={`vl`}
            isOverTable={isOverTable}
            maxcontentheight={containerHeight}
            gapHeight={timeHeaderHeight}
            style={{ left: `${left}%` }}
          />
          <HourMark left={left}>{`${hour}:${minute}`}</HourMark>
        </React.Fragment>
      );
    }

    return (
      <TimeHeader
        ref={ref}
        tableHeaderHeight={tableHeaderHeight}
        id="time-header"
      >
        {timeMarks}
      </TimeHeader>
    );
  }
);

export default TimeHeaderComponent;
