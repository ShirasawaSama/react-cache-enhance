export default interface Cache <K, V> {
  get (key: K): V | undefined
  set (key: K, value: V): any
  has (key: K): boolean
}
