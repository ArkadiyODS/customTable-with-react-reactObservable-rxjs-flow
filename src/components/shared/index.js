import styled from "styled-components";
import { PALETTE } from "@zendeskgarden/react-theming";

export const PRIMARY_COLOR = PALETTE.grey[500];
export const ACTION_COLOR = PALETTE.product["chat"];
export const LIGHT_GREY_COLOR = PALETTE.grey[200];
export const SECONDARY_COLOR = PALETTE.grey[500];
export const ERROR_COLOR = PALETTE.red[500];
export const BORDER_COLOR = SECONDARY_COLOR;
export const HEADER_BACKGROUND_COLOR = PALETTE.blue[400];
export const ODD_ROW_BACKGROUND = PALETTE.blue[100];

export const CellContainer = styled.div`
  ${(props) =>
    props.$width
      ? `width: ${props.$width}px;
      min-width: ${props.$width}px;`
      : `flex:1;`}
  ${(props) => props.$order && `order: ${props.$order}`};
  ${(props) =>
    props.$borderColor &&
    `&:not(:last-child){ 
    border-right: 1px solid ${props.$borderColor}}`};
  padding: 10px;
  overflow: hidden;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NoDataContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: ${(props) => props.$color};
  border: 1px solid ${BORDER_COLOR};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  ${(props) =>
    props.$backgroundColor && `background-color: ${props.$backgroundColor}`}
`;

export const GridContainer = styled.div`
  border: 1px solid ${BORDER_COLOR};
`;

export const LoaderContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: ${(props) => props.$color};
`;

export const HeaderContainer = styled.div`
  display: flex;
  background-color: ${HEADER_BACKGROUND_COLOR};
  overflow: scroll;
`;

export const SortingIcon = styled.div`
  width: 8px;
  ${(props) => {
    const color = props.$active || props.$defaultColor;
    if (props.order === "desc") {
      return ` border-top: 6px solid ${color}`;
    }
    return ` border-bottom: 7px solid ${color}`;
  }};
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  cursor: pointer;
  margin: 3px 0;
`;

export const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  color: ${(props) => props.color || "inherit"};
`;
