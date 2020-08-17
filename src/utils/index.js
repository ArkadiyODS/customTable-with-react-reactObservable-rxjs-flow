//@flow
import { get } from "lodash";

export function isItemAvailableInArray(
  itemToCompare: any,
  items: Array<any>,
  itemIdentifier: string
): boolean {
  return items.some((item: any): boolean =>
    itemСomparator(item, itemToCompare, itemIdentifier)
  );
}

export function itemСomparator(
  itemA: any,
  itemB: any,
  itemIdentifier: string
): boolean {
  if (
    itemIdentifier &&
    typeof itemA === "object" &&
    typeof itemB === "object"
  ) {
    return get(itemA, itemIdentifier) === get(itemB, itemIdentifier);
  }
  return itemA === itemB;
}
