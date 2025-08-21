import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { ContextProviderProps } from '~/types/globals.type';

type TokenContextType = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: ContextProviderProps) {
  const [token, setToken] = useState("");
  
  return (
    <TokenContext value={{ token, setToken }}>
      {children}
    </TokenContext>
  );
}

export function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  
  return context;
}