import React from "react";
import {
  FaArrowDown,
  FaArrowUp
} from "react-icons/fa";

import { SortOrder } from "schema/generated/graphql";

export type SortItem = [string, SortOrder];
export const formatSortOrder = (order: SortItem[1] | null): React.ReactElement => {
  switch (order) {
    default: return <></>;
    case SortOrder.Asc: return <FaArrowUp />;
    case SortOrder.Desc: return <FaArrowDown />;
  }
}
export const useSortOrderManager = (): {
  list: SortItem[],
  toggle: (key: string) => void,
  getOrderBy: (key: string) => SortOrder | null,
} => {
  const [list, setList] = React.useState<SortItem[]>([]);
  return {
    list,
    toggle: (key:string):any => {
      const found = list.find(item => item[0] === key);
      switch (found?.[1]) {
        default: {
          setList([...list, [key, SortOrder.Asc]]);
        } break;
        case SortOrder.Asc: {
          found[1] = SortOrder.Desc;
          setList([...list]);
        } break;
        case SortOrder.Desc: {
          list.splice(list.indexOf(found), 1);
          setList([...list]);
        } break;
      }
    },
    getOrderBy: (key:string):any => {
      const found = list.find(item => item[0] === key);
      if (!found) return null;
      return found[1];
    },
  };
}
