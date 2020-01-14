import { useRef } from 'react'
import createResource from './index'
import Cache from './Cache'
import { ResponseTypes } from './constants'

export default (input: RequestInfo, init?: RequestInit, type?: ResponseTypes,
  fetcher = fetch, cache?: Cache<RequestInit, any>): any => {
  const ref = useRef<(input: RequestInfo, init?: RequestInit, type?: ResponseTypes,
    fetcher?: typeof fetch) => any>()
  if (!ref.current) {
    ref.current = createResource((input: RequestInfo, init?: RequestInit, type?: ResponseTypes,
      fetcher?: typeof fetch) =>
      fetcher(input, init).then((d: any) => type === 'raw' ? d.body : d[type || 'json']()), cache)
  }
  return ref.current(input, init, type, fetcher)
}
