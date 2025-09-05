import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { ContextProviderProps } from '~/types/globals.type';

type AccessTokenContextType = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<null>>;
}

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(undefined);

export function AccessTokenProvider({ children }: ContextProviderProps) {
  const [accessToken, setAccessToken] = useState(null);
  
  return (
    <AccessTokenContext value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext>
  );
}

export function useAccessToken() {
  const context = useContext(AccessTokenContext);

  if (context === undefined) {
    throw new Error('useAccessToken must be used within a AccessTokenProvider');
  }
  
  return context;
}