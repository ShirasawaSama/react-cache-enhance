export const SUSPENSE = Symbol('Suspense')
export const ERROR_NOT_A_PROMISE = 'Fetcher should return a Promise!'
export type ResponseTypes = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text' | 'raw'
export type PromiseReturned <T> = T extends (...args: any) => Promise<infer R> ? R : never
