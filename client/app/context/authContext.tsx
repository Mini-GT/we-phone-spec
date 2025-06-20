import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { ContextProviderProps, loginFormType, UserMenuProps } from "~/types/globals.type";
import AuthService from '~/services/auth.service';

type AuthContextType = {
  user:  UserMenuProps | null
  // isLoading: boolean,
  // error: Error | null,
  setUser: Dispatch<SetStateAction<UserMenuProps | null>>
  handleLogout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<UserMenuProps | null>(null)
  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  // const queryClient = useQueryClient()

  // const { data: user, isLoading, error } = useQuery({
  //   queryFn: () => AuthService.getMe(),
  //   queryKey: ["user"],
  //   staleTime: 1000 * 60 * 1, // keeps data fresh for 1 minute
  //   refetchOnWindowFocus: false, // dont refetch on tab switch
  // })

  async function handleLogout() {
    try {
      await AuthService.logout()
      // queryClient.clear()
      localStorage.removeItem("user")
      setUser(null)
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }
  
  return (
    <AuthContext value={{ user, setUser, handleLogout }}>
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