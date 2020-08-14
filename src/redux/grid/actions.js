//@flow

import type {
  GridMeta,
  Filter,
  Sorting,
} from "../../components/Grid/metaTypes";

export type GridAction = {
  type: string,
  payload?: any,
};

export const UPDATE_GRID_DATA = "UPDATE_GRID_DATA",
  START_LOADING_GRID_DATA = "START_LOADING_GRID_DATA",
  COMPLETE_LOADING_GRID_DATA = "COMPLETE_LOADING_GRID_DATA",
  FAIL_LOADING_GRID_DATA = "FAIL_LOADING_GRID_DATA",
  UPDATE_FILTER = "UPDATE_FILTER",
  RESET_FILTER = "RESET_FILTER",
  UPDATE_SORTING = "UPDATE_SORTING",
  RESET_SORTING = "RESET_SORTING";

export const startLoadingGridData = (): GridAction => ({
  type: START_LOADING_GRID_DATA,
});

export const completeLoadingGridData = (): GridAction => ({
  type: COMPLETE_LOADING_GRID_DATA,
});

export const failLoadingGridData = (errorMessage: string): GridAction => ({
  type: FAIL_LOADING_GRID_DATA,
  payload: errorMessage,
});

export const updateGridData = (payload: Array<any>): GridAction => ({
  type: UPDATE_GRID_DATA,
  payload,
});

export const updateFilter = (payload: Filter): GridAction => ({
  type: UPDATE_FILTER,
  payload,
});

export const updateSorting = (payload: Sorting): GridAction => ({
  type: UPDATE_SORTING,
  payload,
});
