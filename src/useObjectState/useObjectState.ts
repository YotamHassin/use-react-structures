//

import { PipeFunc } from "myy-common";
import { Dispatch, SetStateAction, useState } from "react";
import { InitTyp } from "../models/InitArray";
import { EventEmitterState, useEventEmitter } from "../useEventEmitter";
import { IUseReduce, Reduce, useReduced } from "../useReduceable";
import { KeyofObjectChangesEventMap, ObjectChangesEventMap } from "./useObjectStateTracker";
import { ObjectStateChangeAble } from "./useObjectStateTyps";


/* const { 
  items, setItems, addNewItem, 
    updateItem, insertItem, deleteItem, 
    moveDirection, moveItem, 
    addEventListener, removeEventListener } 
= useObjectState(items, setItems) */

export const useObjectStateItems = <T>(
  value: T,
  setValue: Dispatch<SetStateAction<T>>
): ObjectStateChangeAble<T> => {

  //const eventEmitter: EventEmitter = new EventEmitter();
  const eventEmitter: EventEmitterState<ObjectChangesEventMap<T>> = useEventEmitter<
    T,
    ObjectChangesEventMap<T>
  >();

  // eventEmitter.emit()
  function emitChange(
    type: KeyofObjectChangesEventMap<T>,
    changesEvent: ObjectChangesEventMap<T>[KeyofObjectChangesEventMap<T>]
  ): void {
    console.log(`useObjectState changeEventListener: `, { type, changesEvent });
    eventEmitter.emitChange(type, changesEvent);
  }

  /* Set Functions */


  /* Interface implementations */
  function addEventListener(
    type: KeyofObjectChangesEventMap<T>,
    listener: (
      this: Document,
      ev: ObjectChangesEventMap<T>[KeyofObjectChangesEventMap<T>]
    ) => void
  ): void {
    eventEmitter.addEventListener(type, listener);
  }

  function removeEventListener(
    type: KeyofObjectChangesEventMap<T>,
    listener: (
      this: Document,
      ev: ObjectChangesEventMap<T>[KeyofObjectChangesEventMap<T>]
    ) => void
  ): void {
    eventEmitter.removeEventListener(type, listener);
  }

  function useReduce<OutTyp>(
    callbackFn: PipeFunc<T, OutTyp>,
  ): Reduce<OutTyp>
   {
    const reduceA: Reduce<OutTyp> = 
    //{ reduceFn, reduceCallback, reduceMemoized };
    useReduced(value)(v => callbackFn(value))

    return reduceA;
  }

  const ctrl: ObjectStateChangeAble<T> = {
    value: value,
    // update items
    setValue: setValue,
    /* addNewItem,
    updateItem,
    insertItem,
    deleteItem,
    moveDirection,
    moveItem, */

    // Event Listeners
    addEventListener,
    removeEventListener,

    // Reduce
    useReduce, 
  };

  return ctrl;
};

/* const { 
  items, setItems, addNewItem, 
    updateItem, insertItem, deleteItem, 
    moveDirection, moveItem, 
    addEventListener, removeEventListener } 
= useObjectState() */

//export const useObjectState = <T extends HasIdName>(
export const useObjectState = <T>(
  initialState: InitTyp<T>
): ObjectStateChangeAble<T> => {
  const [items, setItems] = useState<T>(initialState);

  return useObjectStateItems(items, setItems);
};
