//@flow
import React from "react";
import type { ColumnMeta, Filter, Sorting } from "../metaTypes";
import HeaderCell from "../HeaderCell/HeaderCell";
import { HeaderContainer } from "../../shared";

type HeaderProps = {
  columns: Array<ColumnMeta>,
  filter: Filter,
  sorting: Sorting,
  filterChangeHandler?: (value: Filter) => any,
  sortingChangeHandler?: (value: Sorting) => any,
};

export default function (props: HeaderProps) {
  return (
    <HeaderContainer>
      {props.columns
        .filter((column) => column.visible)
        .map((column, i) => (
          <HeaderCell
            {...column}
            filterValue={props.filter[column.dataPath]}
            filterChangeHandler={props.filterChangeHandler}
            sortingValue={props.sorting.get(column.dataPath)}
            sortingChangeHandler={props.sortingChangeHandler}
            key={column.title + 1}
          />
        ))}
    </HeaderContainer>
  );
}
