import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { ContextProviderProps, UserType } from "~/types/globals.type";

type UserContextType = {
  user: UserType | null
  setUser: Dispatch<SetStateAction<UserType | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: ContextProviderProps) {
  const [ user, setUser ] = useState<UserType | null>(null) 
  
  return (
    <UserContext value={{ user, setUser }} >
      {children}
    </UserContext>
  )
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  return context;
}