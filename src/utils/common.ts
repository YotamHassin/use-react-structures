
export interface PipeArrFunc<TypIn, TypOut> extends Function {
  (...argsObject: TypIn[]): TypOut;
}

// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
export const uuidv4 = (): string => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
};

export type Direction = "Forward" | "Backward";

export type CurrentT<T> = {
  currentValue: T;
  previous?: CurrentT<T>;
  //next?: CurrentT<T>;
};

export interface CurrentNum extends CurrentT<number> {

};


export const useTriling =  <T, TCurrent extends CurrentT<T>>(
mainT: TCurrent
) => {
  var {
   currentValue, previous: previousParent
  } = mainT;
  previousParent = mainT;

  const add = (
    newT: TCurrent, direction: Direction
  ) => {
    if (direction == 'Forward') {
      newT.previous = previousParent;
      previousParent = newT;
    }
    else {}

    return newT;

  }

  const print = (
    ...args: any[]
  ) => {
    console.log(`print { currentValue, previous, next }`, { currentValue, previous: previousParent }, args);
    
  }

  return { add, print }

}

