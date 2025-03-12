import styled, { keyframes } from "styled-components";

interface GanttTasksContainerProps {
  height: number;
  width: number;
}

interface GanttChartAreaProps {
  maxcontentwidth: number;
}

export const GanttContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 8px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Cor do trilho da scrollbar */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #004b87; /* Cor da "pegada" da scrollbar que você segura para arrastar */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    opacity: 0.8;
    backdrop-filter: blur(5px);
  }
`;

export const GanttTasksContainer = styled.div<GanttTasksContainerProps>`
  position: relative;
  height: 100%;
  width: 100%;
  border: none;
`;

export const GanttChartArea = styled.div<GanttChartAreaProps>`
  display: flex;
  overflow-x: auto;
  overflow-y: auto;
  width: ${({ maxcontentwidth }) => `${maxcontentwidth}px`};
  background-color: #fff;

  border-radius: 24px;

  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
    border-radius: 8px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Cor do trilho da scrollbar */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #004b87; /* Cor da "pegada" da scrollbar que você segura para arrastar */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    opacity: 0.8;
    backdrop-filter: blur(5px);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #0099ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 1s linear infinite;
  justify-content: center;
  margin-left: 30px;
  display: flex;
`;
