//@flow
import { mockedGridMeta } from "../../mocks";
import * as Actions from "./actions";
import type {
  GridMeta,
  Filter,
  Sorting,
  SortingEnum,
} from "../../components/Grid/metaTypes";
// import { itemСomparator } from "../../utils";

export type GridState = {
  +meta: GridMeta,
  +data: Array<any>,
  +selected: Array<any>,
  +filter: Filter,
  +sorting: Sorting,
  +loader: boolean,
  +error: string,
};

const initialState: GridState = {
  meta: mockedGridMeta,
  data: [],
  selected: [],
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
      return { ...state, data: action.payload, error: "" };
    case Actions.UPDATE_GRID_SELECTION:
      return { ...state, selected: action.payload };
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
    //Not necessary to run it through redux
    // case Actions.UPDATE_GRID_SELECTION_SINGLE:
    //   const { selectedItem, isSelected } = action.payload;
    //   let newSelected;
    //   if (isSelected) {
    //     newSelected = state.selected.concat(selectedItem);
    //   } else {
    //     const itemIdentifier = state.meta.dataSourceIdentifier;
    //     newSelected = state.selected.filter(
    //       (existingItem) =>
    //         !itemComparator(existingItem, selectedItem, itemIdentifier)
    //     );
    //   }
    //   return { ...state, selected: newSelected };
    default:
      return state;
  }
}
