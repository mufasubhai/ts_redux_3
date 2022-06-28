import '../styles/globals.css'
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from 'src/app/store';
function MyApp({
  Component, pageProps,
}: AppProps) {
  
  const [stateSet, setStateSet ] = useState(false)



  useEffect(() => {

    if (window && !stateSet) {
      window.getState = store.getState
      setStateSet(true)
      // initCosmos()
    //  index.main()

      // sqlQuery.clientDataPull()
      // testQuery()
    }
  
  }, [store])
  return (
    <Provider store={store}>
      {/* {console.log(pageProps)} */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;