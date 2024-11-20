//

import { Dispatch, SetStateAction } from "react";
import { ArrayChangesEventMap } from "./useArrayStateTracker";
import { CallbackFn } from "../models/InitArray";
import { Direction } from "../utils/common";
import { ListenerState } from "../useEventEmitter";
import { IUseTrilingReduce } from "../useReduceable";


export interface ArrayState<T> 
extends 
IUseTrilingReduce<T>
{
  items: T[];

  // Reduce: 
  /* useReduce<OutTyp>(
    callbackFn: CallbackFn<T, OutTyp>,
    initialValueOut: OutTyp
  ): Reduce<OutTyp>; */
}

export interface ArrayStateChangeAble<T> 
extends 
ArrayState<T>,
ListenerState<ArrayChangesEventMap<T>>
{
  //items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
  addNewItem: (item: T, newIndex?: number) => void;
  moveItem: (index: number, newIndex: number) => void;
  moveDirection: (index?: number, farward?: Direction) => void;
  updateItem: (item: T, index: number) => void;
  insertItem: (item: T, index: number) => void;
  deleteItem: (index: number) => void;

  // ListenerState
  /* addEventListener: 
  (type: keyof EventMap, listener: (this: Document, ev: EventMap[keyof EventMap]) => void) => void;

  removeEventListener: 
  (type: keyof EventMap, listener: (this: Document, ev: EventMap[keyof EventMap]) => void) => void;
 */

  // Reduce: 
  /* useReduce<OutTyp>(
    callbackFn: CallbackFn<T, OutTyp>,
    initialValueOut: OutTyp
  ): Reduce<OutTyp>; */

}
