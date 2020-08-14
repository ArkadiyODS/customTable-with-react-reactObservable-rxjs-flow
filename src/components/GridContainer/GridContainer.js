//@flow
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Filter, Sorting } from "../Grid/metaTypes";
import {
  updateFilter,
  startLoadingGridData,
  updateSorting,
} from "../../redux/grid/actions";
import Grid from "../Grid/Grid";

export default function () {
  const dispatch = useDispatch();
  const { meta, data, filter, sorting, loader } = useSelector(
    (state) => state.grid
  );

  const setSorting = useCallback((sortingString: Sorting) => {
    dispatch(updateSorting(sortingString));
  }, []);
  const setFilter = useCallback((columnFilter: Filter) => {
    dispatch(updateFilter(columnFilter));
  }, []);

  useEffect(() => {
    dispatch(startLoadingGridData());
  }, []);

  return (
    <div className="container">
      <Grid
        meta={meta}
        loader={loader}
        dataSource={data}
        filter={filter}
        sorting={sorting}
        onFilterChange={setFilter}
        onSortingChange={setSorting}
      />
    </div>
  );
}
