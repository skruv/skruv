// TODO: To do this properly would require https://github.com/microsoft/TypeScript/issues/43826 as we need to always return a type with the generator/proxy but be able to set the original type (or any other type).
//@ts-ignore: TODO: TS thinks we want innerKey as a type?
export type State<T> = T & AsyncGenerator<T> & {[key in keyof T]: State<T[key]>} & {getGenerator: (innerKey: string|number) => State<T[innerKey]>, toJSON: () => T};
