import { useState } from 'react'

export function useNestedFormState<T, P extends string>(initial: T) {
  const [data, setData] = useState<T>(initial)

  function setByPath(path: P, value: string | number | boolean) {
    setData(prev => {
      const newData = structuredClone(prev)
      const keys = path.split('.')
      let current: any = newData

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  return [data, setByPath] as const
}
