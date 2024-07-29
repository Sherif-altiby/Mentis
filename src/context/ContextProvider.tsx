import React, { createContext, ReactNode, useState, useContext } from 'react';

interface MyProviderProps {
  children: ReactNode;
}

interface MyContextType {
  token: string | null;
  setToken: (token: string) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const appContext = createContext<MyContextType | null>(null);

export const ContextProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('mentisID'));

  const setToken = (token: string) => {
    localStorage.setItem('mentisID', token);
    setTokenState(token);
  };

  const [loading, setLoading] = useState(false)

  return (
    <appContext.Provider value={{ token, setToken, loading, setLoading }}>
      {children}
    </appContext.Provider>
  );
};

export default ContextProvider;

export const useAppContext = (): MyContextType => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};
