//@flow
import { ActionsObservable } from "redux-observable";
import { tap, ignoreElements } from "rxjs/operators";

export default (action$: ActionsObservable) =>
  action$.pipe(
    tap((action) => console.log(action)),
    ignoreElements()
  );
