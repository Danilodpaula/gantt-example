import React from "react";
import { Task } from "../../models/types";
import { Tooltip } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import {
  TippyEventConatiner,
  TippyText,
  TippyEventDuration,
  TaskDiv,
} from "./styles";
import {
  calculateLeftOffset,
  calculateWidth,
  calculateDurationText,
} from "../../utils/utils";

interface TasksProps {
  tasksByType: Record<number, Task[]>;
  typeVerticalOffsets: Record<number, number>;
  startOfDay: Date;
  endOfDay: Date;
  containerWidth: number;
  rowHeight: number;
  verticalAlign?: "top" | "center" | "bottom";
}

// Exemplo de cores fixas
const ALARM_BG = "#FFEDEB";
const ALARM_BORDER = "#B3261E";

const ALERT_BG = "#FDF6CF";
const ALERT_BORDER = "#E9BA00";

const Tasks: React.FC<TasksProps> = ({
  tasksByType,
  typeVerticalOffsets,
  startOfDay,
  endOfDay,
  containerWidth,
  rowHeight,
  verticalAlign,
}) => {
  return (
    <>
      {Object.entries(tasksByType).map(([typeStr, taskList], typeIndex) => {
        const type = Number(typeStr);

        return taskList.map((task) => {
          // Calcula offsets e largura
          const left = calculateLeftOffset(
            new Date(task.start),
            startOfDay,
            endOfDay,
            containerWidth
          );
          const width = calculateWidth(
            new Date(task.start),
            new Date(task.end),
            startOfDay,
            endOfDay,
            containerWidth
          );

          // Define top (verticalAlign)
          const taskHeight = 20; // Ex: 1.75rem ~ 20px
          let top = typeVerticalOffsets[type] || typeIndex * rowHeight;
          if (verticalAlign === "center") {
            top += (rowHeight - taskHeight) / 2;
          } else if (verticalAlign === "bottom") {
            top += rowHeight - taskHeight;
          }

          // Decide a cor de cada task
          let bgColor = "#fff";
          let borderColor = "#ccc";

          if (task.ocurrenceType === "alarm") {
            bgColor = ALARM_BG;
            borderColor = ALARM_BORDER;
          } else if (task.ocurrenceType === "alert") {
            bgColor = ALERT_BG;
            borderColor = ALERT_BORDER;
          }

          return (
            <Tooltip
              key={`task-${task.id}`}
              title={
                <TippyEventConatiner>
                  <TippyText style={{ fontWeight: "bold" }}>
                  {task.ocurrenceType === 'alarm' && 'Alarme'}
                  {task.ocurrenceType === 'alert' && 'Alerta'}
                  </TippyText>
                  <TippyEventDuration>
                    <TippyText>Período:</TippyText>
                    <TippyText>
                      {new Date(task.start).toLocaleTimeString()}
                    </TippyText>
                    <FaArrowRight />
                    <TippyText>
                      {new Date(task.end).toLocaleTimeString()}
                    </TippyText>
                  </TippyEventDuration>
                  <TippyEventDuration>
                    <TippyText>Duração:</TippyText>
                    {calculateDurationText(
                      new Date(task.start),
                      new Date(task.end)
                    )}
                  </TippyEventDuration>
                </TippyEventConatiner>
              }
              color="#004b82"
              placement="bottom"
            >
              <TaskDiv
                id={`task-${task.id}`}
                left={left}
                width={width}
                top={top}
                bgcolor={bgColor.replace("#", "")} // se TaskDiv exige sem o #, ajusta aqui
                bordercolor={borderColor.replace("#", "")}
                fixedWidth={1.5}
              >
                <p>
                {task.ocurrenceType === 'alarm' && 'Alarme'}
                {task.ocurrenceType === 'alert' && 'Alerta'}
                </p>
              </TaskDiv>
            </Tooltip>
          );
        });
      })}
    </>
  );
};

export default Tasks;
