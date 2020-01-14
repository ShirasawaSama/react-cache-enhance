import Cache from './Cache'

const NULL = Symbol('Null')
export default class OneCache <K, V> implements Cache<K, V> {
  public key: K = NULL as any
  public value: V

  public has (key: K) { return key === this.key }

  public get (key: K) { return this.has(key) ? this.value : null }

  public set (key: K, value: V) {
    this.key = key
    this.value = value
    return this
  }

  public delete (key: K) {
    if (!this.has(key)) return false
    this.key = NULL as any
    this.value = null
    return true
  }
}
