//@flow
import * as React from "react";
import type { GridMeta, Filter, Sorting } from "./metaTypes";
import { Spinner } from "@zendeskgarden/react-loaders";
import Header from "./Header/Header";
import Body from "./Body/Body";
import {
  ACTION_COLOR,
  ERROR_COLOR,
  GridContainer,
  LoaderContainer,
  ErrorContainer,
} from "../shared";

type GridProps = {
  meta: GridMeta,
  loader: boolean,
  error: string,
  dataSource: Array<any>,
  filter: Filter,
  sorting: Sorting,
  onFilterChange?: (update: Filter) => void,
  onSortingChange?: (update: Sorting) => void,
  currentPage?: number,
  rows?: number,
};

//TODO (Grid Meta change - resize, order, horizontal scrolling)
//TODO (Grid selection)

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
      {props.loader && (
        <LoaderContainer>
          <Spinner color={ACTION_COLOR} duration={625} size="48px" />
        </LoaderContainer>
      )}
      {!props.loader &&
        (props.error !== "" ? (
          <ErrorContainer $color={ERROR_COLOR}>
            {props.error.toLocaleUpperCase()}
          </ErrorContainer>
        ) : (
          <Body {...{ ...props.meta, data: props.dataSource }} />
        ))}
    </GridContainer>
  );
}
