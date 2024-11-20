// useStructure

/* Event Emitter */
export type { ChangesBaseEventMap, ListenerState, EventEmitterState } from './useEventEmitter'

export { useEventEmitter } from './useEventEmitter'


/* History State */
export type { HistoryState } from './useHistoryState'
  
export { useHistoryStateTyp, useHistoryState } from './useHistoryState'


/* Changeable State */
export type { UseStateArrayTyp, UseStateOnChange } from './useChangeableState'

export { useChangeableState, useChangeableStateInit } from './useChangeableState'


/* Object State */
export type { ObjectState, ObjectStateChangeAble, ObjectChangesEventMap, KeyofObjectChangesEventMap } from './useObjectState'

export { useObjectState, useObjectStateItems } from './useObjectState'


/* Array State */
export type { ArrayStateChangeAble, ArrayChangesEventMap, KeyofArrayChangesEventMap } from './useArrayState'

export { useArrayState, useArrayStateItems } from './useArrayState'



/* 
export type Reduceable<InTyp> = <OutTyp>(
    callbackFn: PipeFunc<InTyp, OutTyp>
) => Reduce<OutTyp>;
 */

/* Reduce Able */
export type { Reduceable, ReduceableArray, 
    IUseReduce, IUseTrilingReduce, Reduce
 } from './useReduceable'

export { useIncrement, useReduced, useReducedArray } from './useReduceable'


export * from './components'




