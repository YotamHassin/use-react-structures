// useChangeableState

import { InitTyp } from "../models/InitArray";
import { Dispatch, SetStateAction, useState } from "react";
import { UseStateArrayTyp, UseStateOnChange } from "./useStateTypes";

export function useChangeableState<T>(
  [value, setValueInter]: UseStateArrayTyp<T>,
  onChange?: Dispatch<SetStateAction<T>>
): UseStateOnChange<T> {

  const setValue: Dispatch<SetStateAction<T>> = (
    valueInter: SetStateAction<T>
  ) => {
    setValueInter(valueInter);

    if (onChange) {
      onChange(valueInter);
    }
  };

  return [value, setValue, setValueInter];
}

export function useChangeableStateInit<T>(
  initialState: InitTyp<T>,
  onChange?: Dispatch<SetStateAction<T>>
): UseStateOnChange<T> {
  const [value, setValueInter] = useState<T>(initialState);

  return useChangeableState([value, setValueInter], onChange);
}
