// useState

import { Dispatch, SetStateAction, useState } from "react";

/* 
export const  fn = ([val, setVal]: UseStateArrayTyp<number>) => val;
fn(useState(5))
*/
export type UseStateArrayTyp<T> = [T, Dispatch<SetStateAction<T>>];

export type UseStateOnChange<T> = [
  ...UseStateArrayTyp<T>,
  Dispatch<SetStateAction<T>>
];
