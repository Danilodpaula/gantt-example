import { styled } from "styled-components";

interface TaskDivProps {
  left: number;
  width: number;
  top: number;
  bgcolor?: string;
  bordercolor?: string;
  fixedWidth: number;
}

export const TaskDiv = styled.div<TaskDivProps>`
  position: absolute;
  z-index: 100;
  width: ${({ width, fixedWidth }) => `calc(${width}px + ${fixedWidth}px)`};
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  height: 1.75rem;

  border-radius: 4px;
  
  

  background-color: ${({ bgcolor }) => `#${bgcolor}`};
  color: ${({ bordercolor }) => `#${bordercolor}`};

  /* border-left: ${({ bordercolor }) => `2px solid #${bordercolor}`}; */

  text-align: left;
  display: flex;
  align-items: center;
  /* padding-left: 12px; */
  cursor: pointer;
  overflow: hidden;

  p {
    margin: 0.3rem;
  }

  &::before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.15rem;
    background-color: ${({ bordercolor }) => `#${bordercolor}`};
  }
`;

export const TippyEventConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TippyText = styled.span``;

export const TippyEventDuration = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
