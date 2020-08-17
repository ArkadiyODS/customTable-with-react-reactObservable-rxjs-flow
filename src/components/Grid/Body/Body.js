//@flow
import React from "react";
import { FixedSizeList } from "react-window";
import type { GridMeta } from "../metaTypes";
import Cell from "../Cell/Cell";
import Checkbox from "../../Checkbox";
import { isItemAvailableInArray } from "../../../utils";

import {
  BORDER_COLOR,
  ODD_ROW_BACKGROUND,
  NoDataContainer,
  Row,
  CheckboxContainer,
} from "../../shared";

type BodyProps = GridMeta & {
  data: Array<any>,
  selected: Array<any>,
  selectionChangeHandler?: (selectedItem: any, isSelected: boolean) => void,
};

export default function (props: BodyProps) {
  const numberOfRows =
    props.rowsNumber < props.data.length ? props.rowsNumber : props.data.length;
  const listHeight = numberOfRows * props.rowHeight;
  return (
    <div>
      {props.data.length === 0 ? (
        <NoDataContainer $color={BORDER_COLOR}>NO DATA</NoDataContainer>
      ) : (
        <FixedSizeList
          height={listHeight}
          itemCount={props.data.length}
          itemSize={props.rowHeight}
          width="100%"
        >
          {({ index, style }: { index: number, style: {} }) => (
            <Row
              style={style}
              columns={props.columns}
              $backgroundColor={index % 2 ? null : ODD_ROW_BACKGROUND}
            >
              <CheckboxContainer>
                <Checkbox
                  checked={isItemAvailableInArray(
                    props.data[index],
                    props.selected,
                    props.dataSourceIdentifier
                  )}
                  onChange={((data) => (isSelected) =>
                    props.selectionChangeHandler(data, isSelected))(
                    props.data[index]
                  )}
                />
              </CheckboxContainer>
              {props.columns
                .filter((column) => column.visible)
                .map((column, i) => (
                  <Cell {...column} data={props.data[index]} key={i} />
                ))}
            </Row>
          )}
        </FixedSizeList>
      )}
    </div>
  );
}
