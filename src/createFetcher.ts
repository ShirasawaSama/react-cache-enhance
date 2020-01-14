import createResource from './createResource'
import Cache from './Cache'
import { ResponseTypes } from './constants'

export default (fetcher = fetch, cache?: Cache<RequestInfo, any>) =>
  createResource((input: RequestInfo, init?: RequestInit, type?: ResponseTypes) =>
    fetcher(input, init).then((d: any) => type === 'raw' ? d.body : d[type || 'json']()), cache)
