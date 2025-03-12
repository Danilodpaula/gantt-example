import { styled } from "styled-components";

interface HorizontalLineProps {
  top: number;
  lineWidth: number;
}

export const HorizontalLine = styled.div<HorizontalLineProps>`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  width: ${({ lineWidth }) => `${lineWidth}px`};
  border-bottom: 1px solid #B3E1FF;
  z-index: 9;
`;
