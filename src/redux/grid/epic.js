//@flow
import {
  ActionsObservable,
  StateObservable,
  ofType,
  combineEpics,
} from "redux-observable";
import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {
  tap,
  ignoreElements,
  debounceTime,
  distinctUntilChanged,
  delay,
  mapTo,
  mergeMap,
  switchMap,
  map,
  take,
  filter,
  catchError,
} from "rxjs/operators";
import * as Actions from "./actions";
import type { GridState } from "./reducer";
import type {
  Filter,
  Sorting,
  SortingEnum,
} from "../../components/Grid/metaTypes";
import { get, orderBy } from "lodash";

const logger = (
  action$: ActionsObservable<Actions.GridAction>,
  state$: StateObservable<GridState>
): ActionsObservable =>
  action$.pipe(
    tap((action) => console.log(action, state$.value.grid)),
    ignoreElements()
  );

const loadGridData = (
  action$: ActionsObservable<Actions.GridAction>,
  state$: StateObservable<GridState>
): ActionsObservable<Actions.GridAction> =>
  action$.pipe(
    ofType(Actions.START_LOADING_GRID_DATA),
    switchMap(() =>
      fromFetch(state$.value.grid.meta.fetchUrl, {
        selector: (r) => r.json(),
      })
    ),
    map((response) => applyFilter(response.results, state$.value.grid.filter)),
    map((data) => applySorting(data, state$.value.grid.sorting)),
    delay(1000),
    mergeMap((filteredData) =>
      of(
        Actions.updateGridData(filteredData),
        Actions.completeLoadingGridData()
      )
    ),
    catchError((err) => of(Actions.failLoadingGridData(err.message)))
  );

const updateFilter = (
  action$: ActionsObservable<Actions.GridAction>
): ActionsObservable<Actions.GridAction> =>
  action$.pipe(
    ofType(Actions.UPDATE_FILTER),
    debounceTime(500),
    distinctUntilChanged((prev, next) => prev.payload === next.payload),
    mapTo(Actions.startLoadingGridData())
  );

const updateSorting = (
  action$: ActionsObservable<Actions.GridAction>
): ActionsObservable<Actions.GridAction> =>
  action$.pipe(
    ofType(Actions.UPDATE_SORTING),
    distinctUntilChanged((prev, next) => prev.payload === next.payload),
    mapTo(Actions.startLoadingGridData())
  );

const applyFilter = (data: Array<any>, filter: Filter): Array<any> => {
  return data.filter((obj) =>
    Object.entries(filter).every(([path, value]) => {
      const objValue = get(obj, path);
      switch (true) {
        case value === "":
          return true;
        case typeof objValue === "string":
          return objValue.includes(value);
        case typeof objValue === "number":
          return objValue === Number(value);
        default:
          return false;
      }
    })
  );
};

const applySorting = (data: Array<any>, sorting: Map<Sorting>): Array<any> => {
  const sorter = Array.from(sorting.entries());
  if (!sorter.length) {
    return data;
  }
  const paths = sorter.map((entry) => entry[0]);
  const orders = sorter.map((entry) => entry[1]);
  console.log(paths, orders);
  return orderBy(data, paths, orders);
};

export default combineEpics(logger, loadGridData, updateFilter, updateSorting);
