// 

import { Dispatch, SetStateAction } from "react";
import { ChangeEvent, ChangesBaseEventMap } from "../useEventEmitter";

export type Changes = "change" | "setItems" | "addNewItem" | "moveItem" | 
//"moveDirection" | 
"updateItem" | "insertItem" | "deleteItem";

//type EventHandler<E extends ChangeEvent>;

//type ChangesEventMapTypes<TChange extends ChangeEvent> = Record<Changes, TChange>

/* type ChangesEventMapTypes
<T, TChangesEvent extends KeyofChangesEventMap<T>, TChange extends ChangesEventMap<T>> = 
Record<TChangesEvent, TChange> */

export type ChangesChangeEvent = Record<Changes, ChangeEvent>;

export interface ArrayChangesEventMap<T> 
//extends Map<Changes, ChangeEvent> 
//extends ChangesChangeEvent 
extends ChangesBaseEventMap
{
  //"change": Change1<T, KeyofChangesEventMap<T>>;

  "setItems": SetItemsChange<T>;
  "addNewItem": AddNewItemChange<T>;
  "moveItem": MoveItemChange<T>;
  //"moveDirection": MoveDirectionChange;
  "updateItem": UpdateItemChange<T>;
  "insertItem": InsertItemChange<T>;
  "deleteItem": DeleteItemChange<T>;
}

export type KeyofArrayChangesEventMap<T> = keyof ArrayChangesEventMap<T>

export interface Change1<T, K extends KeyofArrayChangesEventMap<T>> extends ChangeEvent { 
  //items: T[];
  //change?: Changes;
  type: K;
  ev: ArrayChangesEventMap<T>[K];
}

export interface Change<T> extends ChangeEvent { 
  //items: T[];
  //change?: Changes;
  type: KeyofArrayChangesEventMap<T>;
  ev: ArrayChangesEventMap<T>[KeyofArrayChangesEventMap<T>];
}



export interface SetItemsChange<T> extends ChangeEvent { 
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


/* addEventListener<any, "setItems">("setItems", (ev: SetItemsChange<any>) => { ev.items }); */
//const addEventListener: <unknown, "setItems">(type: "setItems", listener: (this: Document, ev: SetItemsChange<unknown>) => void) => void
const addEventListener = <T, K extends KeyofArrayChangesEventMap<T>>(type: K, listener: (this: Document, ev: ArrayChangesEventMap<T>[K]) => void): void => {

};
addEventListener<any, "setItems">("setItems", (ev: SetItemsChange<any>) => { ev.items });

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