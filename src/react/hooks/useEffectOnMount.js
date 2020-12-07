import {useRef, useEffect} from 'react'

/*
  callback MUST BE an useCallback'ed function!

*/

const useEffectOnMount = (callback) => {
  const isMountedRef = useRef(null)

  useEffect(() => {
    if (!isMountedRef.current) {
      callback()
    }

    isMountedRef.current = true

    return () => isMountedRef.current = false
  }, [callback])

}

export {useEffectOnMount}

