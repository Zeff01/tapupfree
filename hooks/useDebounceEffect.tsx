import { useEffect, DependencyList } from 'react';

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  const dependency = deps ? deps : ([] as const as any);

  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, dependency);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
