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
  sortingValue?: SortingEnum,
  filterValue?: string,
  filterChangeHandler?: (value: Filter) => any,
  sortingChangeHandler?: (value: Sorting) => any,
};

export default memo<HeaderCellProps>((props: HeaderCellProps) => {
  const {
    title,
    dataPath,
    sortable,
    filterable,
    sortingValue,
    filterValue,
    filterChangeHandler,
    sortingChangeHandler,
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
  return (
    <CellContainer
      $order={order}
      $width={width}
      $borderColor={LIGHT_GREY_COLOR}
    >
      <HeaderTitleWrapper color={LIGHT_GREY_COLOR}>
        <LG>{title}</LG>
        {sortable && (
          <div>
            <SortingIcon
              id="asc"
              $active={sortingValue === "asc" && ACTION_COLOR}
              $defaultColor={LIGHT_GREY_COLOR}
              order="asc"
              onClick={onSortingChange}
            ></SortingIcon>
            <SortingIcon
              id="desc"
              $active={sortingValue === "desc" && ACTION_COLOR}
              $defaultColor={LIGHT_GREY_COLOR}
              order="desc"
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
