//

import { CallbackFn, InitArray, InitTyp } from "../models/InitArray";
import { PipeFunc } from "myy-common";
import { DependencyList, useCallback, useMemo, useState } from "react";
import { Reduce, Reduceable, ReduceableArray } from "./useReduceableTypes";



export function useIncrement(
  initialCount: number = 0
): [number, PipeFunc<void, number>] {
  const [count, setCount] = useState<number>(initialCount);

  const incrementFn: () => number = () => {
    const newCount = count + 1; 
    setCount(newCount); 
    return newCount };

  return [count, incrementFn];
}


export function useReduced<InTyp>(valueTyp: InitTyp<InTyp>): Reduceable<InTyp> {
  const valueInTyp: InTyp = typeof (valueTyp) == `function` ? 
    (valueTyp as Function)() : valueTyp as InTyp;
  /*   const reduceA: Reduce<OutTyp> = {
    reduceFn, reduceCallback, reduceMemoized 
  };

  return reduceA;

 */

  function useReduce<OutTyp>(
    callbackFn: PipeFunc<InTyp, OutTyp>
  ): Reduce<OutTyp> {
    const reduceFn: () => OutTyp = () => callbackFn(valueInTyp);

    /* use callback outValue with extended DependencyList */
    const reduceValue: (deps: DependencyList) => OutTyp = 
    (deps: DependencyList) => useCallback(reduceFn, [valueInTyp, callbackFn, ...deps])();

    /* use callback outValue with recalc action returns number of recalcs */
    const reduceTriggeredValue: () => [OutTyp, PipeFunc<void, number>] = () =>
    {
      const [count, incrementFn] = useIncrement();
      return [reduceValue([count]), incrementFn];
    }

    const reduceCallback: () => OutTyp = reduceValue.bind(reduceValue, []);
    /* const reduceCallback: () => OutTyp = useCallback(reduceFn, [
      valueInTyp,
      callbackFn,
    ]); */

    const reduceMemoized: () => OutTyp = useCallback(
      () => useMemo(reduceCallback, [valueInTyp, callbackFn]),
      //() => useMemo(reduceFn, [value, callbackFn]),
      [valueInTyp, callbackFn]
    );

    const reduceA: Reduce<OutTyp> = {
      reduceFn,
      reduceValue,
      reduceTriggeredValue,
      reduceCallback,
      reduceMemoized,
    };

    return reduceA;
  }

  return useReduce;
}


export function useReducedArray<InTyp>(arrayTyp: InitArray<InTyp>): ReduceableArray<InTyp> {
  const arrayInTyp: InTyp[] = typeof (arrayTyp) == `function` ? 
    (arrayTyp as Function)() : arrayTyp as InTyp[];

    function useReduce<OutTyp>(
    callbackFn: CallbackFn<InTyp, OutTyp>,
    initialValueOut: OutTyp
  ): Reduce<OutTyp> {
    

    return useReduced(arrayInTyp)(iLst => arrayInTyp.reduce<OutTyp>(callbackFn, initialValueOut));
  }

  return useReduce;

}
