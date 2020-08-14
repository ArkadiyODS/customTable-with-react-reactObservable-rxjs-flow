//@flow
import React, { memo, useCallback } from "react";
import type { ColumnMeta, Filter, Sorting, SortingEnum } from "../metaTypes";
import { LG } from "@zendeskgarden/react-typography";
import { Input } from "@zendeskgarden/react-forms";
import { PALETTE } from "@zendeskgarden/react-theming";
import { CellContainer } from "../../shared";
import styled from "styled-components";

const SortingIcon = styled.div`
  width: 8px;
  ${(props) => {
    const color = props.active || props.defaultColor || "#fff";
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

const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: ${(props) => props.color || "inherit"};
`;

type HeaderCellProps = ColumnMeta & {
  sortingValue: SortingEnum,
  filterValue: string,
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
      const value = id === sortingValue ? "none" : id;
      sortingChangeHandler && sortingChangeHandler({ [dataPath]: value });
    },
    [dataPath, sortingValue, sortingChangeHandler]
  );
  return (
    <CellContainer width={width}>
      <HeaderTitleWrapper color={PALETTE.grey["100"]}>
        <LG>{title}</LG>
        {sortable && (
          <div>
            <SortingIcon
              id="asc"
              active={sortingValue === "asc" && PALETTE.product["guide"]}
              order="asc"
              onClick={onSortingChange}
            ></SortingIcon>
            <SortingIcon
              id="desc"
              active={sortingValue === "desc" && PALETTE.product["guide"]}
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
