import { styled } from "styled-components";

interface VerticalLineProps {
  maxcontentheight: number;
  gapHeight: number;
  isOverTable: boolean;
}

interface HourMarkProps {
  left: number;
}
export const VerticalLine = styled.div<VerticalLineProps>`
  height: ${({ maxcontentheight }) => `${maxcontentheight}px`};
  border-left: 1px solid #b3e1ff;
  border-left: ${(props) =>
    props.isOverTable ? "1px solid transparent" : "1px solid #B3E1FF"};
  margin-top: ${({ gapHeight }) => `${gapHeight}px`};

  &:first-child {
    height: ${({ maxcontentheight }) => `${maxcontentheight}px`};

    top: 0;
    bottom: 0;
  }
`;

export const HourMark = styled.div<HourMarkProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: ${({ left }) => `${left}%`};
  top: 0;
  padding: 0px 14px;
  color: #0099ff;

  span {
    align-self: center;
    text-align: center;
  }
`;

export const TimeHeader = styled.div<{ tableHeaderHeight: number }>`
  display: flex;
  height: ${({ tableHeaderHeight }) => `${tableHeaderHeight}px`};
  width: fit-content;
  background-color: #e8f4ff;

  position: sticky;
  top: 0;
  z-index: 100;
`;
