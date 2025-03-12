import React, { RefObject } from "react";
import { Task } from "../../models/types";
import {
  ContainerInformation,
  ContainerDataInformation,
  Table,
  Th,
  Td,
  Tr,
  ButtonSelectEventLeft,
  ButtonSelectEventRight,
  RigthAngle,
  LeftAngle,
  Thead,
} from "./styles";

interface TaskTableProps {
  tasksByType: { [key: number]: Task[] };
  tableBodyContainerRef?: RefObject<HTMLTableSectionElement | null>;
  tableHeaderContainerRef?: RefObject<HTMLTableSectionElement | null>;
  tableRowContainerRef?: RefObject<HTMLTableRowElement | null>;
  onScrollToTask?: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasksByType,
  tableBodyContainerRef,
  tableHeaderContainerRef,
  tableRowContainerRef,
  onScrollToTask,
}) => {
  const handleScroll = (taskId: string) => {
    if (onScrollToTask) onScrollToTask(taskId);
  };

  return (
    <ContainerInformation>
      <ContainerDataInformation id="event-table">
        <Table>
          <Thead ref={tableHeaderContainerRef}>
            <tr>
              <Th>Sensores</Th>
              <Th>Última coleta</Th>
              <Th>Ações</Th>
            </tr>
          </Thead>
          <tbody ref={tableBodyContainerRef}>
            {Object.entries(tasksByType).map(([type, taskList], index) => (
              <Tr
                key={`row-${type}`}
                ref={index === 0 ? tableRowContainerRef : null}
              >
                <Td>
                  {" "}
                  <div className="event-name">{taskList[0]?.name}</div>
                </Td>

                <Td>dadossssss coletassss</Td>

                <Td style={{ minWidth: "64px" }}>
                  <ButtonSelectEventLeft
                    onClick={() => handleScroll(taskList[0].id)}
                  >
                    <RigthAngle />
                  </ButtonSelectEventLeft>
                  <ButtonSelectEventRight
                    onClick={() =>
                      handleScroll(taskList[taskList.length - 1].id)
                    }
                  >
                    <LeftAngle />
                  </ButtonSelectEventRight>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </ContainerDataInformation>
    </ContainerInformation>
  );
};

export default TaskTable;
