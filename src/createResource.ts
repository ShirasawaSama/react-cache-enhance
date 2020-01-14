import Cache from './Cache'
import { SUSPENSE, ERROR_NOT_A_PROMISE, PromiseReturned } from './constants'

export default <T extends (...args: any) => PromiseLike<any>, K = Parameters<T>[0], V = PromiseReturned<T>> (
  fetch: T,
  cache: Cache<K, V> = new Map<K, V>()
) => function () {
  const key = arguments[0]
  let v: any
  if (cache.has(key)) v = cache.get(key)
  else {
    v = fetch.apply(null, arguments as any)
    if (typeof v?.then !== 'function') throw new TypeError(ERROR_NOT_A_PROMISE)
    v[SUSPENSE] = true
    cache.set(key, v.then((r: any) => (cache.set(key, r), r)))
  }
  if (v?.[SUSPENSE]) throw v
  else return v
} as ((...args: Parameters<T>) => V)
