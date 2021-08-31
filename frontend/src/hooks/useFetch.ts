import { useState, useEffect } from 'react'

interface useFetchInterface {
  data: any
  loading: boolean,
  error: null | Error
}

export const useFetch = (url: string, defaultState: any = { }) => {
  const [ state, setState ] = useState<useFetchInterface>({
    data: defaultState,
    loading: false,
    error: null
  });

  useEffect(() => {
    setState({...state, loading: true});
    fetch(url)
      .then(data => data.json())
      .then(data => setState({data, loading:false, error: null }))
      .catch((error: Error) => setState({data:[], error, loading: false }))
  }, [url])
  return [ state ];
}