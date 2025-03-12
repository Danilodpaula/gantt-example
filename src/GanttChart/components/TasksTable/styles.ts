import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { styled } from "styled-components";

export const ContainerDataInformation = styled.div``;

export const Table = styled.table`
  width: fit-content;
  height: 100%;
  border-collapse: collapse;

  display: block;
`;

export const Thead = styled.thead`
  display: block;
  height: auto;
`;

export const Tbody = styled.tbody`
  display: block;
  height: 100%;
  overflow-y: auto;
`;

// export const Th = styled.th`
//   position: sticky;
  
//   padding: 1.5rem 1.25rem;
//   border-bottom: 1px solid #b3e1ff;
//   text-align: center;

//   width: 300px;

//   color: #0099ff;
//   text-align: center;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
//   background-color: #e8f4ff;

//   position: sticky;
//   z-index: 100;
// `;

export const Th = styled.th`
  position: sticky;
  
  height: 64px;
  border-bottom: 1px solid #b3e1ff;
  text-align: center;

  width: 300px; // você pode ajustar isso pra caber o texto sem quebra!

  color: #0099ff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background-color: #e8f4ff;

  z-index: 100;

  white-space: nowrap;       // Não permite quebra de linha
  overflow: hidden;          // Esconde o que passar da largura
  text-overflow: ellipsis;   // Adiciona "..." se ultrapassar o tamanho
`;


export const Td = styled.td`
  padding: 0px 8px;
  border-bottom: 1px solid #b3e1ff;
  color: #969696;
  text-align: center;
  width: 100%;

  // a altura é definida como fixa pra não ocorrer erros nas medições do useRef usado no componente
  height: 64px;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .event-name {
    display: flex;
    text-align: center;
    text-align: center;
    justify-content: center;
    align-items: center;
    white-space: normal; // Permite quebra de linha
    word-wrap: break-word; // Quebra palavras longas
    overflow-wrap: break-word;
    min-height: 3.2em; //aproximadamente duas linhas
  }
`;

export const Tr = styled.tr``;

export const ContainerInformation = styled.div`
  position: sticky;
  height: fit-content;
  width: fit-content;
  left: 0;
  z-index: 33333333;
  background-color: #fff;
`;

export const ButtonSelectEventLeft = styled.button`
  background: transparent;
  border: 1px solid transparent;
`;
export const ButtonSelectEventRight = styled.button`
  background: transparent;
  border: 1px solid transparent;
`;

export const RigthAngle = styled(FaAngleLeft)`
  color: #ade1fe;
  padding-left: 4px;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    transform: translateY(-1.5px);
  }
`;

export const LeftAngle = styled(FaAngleRight)`
  color: #ade1fe;
  padding-left: 4px;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    transform: translateY(-1.5px);
  }
`;
