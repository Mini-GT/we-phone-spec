import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import type { ContextProviderProps, loginFormType, Smartphone } from "~/types/globals.type";
import AuthService from '~/services/auth.service';

type CurrentItemsContextType = {
  currentItems: Smartphone[],
  setCurrentItems: (items: Smartphone[]) => void,
}

export const CurrentItemsContext = createContext<CurrentItemsContextType | undefined>(undefined)

export function CurrentItemsProvider({ children }: ContextProviderProps) {
  const [currentItems, setCurrentItems] = useState<Smartphone[]>([]);
  
  return (
    <CurrentItemsContext value={{ currentItems, setCurrentItems }}>
      {children}
    </CurrentItemsContext>
  );
}

export function useCurrentItems() {
  const context = useContext(CurrentItemsContext);

  if (context === undefined) {
    throw new Error('useCurrentItems must be used within CurrentItemsProvider');
  }
  
  return context;
}