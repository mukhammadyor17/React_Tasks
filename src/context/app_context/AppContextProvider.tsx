import { createContext, useContext, type ReactNode } from 'react';
import { useCreateAppContext } from './AppContext';

interface AppContextProviderProps {
  children: ReactNode;
}

type AppContextType = ReturnType<typeof useCreateAppContext>;

const Context = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const context = useCreateAppContext();
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useAppContext = () => {
  const context = useContext(Context);
  return context;
};
