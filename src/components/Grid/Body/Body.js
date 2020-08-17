//@flow
import * as React from "react";
import type { GridMeta } from "../metaTypes";
import Cell from "../Cell/Cell";
import { FixedSizeList } from "react-window";
import {
  BORDER_COLOR,
  ODD_ROW_BACKGROUND,
  NoDataContainer,
  Row,
} from "../../shared";

type BodyProps = GridMeta & {
  data: Array<any>,
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
