//@flow

export type GridConfigState = null;

export type GridConfigAction = {
  type: string,
  payload?: number | GridConfigState,
};

const initialState: GridConfigState = null;

export default function (
  state: GridConfigState = initialState,
  action: GridConfigAction
): GridConfigState {
  switch (action.type) {
    case "":
      return state;
    default:
      return state;
  }
}
