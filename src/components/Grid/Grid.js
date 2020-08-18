//@flow
import React, { useCallback, useState, useEffect } from "react";
import type { GridMeta, Filter, Sorting } from "./metaTypes";

import { Button } from "@zendeskgarden/react-buttons";
import { Spinner } from "@zendeskgarden/react-loaders";
import Header from "./Header/Header";
import Body from "./Body/Body";

import { itemСomparator } from "../../utils";
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
  onFilterChange?: (update: Filter) => void,
  sorting: Sorting,
  onSortingChange?: (update: Sorting) => void,
  selected: Array<any>,
  onSelectionChange?: (selected: Array<any>) => void,
};

//TODO (Grid Meta change - resize, order, horizontal scrolling)

export default function (props: GridProps) {
  const { dataSource, selected, onSelectionChange, meta } = props;
  const itemIdentifier = meta.dataSourceIdentifier;

  const [isShowSelected, setShowSelected] = useState(false);

  const [data, setData] = useState(dataSource);

  const handleShowData = useCallback(
    (evt: SyntheticEvent<HTMLButtonElement>) => {
      const id: string = evt.target.id;
      if (id === "showSelected") {
        setShowSelected(true);
      } else {
        setShowSelected(false);
      }
    },
    [dataSource, selected]
  );

  const allSelected =
    dataSource.length !== 0 && selected.length === dataSource.length;

  const selectAll = useCallback(
    (isAllSelected: boolean) => {
      if (isAllSelected) {
        onSelectionChange && onSelectionChange(dataSource);
      } else {
        onSelectionChange && onSelectionChange([]);
      }
      setShowSelected(false);
    },
    [dataSource, onSelectionChange]
  );
  const selectSingle = useCallback(
    (selectedItem: any, isSelected: boolean) => {
      let newSelected: Array<any>;
      if (isSelected) {
        newSelected = selected.concat(selectedItem);
      } else {
        newSelected = selected.filter(
          (existingItem) =>
            !itemСomparator(existingItem, selectedItem, itemIdentifier)
        );
      }
      onSelectionChange && onSelectionChange(newSelected);
    },
    [selected, onSelectionChange, itemIdentifier]
  );

  useEffect(() => {
    if (!isShowSelected || selected.length === 0) {
      setData(dataSource);
    } else {
      setData(selected);
    }
  }, [dataSource, selected, isShowSelected]);

  return (
    <>
      <GridContainer>
        <Header
          columns={props.meta.columns}
          filter={props.filter}
          filterChangeHandler={props.onFilterChange}
          sorting={props.sorting}
          sortingChangeHandler={props.onSortingChange}
          allSelected={allSelected}
          selectionChangeHandler={selectAll}
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
            <Body
              {...{
                ...props.meta,
                data,
                selected,
                selectionChangeHandler: selectSingle,
              }}
            />
          ))}
      </GridContainer>
      {!!selected.length && isShowSelected && (
        <Button id="showAll" onClick={handleShowData}>
          Show All {dataSource.length}
        </Button>
      )}
      {!!selected.length && !isShowSelected && (
        <Button id="showSelected" onClick={handleShowData}>
          Show Selected {selected.length}
        </Button>
      )}
    </>
  );
}
