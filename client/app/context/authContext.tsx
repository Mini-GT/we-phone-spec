import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import type { ContextProviderProps, loginFormType, UserMenuProps } from "~/types/globals.type";
import AuthService from '~/services/auth.service';

type AuthContextType = {
  user: Omit<UserMenuProps, "userId"> | undefined,
  isLoading: boolean,
  error: Error | null,
  handleLogout: () => Promise<void>,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: ContextProviderProps) {
  const queryClient = useQueryClient()

  const { data: user, isLoading, error } = useQuery({
    queryFn: () => AuthService.getMe(),
    queryKey: ["user"],
  })

  async function handleLogout() {
    try {
      await AuthService.logout()
      queryClient.clear()
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }
  
  return (
    <AuthContext value={{ user, isLoading, error, handleLogout }}>
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