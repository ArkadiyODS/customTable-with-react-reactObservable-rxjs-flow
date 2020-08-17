//@flow
import { mockedGridMeta } from "../../mocks";
import * as Actions from "./actions";
import type {
  GridMeta,
  Filter,
  Sorting,
  SortingEnum,
} from "../../components/Grid/metaTypes";

export type GridState = {
  +meta: GridMeta,
  +data: Array<any>,
  +filter: Filter,
  +sorting: Sorting,
  +loader: boolean,
  +error: string,
};

const initialState: GridState = {
  meta: mockedGridMeta,
  data: [],
  filter: {},
  sorting: new Map(),
  loader: true,
  error: "",
};

export default function (
  state: GridState = initialState,
  action: Actions.GridAction
): GridState {
  switch (action.type) {
    case Actions.START_LOADING_GRID_DATA:
      return { ...state, loader: true };
    case Actions.COMPLETE_LOADING_GRID_DATA:
      return { ...state, loader: false };
    case Actions.FAIL_LOADING_GRID_DATA:
      return { ...state, error: action.payload, loader: false };
    case Actions.UPDATE_GRID_DATA:
      return { ...state, data: action.payload || [], error: "" };
    case Actions.UPDATE_FILTER:
      const newFilter: Filter = { ...state.filter, ...action.payload };
      return { ...state, filter: newFilter };
    case Actions.UPDATE_SORTING:
      const newSorting = new Map<string, SortingEnum>(state.sorting);
      const [key: string, value: SortingEnum] = Array.from(
        action.payload.entries()
      )[0];
      if (value === "asc" || value === "desc") {
        newSorting.set(key, value);
      } else {
        newSorting.delete(key);
      }
      return { ...state, sorting: newSorting };
    default:
      return state;
  }
}
