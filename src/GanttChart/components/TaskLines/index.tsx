import React from "react";

import { OffsetMap } from "../../models/types";
import { HorizontalLine } from "./styles";

interface TaskLinesProps {
  tasksByType: { [key: number]: any };
  horizontalLineOffsets: OffsetMap;
  lineWidth: number;
}

const TaskLines: React.FC<TaskLinesProps> = ({
  tasksByType,
  horizontalLineOffsets,
  lineWidth,
}) => {
  return (
    <>
      {/* Renderiza as linhas horizontais com base na quantidade de tipos de eventos */}
      {Object.keys(tasksByType).map((_, index) => (
        <HorizontalLine
          key={`hline-${index}`}
          top={horizontalLineOffsets[`hline-${index}`] || index * 40}
          lineWidth={lineWidth}
        />
      ))}
      {/* Renderiza uma linha Horizontal no final do gráfico */}
      <HorizontalLine
        key={`hline-last`}
        top={0}
        style={{ top: "99.8%" }}
        lineWidth={lineWidth}
      />
    </>
  );
};

export default TaskLines;
