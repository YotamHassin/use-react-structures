//

import { CallbackFn } from "../models/InitArray";
import { PipeFunc } from "myy-common";
import { DependencyList } from "react";

// Reduce
export type Reduce<Typ> = {
  reduceFn: () => Typ;
  reduceTriggeredValue: () => [Typ, PipeFunc<void, number>];
  reduceValue: (deps: DependencyList) => Typ;
  reduceCallback: () => Typ;
  reduceMemoized: () => Typ;
};

/*  */

/**
 * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
 * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
 type Reduce<ItemTyp, TrilingTyp> = (
  callbackfn: ReduceCallbackfn<ItemTyp, TrilingTyp>,
  initialValue: TrilingTyp
) => TrilingTyp; */

export interface IUseTrilingReduce<T> {
  useReduce<OutTyp>(
    callbackFn: CallbackFn<T, OutTyp>,
    initialValueOut: OutTyp
  ): Reduce<OutTyp>;
}

export interface IUseReduce<T> {
  useReduce<OutTyp>(callbackFn: PipeFunc<T, OutTyp>): Reduce<OutTyp>;
}



/*  */
// Reduced - InTyp, OutTyp reduceable
export type Reduceable<InTyp> = <OutTyp>(
  callbackFn: PipeFunc<InTyp, OutTyp>
) => Reduce<OutTyp>;


export type ReduceableArray<InTyp> = <OutTyp>(
  callbackFn: CallbackFn<InTyp, OutTyp>,
  initialValueOut: OutTyp
) => Reduce<OutTyp>;





