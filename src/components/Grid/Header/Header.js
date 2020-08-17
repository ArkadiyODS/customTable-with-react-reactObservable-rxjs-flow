//@flow
import React from "react";
import type { ColumnMeta, Filter, Sorting } from "../metaTypes";
import HeaderCell from "../HeaderCell/HeaderCell";
import Checkbox from "../../Checkbox";
import {
  LIGHT_GREY_COLOR,
  HeaderContainer,
  CheckboxContainer,
} from "../../shared";

type HeaderProps = {
  columns: Array<ColumnMeta>,
  filter: Filter,
  filterChangeHandler?: (value: Filter) => void,
  sorting: Sorting,
  sortingChangeHandler?: (value: Sorting) => void,
  allSelected: boolean,
  selectionChangeHandler?: (value: boolean) => void,
};

export default function (props: HeaderProps) {
  return (
    <HeaderContainer>
      <CheckboxContainer $borderColor={LIGHT_GREY_COLOR}>
        <Checkbox
          checked={props.allSelected}
          onChange={props.selectionChangeHandler}
        />
      </CheckboxContainer>
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
