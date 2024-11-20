//

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { CallbackFn, InitArray } from "../models/InitArray";
//import { HasIdName } from "@/models/base";
import EventEmitter from "events";
import {
  Change,
  ArrayChangesEventMap,
  KeyofArrayChangesEventMap,
} from "./useArrayStateTracker";

import { ArrayStateChangeAble } from "./useArrayStateTyps";
import { EventEmitterState, useEventEmitter } from "../useEventEmitter";
import { Direction } from "../useReactAction";
import { Reduce, useReduced, useReducedArray } from "../useReduceable";

/* const { 
  items, setItems, addNewItem, 
    updateItem, insertItem, deleteItem, 
    moveDirection, moveItem, 
    addEventListener, removeEventListener } 
= useArrayState(items, setItems) */

export const useArrayStateItems = <T>(
  items: T[] = [],
  setItems: Dispatch<SetStateAction<T[]>>
): ArrayStateChangeAble<T> => {
  //const eventEmitter: EventEmitter = new EventEmitter();
  const eventEmitter: EventEmitterState<ArrayChangesEventMap<T>> =
    useEventEmitter<T, ArrayChangesEventMap<T>>();

  // eventEmitter.emit()
  function emitChange(
    type: KeyofArrayChangesEventMap<T>,
    changesEvent: ArrayChangesEventMap<T>[KeyofArrayChangesEventMap<T>]
  ): void {
    console.log(`useArrayState changeEventListener: `, { type, changesEvent });
    eventEmitter.emitChange(type, changesEvent);
  }

  function addNewItem(item: T, newIndex: number | undefined = undefined) {
    const itemsCopy = Array.from(items);
    const itemCopy = Object.assign({ id: items.length }, item);

    //itensCopy.splice(newIndex, 0, itemToMove[0]);
    //itemsCopy.push(itemCopy);

    if (newIndex && !isNaN(newIndex) && newIndex <= itemsCopy.length) {
      itemsCopy.splice(newIndex, 0, itemCopy);
    } else {
      itemsCopy.push(itemCopy);
    }

    setItems(itemsCopy);
    emitChange("addNewItem", { item, length: items.length });
    return items.length;
  }

  function moveItem(index: number, newIndex: number) {
    const itemsCopy = Array.from(items);
    // remove from old index
    const itemToMove: T[] = itemsCopy.splice(index, 1);
    // add to new index
    itemsCopy.splice(newIndex, 0, itemToMove[0]);
    setItems(itemsCopy);
    console.log(`moveItem `, { index, newIndex, itensCopy: itemsCopy, items });
    emitChange("moveItem", { index, newIndex, itemToMove });
    return itemToMove;
  }

  // use moveItem
  function moveDirection(index = 0, farward: Direction = "Forward") {
    // myArr, moveItem
    const newIndex = index + (farward == "Forward" ? 1 : -1);

    let isPositive = newIndex >= 0,
      notOutOfRange = newIndex < items.length;

    if (isPositive && notOutOfRange) {
      //console.log(`moveDirection `, { index, newIndex, farward });

      // moveDirection will run moveItem
      //emitChange("moveDirection", {  });
      return moveItem(index, newIndex);
    } else if (isPositive) {
      return new Error(`Argument ${newIndex} Out Of Range Error`);
    } else {
      return new Error(`Argument ${newIndex} Not Positive Error`);
    }
  }

  function updateItem(item: T, index: number = 0) {
    const itensCopy = Array.from(items);
    const oldItemsSplice: T[] = itensCopy.splice(index, 1, item);
    setItems(itensCopy);
    emitChange("updateItem", { item, index, oldItemsSplice });
    return oldItemsSplice;
  }

  function updateItem1(item: T, index: number = 0) {
    const deletedItemsSplice: T[] = deleteItem(index);
    const oldItemsSplice: T[] = insertItem(item, index);
    return { deletedItemsSplice, oldItemsSplice };
  }

  function insertItem(item: T, index: number = 0) {
    const itensCopy = Array.from(items);
    const oldItemsSplice: T[] = itensCopy.splice(index, 0, item);
    setItems(itensCopy);
    emitChange("insertItem", { item, index, oldItemsSplice });
    return oldItemsSplice;
  }

  function deleteItem(index: number = items.length) {
    const itensCopy = Array.from(items);
    const deletedItemsSplice: T[] = itensCopy.splice(index, 1);
    setItems(itensCopy);
    emitChange("deleteItem", { index, deletedItemsSplice });
    return deletedItemsSplice;
  }

  function addEventListener(
    type: KeyofArrayChangesEventMap<T>,
    listener: (
      this: Document,
      ev: ArrayChangesEventMap<T>[KeyofArrayChangesEventMap<T>]
    ) => void
  ): void {
    eventEmitter.addEventListener(type, listener);
  }

  function removeEventListener(
    type: KeyofArrayChangesEventMap<T>,
    listener: (
      this: Document,
      ev: ArrayChangesEventMap<T>[KeyofArrayChangesEventMap<T>]
    ) => void
  ): void {
    eventEmitter.removeEventListener(type, listener);
  }

  /* <TypItem, TypTriling>(previousValue: TrilingTyp, currentValue: InputItem, currentIndex: number, array: InputItem[]) => {
			previousValue.arrMaped.push(arrMap1.apply(this, [currentValue, currentIndex]))
			return previousValue;
	}; 
  
  
  callbackFn: CallbackFn<InTyp, OutTyp>, 

  const reduceCallback: () => OutTyp  = useCallback(() => 
    items.reduce(callbackFn, initialValueOut), [items, callbackFn]);

  const reducedMemoized: () => OutTyp  = useCallback(() => 
    useMemo(reduceCallback, [items, callbackFn]), [items, callbackFn]);

  */

  function useReduce<OutTyp>(
    callbackFn: CallbackFn<T, OutTyp>,
    initialValueOut: OutTyp
  ): Reduce<OutTyp> {
    /*     const reduceFn: () => OutTyp = 
    () => items.reduce<OutTyp>(callbackFn, initialValueOut);

    const reduceCallback: () => OutTyp = useCallback(reduceFn, [
      items,
      callbackFn,
    ]);

    const reduceMemoized: () => OutTyp = useCallback(
      () => useMemo(reduceCallback, [items, callbackFn]),
      [items, callbackFn]
    );
 */
    const reduceA: Reduce<OutTyp> =
      //{ reduceFn, reduceCallback, reduceMemoized };
      useReducedArray(items)(callbackFn, initialValueOut);

    return reduceA;
  }

  const ctrl: ArrayStateChangeAble<T> = {
    items,
    // update items
    setItems,
    addNewItem,
    updateItem,
    insertItem,
    deleteItem,
    moveDirection,
    moveItem,

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
= useArrayState() */

//export const useArrayState = <T extends HasIdName>(
export const useArrayState = <T>(
  initialState: InitArray<T> = []
): ArrayStateChangeAble<T> => {
  const [items, setItems] = useState<Array<T>>(initialState);

  return useArrayStateItems(items, setItems);
};
