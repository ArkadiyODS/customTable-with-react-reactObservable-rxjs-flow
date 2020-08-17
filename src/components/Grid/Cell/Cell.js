//@flow
import React from "react";
import type { ColumnMeta } from "../metaTypes";
import { CellContainer } from "../../shared";
import { get } from "lodash";

type CellProps = ColumnMeta & {
  data: any,
};

export default React.memo<CellProps>((props: CellProps) => {
  const { data, dataPath, renderer } = props;
  const content = get(data, dataPath);
  return (
    <CellContainer $order={props.order} $width={props.width}>
      {renderer ? renderer(props, data) : <div>{content}</div>}
    </CellContainer>
  );
});
