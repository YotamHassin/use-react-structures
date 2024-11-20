import { ChangeEvent, ChangeEventHandler } from "react";

export const array_move = <Typ>(arr: Typ[], old_index = 0, new_index = 0) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined!);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

export type ValueTypKey<Typ> = {
  value: Typ;
  key: number;
};

