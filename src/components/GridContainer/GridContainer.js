//@flow
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Filter, Sorting } from "../Grid/metaTypes";
import {
  updateFilter,
  startLoadingGridData,
  updateSorting,
  updateGridSelection,
  updateGridColumnsOrder,
} from "../../redux/grid/actions";
import Grid from "../Grid/Grid";
import type { GridState } from "../../redux/grid";

export default function () {
  const dispatch = useDispatch();
  const { meta, data, selected, filter, sorting, loader, error } = useSelector(
    (state: { grid: GridState }): GridState => state.grid
  );

  const setSorting = useCallback((sortingString: Sorting) => {
    dispatch(updateSorting(sortingString));
  }, []);
  const setFilter = useCallback((columnFilter: Filter) => {
    dispatch(updateFilter(columnFilter));
  }, []);

  const setSelected = useCallback((selected: Array<any>) => {
    dispatch(updateGridSelection(selected));
  }, []);

  const setColumnsOrder = useCallback(
    (initialIndex: number, swipedIndex: number) => {
      if (initialIndex !== swipedIndex) {
        dispatch(updateGridColumnsOrder({ initialIndex, swipedIndex }));
      }
    },
    []
  );

  useEffect(() => {
    dispatch(startLoadingGridData());
  }, []);

  return (
    <div className="container">
      <Grid
        meta={meta}
        loader={loader}
        error={error}
        dataSource={data}
        filter={filter}
        sorting={sorting}
        onFilterChange={setFilter}
        onSortingChange={setSorting}
        selected={selected}
        onSelectionChange={setSelected}
        onOrderChange={setColumnsOrder}
      />
    </div>
  );
}
