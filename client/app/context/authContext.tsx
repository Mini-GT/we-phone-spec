import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import type { ContextProviderProps, UserMenuProps } from "~/types/globals.type";
import AuthService from '~/services/auth.service';

type AuthContextType = {
  user: Omit<UserMenuProps, "userId"> | undefined,
  isLoading: boolean,
  error: Error | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: ContextProviderProps) {
  const { data: user, isLoading, error } = useQuery({
    queryFn: () => AuthService.getMe(),
    queryKey: ["user"],
  })
  
  return (
    <AuthContext value={{ user, isLoading, error }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}