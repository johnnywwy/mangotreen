/// <reference types="vite/client" />

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>




export type FormError<T> = { [K in keyof typeof T]: string[] }