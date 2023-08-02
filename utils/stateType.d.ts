// TODO: To do this properly would require https://github.com/microsoft/TypeScript/issues/43826 as we need to always return a type with the generator/proxy but be able to set the original type (or any other type).
//@ts-ignore: TODO: TS thinks we want innerKey as a type?
export type State<T> = T & AsyncGenerator<T> & {[key in keyof T]: State<T[key]>} & {getGenerator: (innerKey: string|number) => State<T[innerKey]>, toJSON: () => T};

export type Events<T> = {[key in keyof GlobalEventHandlersEventMap]: ((e: (GlobalEventHandlersEventMap[key] & {currentTarget: T})) => {})} & {[key in keyof ElementEventMap]: ((e: (ElementEventMap[key] & {currentTarget: T})) => {})}

export type EventsForHTMLInputElement = Events<HTMLInputElement>

type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

type MutableProps<T> = {
    [P in keyof T]-?: IfEquals<
      { [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];

type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P]
}

type MutablePropsOfThingy<T> = MutableProps<T>;
type Props<T> = PickByType<Pick<T, MutablePropsOfThingy<T>>, string | number | boolean>

export type input = Props<HTMLInputElement>
