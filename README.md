# react-cache-enhance ![npm](https://img.shields.io/npm/v/react-cache-enhance) ![GitHub](https://img.shields.io/github/license/Apisium/PureLauncher) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Highly customizable react-cache.

## Features

- Custom caching.
- Lightweight.
- TypeScript support.

## Install

```bash
npm install react-cache-enhance
```

## Usage

### createResource(fn: (...args) => Promise\<any>, cache?: Cache = Map): (...args) => any

> `cache`: default is **Map**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import createResource from 'react-cache-enhance'

const useData = createResource((time: number, data: string) => new Promise(resolve => setTimeout(resolve, time, data)))

const C: React.FC = () => <p>Text: {useData(5000, 'Hello World!')}</p>

ReactDOM.render(<React.Suspense fallback={'loading...'}><C /></React.Suspense>)
```

### createFetcher(fetcher?: fetch, cache?: Cache): (input: RequestInfo, init?: RequestInit, type?: string) => any

### useFetch(input: RequestInfo, init?: RequestInit, type?: string, fetcher?: fetch, cache?: Cache): any

```tsx
import { useFetch, createFetcher } from 'react-cache-enhance'

const C: React.FC = () => {
  const json = useFetch('http://example.com/a.json')
  const text = useFetch('http://example.com/a.json', { method: 'POST', body: 'a=1' }, 'text')

  return <>{json.title}: {text}</>
}
```

### usePromise(fn: () => Promise): any

```tsx
import { usePromise } from 'react-cache-enhance'

const C: React.FC = () => {
  const text = usePromise(() => new Promise(resolve => setTimeout(resolve, 5000, 'Hello World!')))
  return <>{text}</>
}
```

### useLoading(...args)

```ts
useLoading(
  fn: () => Promise,
  onError?: (error: any, promise: Promise) => any,
  initValue?: any | () => any,
  isFunction?: boolean // If initValue is a function, this must be true
): { loading: boolean, value: any, error: any }
```

```tsx
import { useLoading } from 'react-cache-enhance'

const C: React.FC = () => {
  const { loading, value } = useLoading(() => new Promise(resolve => setTimeout(resolve, 5000, 'Hello World!')))
  return <>{loading ? 'loading...' : value}</>
}
```

### Caches

#### LruCache

```ts
import { Lru } from 'react-cache-enhance'

new Lru()
new Lru(100) // Max cache items count
```

#### OneCache

> Only cache an item

```ts
import { OneCache } from 'react-cache-enhance'

const cache = new OneCache()
cache.key // Current key
cache.value // Current value
```

#### Custom

```ts
import { Cache } from 'react-cache-enhance'

class MyCache <K, V> implements Cache<K, V> {
  get (key: K): V | undefined { return undefined /* TODO */ }
  set (key: K, value: V): this { return this /* TODO */ }
  has (key: K): boolean { return false /* TODO */ }
}

## Author

Shirasawa

## License

[MIT](./LICENSE)
