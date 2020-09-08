import { KeyValue } from '~/types/KeyValue'

export const groupBy = function <T> (arr: T[], key: keyof T): KeyValue<T[]> {
  return arr.reduce(function (groupper: KeyValue<T[]>, curr: any) {
    const groupperKey = curr[key]
    return {
      ...groupper,
      [groupperKey]: [...(groupper[groupperKey] || []), curr]
    }
  }, {} as KeyValue<T[]>)
}
