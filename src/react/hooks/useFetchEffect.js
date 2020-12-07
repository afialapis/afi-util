import {useRef, useEffect} from 'react'

/*
  Not working yet!
*/

const useFetchEffect = (callback, _deps= []) => {
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    const fetchData = async () => {
      await callback(isMountedRef.current)
    }

    fetchData()

    return () => isMountedRef.current = false;
  }, [callback, /*...deps*/])

  return [isMountedRef.current]
}

export {useFetchEffect}

