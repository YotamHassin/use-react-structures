// 

import { Dispatch, SetStateAction } from "react";
import { ChangeEvent, ChangesBaseEventMap } from "../useEventEmitter";
import { SetItemsChange } from "../useArrayState/useArrayStateTracker";

export type Changes = "change" | "setItems" | "addNewItem" | "moveItem" | 
//"moveDirection" | 
"updateItem" | "insertItem" | "deleteItem";


//type EventHandler<E extends ChangeEvent>;

//type ChangesEventMapTypes<TChange extends ChangeEvent> = Record<Changes, TChange>

/* type ChangesEventMapTypes
<T, TChangesEvent extends KeyofChangesEventMap<T>, TChange extends ChangesEventMap<T>> = 
Record<TChangesEvent, TChange> */

export type ChangesChangeEvent = Record<Changes, ChangeEvent>;

export interface ObjectChangesEventMap<T> 
//extends Map<Changes, ChangeEvent> 
//extends ChangesChangeEvent 
extends ChangesBaseEventMap
{
  //"change": Change1<T, KeyofChangesEventMap<T>>;

  /* "setItems": SetItemsChange<T>;
  "addNewItem": AddNewItemChange<T>;
  "moveItem": MoveItemChange<T>;
  //"moveDirection": MoveDirectionChange;
  "updateItem": UpdateItemChange<T>;
  "insertItem": InsertItemChange<T>;
  "deleteItem": DeleteItemChange<T>; */
}

export type KeyofObjectChangesEventMap<T> = keyof ObjectChangesEventMap<T>

export interface Change1<T, K extends KeyofObjectChangesEventMap<T>> extends ChangeEvent { 
  //items: T[];
  //change?: Changes;
  type: K;
  ev: ObjectChangesEventMap<T>[K];
}

export interface Change<T> extends ChangeEvent { 
  //items: T[];
  //change?: Changes;
  type: KeyofObjectChangesEventMap<T>;
  ev: ObjectChangesEventMap<T>[KeyofObjectChangesEventMap<T>];
}



/* export interface SetItemsChange<T> extends ChangeEvent { 
  items: T[];
}
export interface AddNewItemChange<T> extends ChangeEvent { 
  item: T;
  length: number;
}
export interface MoveItemChange<T> extends ChangeEvent { 
  index: number; 
  newIndex: number; 
  itemToMove: T[];
}
//export interface MoveDirectionChange extends ChangeEvent { }
export interface UpdateItemChange<T> extends ChangeEvent { 
  item: T; 
  index: number;
  oldItemsSplice: T[];
}
export interface InsertItemChange<T> extends ChangeEvent { 
  item: T; 
  index: number;
  oldItemsSplice: T[];
}
export interface DeleteItemChange<T> extends ChangeEvent { 
  index: number;
  deletedItemsSplice: T[];
}
 */


/* addEventListener<any, "setItems">("setItems", (ev: SetItemsChange<any>) => { ev.items }); */
//const addEventListener: <unknown, "setItems">(type: "setItems", listener: (this: Document, ev: SetItemsChange<unknown>) => void) => void
const addEventListener = <T, K extends KeyofObjectChangesEventMap<T>>(type: K, listener: (this: Document, ev: ObjectChangesEventMap<T>[K]) => void): void => {

};
addEventListener<any, "change">("change", (ev: Change<any>) => { ev.type });

/* 
// to fill (events extends ChangeEvent) with relevant data 
export interface ArrayState<T> {
  items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
  addNewItem: (item: T) => void;
  moveItem: (index: number, newIndex: number) => void;
  moveDirection: (index?: number, farward?: Direction) => void;
  updateItem: (item: T, index: number) => void;
  deleteItem: (index: number) => void;
}
 */