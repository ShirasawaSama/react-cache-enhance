import createResource from './createResource'
import createFetcher from './createFetcher'
import usePromise from './usePromise'
import useLoading from './useLoading'
import useFetch from './useFetch'
import OneCache from './OneCache'
import Lru, { L } from './Lru'
import Cache from './Cache'

export default createResource
export * from './constants'
export { createFetcher, createResource, useFetch, OneCache, usePromise, useLoading, Lru, Cache, L }
