// https://redux.js.org/usage/implementing-undo-history

import { Dispatch, SetStateAction, useState } from "react";
import { HistoryTracker } from "./models/HistoryTracker";
import { InitTyp } from "./models/InitArray";
import { useValue } from "./useReactAction";

export type HistoryState<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  undo: Dispatch<void>;
  redo: Dispatch<void>;
  history: HistoryTracker<T>;
  //isUndo: boolean;
  //isRedo: boolean;
};

/* const { 
  value : historyValue, setValue: setHistoryValue, 
  undo, redo, history } 
= useHistoryState(1) */

export function useHistoryStateTyp<T>(
  initialState: InitTyp<T>
): HistoryState<T> {

  const initialPresent: T = useValue(initialState, undefined);

  const [history, setHistory] = useState<HistoryTracker<T>>({
    // to-do: futures from the past, multy re-do's coused by un-do's and re-value's.
    future: [],
    present: initialPresent,
    past: [],
  });

  const { past, present, future } = history;

  const setValue: Dispatch<SetStateAction<T>> = (setStateAction: SetStateAction<T>) => {
    // as func or as value
    const newValue: T = useValue(setStateAction, present);

    if (newValue == undefined || newValue == present) {
      return;
    }

    setHistory({
      past: [...past, present],
      present: newValue,
      future: [],
    });
  };

  const undo: Dispatch<void> = () => {
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    if (previous == undefined) {
      return;
    }

    setHistory({
      past: newPast,
      present: previous,
      future: [present, ...future],
    });
  };

  const redo: Dispatch<void> = () => {
    const next = future[0];
    const newFuture = future.slice(1);
    if (next == undefined) {
      return;
    }

    setHistory({
      past: [...past, present],
      present: next,
      future: newFuture,
    });
  };

  //const isUndo = useMemo<boolean>(() => { return past?.length >= 0} ,[history, past])
  //const isRedo = useMemo<boolean>(() => { return future?.length >= 0} ,[history, future])

  return {
    value: present,
    setValue,
    undo,
    redo,
    history,
    //isUndo, isRedo
  };
}

/* useState with History Tracker and undo-redo Actions, 
can be used with object or array state, Must come first! */
export function useHistoryState<T>(initialState: InitTyp<T>) 
: [T, Dispatch<SetStateAction<T>>, Dispatch<void>, Dispatch<void>, HistoryTracker<T>]
{
  const { value, setValue, undo, redo, history } =
    useHistoryStateTyp(initialState);

  return [
    value,
    setValue,
    undo,
    redo,
    history,
    //isUndo, isRedo
  ];
}
