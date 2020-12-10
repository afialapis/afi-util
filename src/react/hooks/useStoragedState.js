import {useState, /*useCallback,*/ useEffect} from 'react'

const getStorageKey = (key) => {
  if (process.env.BROWSER) {
    return `${encodeURIComponent(window.location.pathname)}_${key || ''}`
  }
  return undefined
}

const getPersisted = (key, defValue) => {
  if (process.env.BROWSER) {
    const k= getStorageKey(key)
    const v= localStorage.getItem(k)
    try {
      return JSON.parse(v)
    } catch(e) {
      return undefined
    }
  }
  return defValue
}

const setPersisted = (key, value) => {
  if (process.env.BROWSER) {
    const k= getStorageKey(key)

    localStorage.setItem(k, JSON.stringify(value))
  }  
}


const useStoragedState = (defValue, key) => {

  const [value, setValue]= useState(getPersisted(key, defValue))

  /*
    const setStoragedValue = useCallback((newValue) => {
      setPersisted(key, newValue)
      setValue(newValue)
    }, [key])

    return [value, setStoragedValue]
  
  */

  //
  // Returning and exposing setValue, we allow
  // to use functional setValue() too!
  //

  useEffect(() => {
    setPersisted(key, value)
  }, [key, value])

  /*
  const wrapSetValue = useCallback((nValue) => {
    setPersisted(key, typeof nValue =='function' ? nValue(value) : nValue)
    setValue(nValue)
  }, [key, value])*/

  return [value, setValue]
}

export {useStoragedState}