import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { ContextProviderProps, UserType } from "~/types/globals.type";
import AuthService from '~/services/auth.service';

type AuthContextType = {
  user:  UserType | null
  setUser: Dispatch<SetStateAction<UserType | null>>
  handleLogout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<UserType | null>(null)

  async function handleLogout() {
    try {
      await AuthService.logout()
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