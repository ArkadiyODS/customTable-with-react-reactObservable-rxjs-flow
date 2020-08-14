//@flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { GridReducer, GridEpic } from "./grid";

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    combineReducers({
      grid: GridReducer,
    }),
    applyMiddleware(epicMiddleware)
  );
  epicMiddleware.run(GridEpic);
  return store;
}
