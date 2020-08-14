//@flow
import React from "react";
import type { GridMeta, Filter, Sorting } from "./metaTypes";
import { Spinner } from "@zendeskgarden/react-loaders";
import { PALETTE } from "@zendeskgarden/react-theming";
import Header from "./Header/Header";
import Body from "./Body/Body";
import styled from "styled-components";

const GridContainer = styled.div``;

const LoaderContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type GridProps = {
  meta: GridMeta,
  loader: boolean,
  dataSource: Array<{}>,
  filter: Filter,
  sorting: Map<Sorting>,
  onFilterChange?: (update: Filter) => void,
  onSortingChange?: (update: Sorting) => void,
  currentPage?: number,
  rows?: number,
};

export default function (props: GridProps) {
  return (
    <GridContainer>
      <Header
        columns={props.meta.columns}
        filter={props.filter}
        filterChangeHandler={props.onFilterChange}
        sorting={props.sorting}
        sortingChangeHandler={props.onSortingChange}
      />
      {props.loader ? (
        <LoaderContainer>
          <Spinner color={PALETTE.blue[500]} size="48px" />
        </LoaderContainer>
      ) : (
        <Body columns={props.meta.columns} data={props.dataSource} />
      )}
    </GridContainer>
  );
}
