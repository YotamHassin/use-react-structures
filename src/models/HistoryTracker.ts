
export type HistoryTracker<T> = {
    past: T[];
    present: T;
    // to-do: futures from the past, multy re-do's coused by un-do's and re-value's.
    future: T[];
  };
  