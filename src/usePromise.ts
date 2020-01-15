import { useRef } from 'react'
import { SUSPENSE, ERROR_NOT_A_PROMISE, PromiseReturned } from './constants'

export default <T extends () => PromiseLike<any>> (fn: T): PromiseReturned<T> => {
  const ref = useRef<any>()
  if (!ref.current) {
    const p = fn()
    if (p && typeof p.then !== 'function') throw new TypeError(ERROR_NOT_A_PROMISE)
    ;(ref.current = p.then((r: any) => (ref.current = r)) as any)[SUSPENSE] = true
  }
  if (ref.current && ref.current[SUSPENSE]) throw ref.current
  else return ref.current
}
