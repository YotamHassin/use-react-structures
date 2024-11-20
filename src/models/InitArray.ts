//

export type InitTyp<T> = T | (() => T);

export type InitArray<T> = InitTyp<T[]>;

export type CallbackFn<InTyp, OutTyp> = 
(previousValue: OutTyp, currentValue: InTyp, currentIndex: number, array: InTyp[]) => OutTyp;

