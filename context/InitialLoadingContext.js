import React from 'react';
import {createContext, useContext, useState} from 'react';

const InitialLoadingContext = createContext({
  loading: true,
  setLoading: boolean => {},
});

export const InitialLoadingProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  return (
    <InitialLoadingContext.Provider value={{loading, setLoading}}>
      {children}
    </InitialLoadingContext.Provider>
  );
};

export const useInitialLoading = () => useContext(InitialLoadingContext);
