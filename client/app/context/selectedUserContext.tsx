
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { ContextProviderProps, UserType } from "~/types/globals.type";

type SelectedUserContextType = {
  selectedUser: UserType | undefined 
  setSelectedUser: Dispatch<SetStateAction<UserType | undefined>> 

}

export const SelectedUserContext = createContext<SelectedUserContextType | undefined>(undefined)

export function SelectedUserProvider({ children }: ContextProviderProps) {
  const [ selectedUser, setSelectedUser ] = useState<UserType | undefined>(undefined) 

  return (
    <SelectedUserContext value={{ selectedUser, setSelectedUser  }} >
      {children}
    </SelectedUserContext>
  )
}

export function useSelectedUser() {
  const context = useContext(SelectedUserContext);

  if (context === undefined) {
    throw new Error('useSelectedUser must be used within SelectedUserProvider');
  }
  
  return context;
}