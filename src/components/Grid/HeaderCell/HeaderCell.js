//@flow
import React, { memo, useCallback } from "react";
import type { ColumnMeta, Filter, Sorting, SortingEnum } from "../metaTypes";
import { LG } from "@zendeskgarden/react-typography";
import { Input } from "@zendeskgarden/react-forms";
import {
  ACTION_COLOR,
  PRIMARY_COLOR,
  LIGHT_GREY_COLOR,
  BORDER_COLOR,
  CellContainer,
  SortingIcon,
  HeaderTitleWrapper,
} from "../../shared";

type HeaderCellProps = ColumnMeta & {
  index: number,
  sortingValue?: SortingEnum,
  filterValue?: string,
  filterChangeHandler?: (value: Filter) => void,
  sortingChangeHandler?: (value: Sorting) => void,
  orderChangeHandler?: (
    currentCellIndex: number,
    draggedCellIndex: number
  ) => void,
};

export default memo<HeaderCellProps>((props: HeaderCellProps) => {
  const {
    index,
    title,
    dataPath,
    sortable,
    filterable,
    sortingValue,
    filterValue,
    filterChangeHandler,
    sortingChangeHandler,
    orderChangeHandler,
    width,
    order,
  } = props;

  const onFilterChange = useCallback(
    (evt) => {
      const { value } = evt.target;
      filterChangeHandler && filterChangeHandler({ [dataPath]: value });
    },
    [dataPath, filterChangeHandler]
  );

  const onSortingChange = useCallback(
    (evt) => {
      const { id } = evt.target;
      const value: SortingEnum = id === sortingValue ? "none" : id;
      const sorter = new Map<string, SortingEnum>([[dataPath, value]]);
      sortingChangeHandler && sortingChangeHandler(sorter);
    },
    [dataPath, sortingValue, sortingChangeHandler]
  );

  const onDrop = useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const draggedCellIndex = evt.dataTransfer.getData("text/plain");
      orderChangeHandler &&
        orderChangeHandler(index, Number.parseInt(draggedCellIndex));
    },
    [index, orderChangeHandler]
  );

  const onDragStart = useCallback(
    (evt) => {
      evt.dataTransfer.setData("text/plain", index);
      evt.dataTransfer.effectAllowed = "move";
    },
    [index]
  );
  const onDragOver = useCallback((evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  }, []);
  return (
    <CellContainer
      draggable="true"
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      $order={order}
      $width={width}
      $borderColor={LIGHT_GREY_COLOR}
      $filterable={filterable}
    >
      <HeaderTitleWrapper color={LIGHT_GREY_COLOR}>
        <LG>{title}</LG>
        {sortable && (
          <div>
            <SortingIcon
              id="asc"
              $active={sortingValue === "asc" && ACTION_COLOR}
              $defaultColor={LIGHT_GREY_COLOR}
              onClick={onSortingChange}
            ></SortingIcon>
            <SortingIcon
              id="desc"
              $active={sortingValue === "desc" && ACTION_COLOR}
              $defaultColor={LIGHT_GREY_COLOR}
              onClick={onSortingChange}
            ></SortingIcon>
          </div>
        )}
      </HeaderTitleWrapper>
      {filterable && (
        <Input
          placeholder="Filter"
          value={filterValue || ""}
          onChange={onFilterChange}
        />
      )}
    </CellContainer>
  );
});
