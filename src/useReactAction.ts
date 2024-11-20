//

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Action, PipeFunc } from "myy-common";
import { UseStateArrayTyp } from "./useChangeableState";
import { uuidv4 } from "./utils/common";
import { InitTyp } from "./models/InitArray";
//import { HasIdName } from "@/models/base";

export type { Direction } from "./utils/common";

// Action
export interface ReactAction<PropsTyp> extends Action<PropsTyp> {
  /* (props: PropsTyp): void; */
}

// assign Func
export function assignFunc<TypInitProps>(
  props: Partial<TypInitProps>,
  defaults: TypInitProps
) {
  /* 
const { initialValue,
  events
} = assignFunc<MyInputInitProps>(props, {
  initialValue: '',
  events: {}
});
*/

  /* Object.assign<Partial<MyInputInitProps>, Partial<MyInputInitProps>, MyInputInitProps>({}, {
		initialValue: ''
	}, props); */

  const myAssign = Object.assign<
    Partial<TypInitProps>,
    TypInitProps,
    Partial<TypInitProps>
  >;

  /* return Object.assign<
    Partial<TypInitProps>,
    TypInitProps,
    Partial<TypInitProps>
  >({}, defaults, props) as TypInitProps; */

  return myAssign({}, defaults, props) as TypInitProps;
}

// useId 
export const useGId = (): string => uuidv4();

// as func or as value
export const useValue = <Typ>(
  setStateAction: SetStateAction<Typ>,
  prev: Typ | undefined
): Typ =>
  typeof setStateAction === "function"
    ? (setStateAction as (prev: Typ | undefined) => Typ)(prev)
    : setStateAction;

export interface ValueSetValue<Typ> {
  key: string;
  value: Typ;
  setvalue: Dispatch<SetStateAction<Typ>>;
}

export type Key = React.Key | null | undefined;

export type UseWithStateTyp<T, TReturn> = (
  item: T,
  setItem: Dispatch<SetStateAction<T>>
) => TReturn;

/* useWithState<T, UseStateArrayTyp<T>>(
    (item: T, setItem: Dispatch<SetStateAction<T>>) => {
      return [item, setItem];
    }
 */
export const useWithState = <T, TReturn>(
  useFn: UseWithStateTyp<T, TReturn>
) => {
  const useInter = (initialState: InitTyp<T>): TReturn => {
    const [item, setItem]: UseStateArrayTyp<T> = useState<T>(initialState);

    return useFn(item, setItem);
  };

  return useInter;
};

export type UseWithArrStateTyp<T, TReturn> = (
  items: T[],
  setItems: Dispatch<SetStateAction<T[]>>
) => TReturn;

export const useWithArrState = <T, TReturn>(
  useFn: UseWithArrStateTyp<T, TReturn>
) => {
  /* const useInter = (initialState: InitArray<T> = []): TReturn => {
    const [items, setItems]: UseStateArrayTyp<T[]> = useState<T[]>(initialState);

    return useFn(items, setItems);
  }; */

  //return useInter;
  return useWithState<T[], TReturn>(
    //(item: T[], setItem: Dispatch<SetStateAction<T[]>>) => useFn(item, setItem)
    useFn
  );
};

export const useStateArrayTyp = <T>(
  item: T,
  setItem: Dispatch<SetStateAction<T>>
): UseStateArrayTyp<T> => {
  //const [i, si]: UseStateArrayTyp<T> = [item, setItem];
  const ArrayTyp: UseStateArrayTyp<T> = [item, setItem];
  return ArrayTyp;
};

export const useTmpWithState = <T>() => {
  /* const useInter = (initialState: InitArray<T> = []): TReturn => {
    const [items, setItems]: UseStateArrayTyp<T[]> = useState<T[]>(initialState);

    return useFn(items, setItems);
  }; */

  const y1 = useWithState<number, UseStateArrayTyp<number>>(useStateArrayTyp),
    y = y1(3);
  const [i, m] = y;

  //return useInter;
  return useWithState<T, UseStateArrayTyp<T>>(
    (item: T, setItem: Dispatch<SetStateAction<T>>): UseStateArrayTyp<T> => {
      /* useFn(item, setItem) */
      const ArrayTyp: UseStateArrayTyp<T> = [item, setItem];
      return ArrayTyp;
    }
  );
};

function* abc<T>(arr: Array<T> = []) {
  const accumulator = [];
  for (var currentValue of arr) {
    currentValue = yield currentValue;
    accumulator.push(currentValue);
  }
  // do something with accumulator?
  yield accumulator;
}
