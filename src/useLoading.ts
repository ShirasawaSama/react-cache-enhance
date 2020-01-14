import { useState, useRef } from 'react'
import { ERROR_NOT_A_PROMISE, PromiseReturned } from './constants'

export default <T extends () => PromiseLike<any>, V = PromiseReturned<T>>
(fn: T, onError?: (e: any, promise: ReturnType<T>) => any, init: V | (() => V) = undefined, isFunction = false) => {
  const ref = useRef(false)
  const [value, setValue] = useState(ref.current && (isFunction ? (init as any)() : init))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  if (!ref.current) {
    ref.current = true
    const p = fn()
    if (typeof p?.then !== 'function') {
      setLoading(false)
      throw new TypeError(ERROR_NOT_A_PROMISE)
    }
    p.then(v => {
      setValue(v)
      setLoading(false)
    }, e => {
      setLoading(false)
      setError(e)
      if (typeof onError === 'function') return onError(e, p as any)
    })
  }
  return { loading, value, error }
}
