import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

type LoginContextType = {
  isLoginClicked: boolean;
  setIsLoginClicked: Dispatch<SetStateAction<boolean>>;
}

type LoginProviderProps = {
  children: ReactNode;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: LoginProviderProps) {
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