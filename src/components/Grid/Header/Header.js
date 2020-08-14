//@flow
import React, { useState, useCallback } from "react";
import type { ColumnMeta, Filter, Sorting } from "../metaTypes";
import HeaderCell from "../HeaderCell/HeaderCell";
import { PALETTE } from "@zendeskgarden/react-theming";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  background-color: ${PALETTE.azure["M400"]};
  overflow: scroll;
`;

type HeaderProps = {
  columns: Array<ColumnMeta>,
  filter: Filter,
  sorting: Map<Sorting>,
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
