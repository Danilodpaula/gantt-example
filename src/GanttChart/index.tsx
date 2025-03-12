import React, { useEffect, useMemo, useRef, useState } from "react";

import TaskTable from "./components/TasksTable";
import TimeHeader from "./components/TimeHeader";
import TaskLines from "./components/TaskLines";
import Tasks from "./components/Tasks";

import {
  GanttContainer,
  GanttChartArea,
  GanttTasksContainer,
  SpinnerContainer,
  Spinner,
} from "./styles";

import { GanttChartProps, OffsetMap, Task } from "./models/types";
import { totalMinutesInDaysGap } from "./utils/utils";

const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  dateStart,
  dateEnd,
  dateChange,
  loading,
}) => {
  // Refs para manipulação do DOM
  const ganttTasksContainerRef = useRef<HTMLDivElement>(null);
  const tableBodyContainerRef = useRef<HTMLTableSectionElement | null>(null);
  const tableHeaderContainerRef = useRef<HTMLTableSectionElement | null>(null);
  const tableRowContainerRef = useRef<HTMLTableRowElement | null>(null);
  const timeHeaderRef = useRef<HTMLDivElement>(null);

  // Estados principais
  const [maxContentWidth, setMaxContentWidth] = useState(0);
  const [tableContentHeight, setTableContentHeight] = useState(0);
  const [tableHeaderHeight, setTableHeaderHeight] = useState(0);
  const [tableRowHeight, setTableRowHeight] = useState(0);
  const [typeVerticalOffsets, setTypeVerticalOffsets] = useState<OffsetMap>({});
  const [horizontalLineOffsets, setHorizontalLineOffsets] = useState<OffsetMap>(
    {}
  );
  const [timeHeaderWidth, setTimeHeaderWidth] = useState(0);
  const [timeHeaderHeight, setTimeHeaderHeight] = useState(0);

  // Datas como objetos Date
  const startOfDay = useMemo(() => new Date(dateStart), [dateStart]);
  const endOfDay = useMemo(() => new Date(dateEnd), [dateEnd]);

  // Agrupamento de tarefas por tipo
  const tasksByType = useMemo(() => {
    return tasks.reduce((acc: Record<number, Task[]>, task: Task) => {
      if (!acc[task.type]) acc[task.type] = [];
      acc[task.type].push(task);
      return acc;
    }, {});
  }, [tasks]);

  const taskTypesCount = Object.keys(tasksByType).length;

  /**
   * Atualiza offsets verticais e horizontais quando necessário
   */
  useEffect(() => {
    if (tableContentHeight > 0 && taskTypesCount > 0) {
      const offsetStep = (tableContentHeight - 1) / taskTypesCount;

      const updatedHorizontalOffsets: OffsetMap = {};
      const updatedVerticalOffsets: OffsetMap = {};

      Object.keys(tasksByType).forEach((key, index) => {
        updatedHorizontalOffsets[`hline-${index}`] = index * offsetStep;
        updatedVerticalOffsets[key] = index * offsetStep;
      });

      setHorizontalLineOffsets(updatedHorizontalOffsets);
      setTypeVerticalOffsets(updatedVerticalOffsets);
    }
  }, [tasksByType, tableContentHeight]);

  /**
   * Atualiza a largura máxima e altura da tabela do gráfico
   */
  useEffect(() => {
    if (!tableBodyContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        setTableContentHeight(height);

        const totalMinutes = totalMinutesInDaysGap(startOfDay, endOfDay);
        const pixelsPerMinute = 10;
        setMaxContentWidth(totalMinutes * pixelsPerMinute);
      }
    });

    observer.observe(tableBodyContainerRef.current);

    return () => observer.disconnect();
  }, [startOfDay, endOfDay]);

  useEffect(() => {
    if (!tableHeaderContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        setTableHeaderHeight(height);
      }
    });

    observer.observe(tableHeaderContainerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!tableRowContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        setTableRowHeight(height);
      }
    });

    observer.observe(tableRowContainerRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToTask = (taskId: string) => {
    const element = document.querySelector(`#task-${taskId}`) as HTMLElement;

    if (element && ganttTasksContainerRef.current) {
      ganttTasksContainerRef.current.scrollTo({
        left: element.offsetLeft - 50,
        behavior: "smooth",
      });

      console.log(`Scrolled to task: ${taskId}`);
    } else {
      console.warn(`Elemento task-${taskId} não encontrado!`);
    }
  };

  useEffect(() => {
    if (!timeHeaderRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        setTimeHeaderWidth(width);
        setTimeHeaderHeight(height);
      }
    });

    observer.observe(timeHeaderRef.current);

    return () => observer.disconnect();
  }, []);

  // Se estiver carregando, renderiza o spinner
  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <>
      <GanttContainer>
        {/* Área do gráfico Gantt */}
        <GanttChartArea
          maxcontentwidth={maxContentWidth}
          ref={ganttTasksContainerRef}
        >
          {/* Tabela lateral com as informações dos eventos */}
          <TaskTable
            tasksByType={tasksByType}
            tableBodyContainerRef={tableBodyContainerRef}
            tableHeaderContainerRef={tableHeaderContainerRef}
            tableRowContainerRef={tableRowContainerRef}
            onScrollToTask={scrollToTask}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexDirection: "column",
            }}
          >
            {/* Cabeçalho com marcações de tempo e linhas verticais */}
            <TimeHeader
              startOfDay={startOfDay}
              endOfDay={endOfDay}
              containerHeight={tableContentHeight}
              ref={timeHeaderRef}
              timeHeaderHeight={timeHeaderHeight}
              tableHeaderHeight={tableHeaderHeight}
            />

            {/* Container das tarefas */}
            <GanttTasksContainer
              height={tableContentHeight}
              width={maxContentWidth}
            >
              {/* Linhas horizontais */}
              <TaskLines
                tasksByType={tasksByType}
                horizontalLineOffsets={horizontalLineOffsets}
                lineWidth={timeHeaderWidth}
              />

              {/* Renderização das tasks */}
              <Tasks
                tasksByType={tasksByType}
                typeVerticalOffsets={typeVerticalOffsets}
                startOfDay={startOfDay}
                endOfDay={endOfDay}
                containerWidth={timeHeaderWidth}
                rowHeight={tableRowHeight}
                // Aqui controla se os eventos vão ficar no alinhados no meio no fim ou no topo
                verticalAlign="center"
              />
            </GanttTasksContainer>
          </div>
        </GanttChartArea>
      </GanttContainer>
    </>
  );
};

export default GanttChart;
