//@flow
import React from "react";
import type { ColumnMeta } from "../metaTypes";
import Cell from "../Cell/Cell";
import { FixedSizeList } from "react-window";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

type BodyProps = {
  columns: Array<ColumnMeta>,
  data: Array<any>,
};

export default function (props: BodyProps) {
  return (
    <div>
      <FixedSizeList
        height={600}
        itemCount={props.data.length}
        itemSize={80}
        width="100%"
      >
        {({ index, style }) => (
          <Row style={style} columns={props.columns}>
            {props.columns
              .filter((column) => column.visible)
              .map((column, i) => (
                <Cell {...column} data={props.data[index]} key={i} />
              ))}
          </Row>
        )}
      </FixedSizeList>
    </div>
  );
}
