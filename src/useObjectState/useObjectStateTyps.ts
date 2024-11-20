//

import { PipeFunc } from "myy-common";
import { Dispatch, SetStateAction } from "react";
import { InitTyp } from "../models/InitArray";
import { IUseReduce } from "../useReduceable";
import { ListenerState } from "../useEventEmitter";
import { ObjectChangesEventMap } from "./useObjectStateTracker";


export interface ObjectState<T> 
extends 
IUseReduce<T>
{
  value: T;

  // Reduce: 
  /* useReduce<OutTyp>(
    callbackFn: CallbackFn<T, OutTyp>,
  ): Reduce<OutTyp>; */
}


export interface ObjectStateChangeAble<T> 
extends 
ObjectState<T>,
ListenerState<ObjectChangesEventMap<T>>
{
  //item: T;
  setValue: Dispatch<SetStateAction<T>>;

  // Set Item
  /* 
  addNewItem: (item: T) => void;
  moveItem: (index: number, newIndex: number) => void;
  moveDirection: (index?: number, farward?: Direction) => void;
  updateItem: (item: T, index: number) => void;
  insertItem: (item: T, index: number) => void;
  deleteItem: (index: number) => void; */


}


