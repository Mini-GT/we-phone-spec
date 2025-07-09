import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { ContextProviderProps, UserType } from "~/types/globals.type";

type UserContextType = {
  user: UserType | undefined
  setUser: Dispatch<SetStateAction<UserType | undefined>>

}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: ContextProviderProps) {
  const [ user, setUser ] = useState<UserType | undefined>({
    name: "",
    email: "",
    status: "unverified",
    role: "USER"
  }) 

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