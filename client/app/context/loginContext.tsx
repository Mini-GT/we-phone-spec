import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { ContextProviderProps } from '~/types/globals.type';

type LoginContextType = {
  isLoginClicked: boolean;
  setIsLoginClicked: Dispatch<SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: ContextProviderProps) {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  
  return (
    <LoginContext value={{ isLoginClicked, setIsLoginClicked }}>
      {children}
    </LoginContext>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);

  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  
  return context;
}