//@flow
import { mockedGridMeta, mockedGridData } from "../../mocks";
import * as Actions from "./actions";
import type {
  GridMeta,
  Filter,
  Sorting,
} from "../../components/Grid/metaTypes";

export type GridState = {
  meta: GridMeta,
  data: Array<any>,
  filter: Filter,
  sorting: Map<Sorting>,
  loader: boolean,
};

const initialState: GridState = {
  meta: mockedGridMeta,
  data: [],
  filter: {},
  sorting: new Map(),
  loader: true,
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
    case Actions.UPDATE_GRID_DATA:
      return { ...state, data: action.payload || [] };
    case Actions.UPDATE_FILTER:
      const newFilter = { ...state.filter, ...action.payload };
      return { ...state, filter: newFilter };
    case Actions.UPDATE_SORTING:
      const newSorting = new Map(state.sorting);
      const key = Object.keys(action.payload)[0];
      const value = action.payload[key];
      if (value === "none") {
        newSorting.delete(key);
      } else {
        newSorting.set(key, action.payload[key]);
      }
      return { ...state, sorting: newSorting };
    default:
      return state;
  }
}
