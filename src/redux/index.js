//@flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { GridConfigReducer, GridConfigEpic } from "./gridConfig";

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    combineReducers({
      grid: combineReducers({ config: GridConfigReducer }),
    }),
    applyMiddleware(epicMiddleware)
  );
  epicMiddleware.run(GridConfigEpic);
  return store;
}
