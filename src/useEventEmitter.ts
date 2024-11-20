'use client';

//

import { Dispatch, SetStateAction, useState } from "react";
import EventEmitter from "events";

export type Changes = "change";

export interface ChangeEvent {}

export type ChangesEvent
<TChanges extends Changes> = 
Record<TChanges, ChangeEvent>;

export interface ChangesBaseEventMap {
  //extends Map<Changes, ChangeEvent>
  //extends ChangesEvent<TChanges>
  change: Change;
}

export interface Change extends ChangeEvent {
  //change?: Changes;
  type: keyof ChangesBaseEventMap;
  ev: ChangesBaseEventMap[keyof ChangesBaseEventMap];
}


export interface ListenerState<EventMap extends ChangesBaseEventMap> 
{

  addEventListener: 
  (type: keyof EventMap, listener: (this: Document, ev: EventMap[keyof EventMap]) => void) => void;

  removeEventListener: 
  (type: keyof EventMap, listener: (this: Document, ev: EventMap[keyof EventMap]) => void) => void;

}

export interface EventEmitterState<EventMap extends ChangesBaseEventMap> 
extends ListenerState<EventMap> 
{
  eventEmitter: EventEmitter;

  // eventEmitter.emit()
  //emit(type: keyof EventMap, ev: EventMap[keyof EventMap]): void ;

  // emit change { type, ev: changesEvent } then emit type, changesEvent
  emitChange(
    type: keyof EventMap,
    changesEvent: EventMap[keyof EventMap]
  ): void;

}

/*   
const eventEmitter: EventEmitterState<ArrayChangesEventMap<T>> = useEventEmitter<
  T,
  ArrayChangesEventMap<T>
>();
 */
export const useEventEmitter = <
  T,
  EventMap extends ChangesBaseEventMap,
  //K extends Changes
  //KeyofEventMap extends KeyofChangesEventMap<T>
>(): EventEmitterState<EventMap> => {
  const eventEmitter: EventEmitter = new EventEmitter();

  type KeyofEventMap = keyof EventMap;

  // eventEmitter.emit()
  function emit(type: KeyofEventMap, ev: EventMap[KeyofEventMap]): void {
    eventEmitter.emit(type as string, [ev]);
  }

  // emit change { type, ev: changesEvent } then emit type, changesEvent
  function emitChange(
    type: KeyofEventMap,
    changesEvent: EventMap[KeyofEventMap]
  ): void {
    console.log(`useArrayState changeEventListener: `, { type, changesEvent });
    emit("change", {type, changesEvent} as EventMap[KeyofEventMap]);
    emit(type, changesEvent);
  }

  function addEventListener
  (type: KeyofEventMap, listener: (this: Document, ev: EventMap[KeyofEventMap]) => void): void {
    eventEmitter.addListener(type as string, listener);
  };


  function removeEventListener
  (type: KeyofEventMap, listener: (this: Document, ev: EventMap[KeyofEventMap]) => void): void {
    eventEmitter.removeListener(type as string, listener);
  };

  return { eventEmitter, emitChange, addEventListener, removeEventListener, }
};
