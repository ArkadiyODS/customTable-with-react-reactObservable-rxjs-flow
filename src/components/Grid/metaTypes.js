//@flow
import type { Node } from "react";

export type SortingEnum = "acs" | "desc" | "none";

export type Sorting = { [key: string]: SortingEnum };

export type ColumnMeta = {
  title: string,
  dataPath: string,
  visible?: boolean,
  width?: number,
  sortable?: boolean,
  sortedBy?: SortingEnum,
  filterable?: boolean,
  order?: number,
  renderer?: (config: ColumnMeta, data: {}) => Node,
};

export type GridMeta = {
  columns: Array<ColumnMeta>,
  selectable?: boolean,
  numberOfRows: number,
};

export type Filter = {
  [key: string]: string,
};
