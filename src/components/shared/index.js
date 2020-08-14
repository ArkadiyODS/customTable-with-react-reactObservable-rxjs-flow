import styled from "styled-components";

export const CellContainer = styled.div`
  ${(props) =>
    props.width
      ? `width: ${props.width}px;
      min-width: ${props.width}px;`
      : `flex:1`};
  padding: 5px;
  border: 1px solid grey;
  overflow: hidden;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
