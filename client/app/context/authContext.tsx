import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { ContextProviderProps, loginFormType, User } from "~/types/globals.type";
import AuthService from '~/services/auth.service';
import userService from "~/services/user.service";

type AuthContextType = {
  user:  User | null
  // isLoading: boolean,
  // error: Error | null,
  setUser: Dispatch<SetStateAction<User | null>>
  handleLogout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
  let isMounted = true;

  const fetchUser = async () => {
    try {
      const savedUser = localStorage.getItem("user")

      // refetch if no user
      if (!savedUser) {
        const res = await userService.getMe();
          setUser(res)
          localStorage.setItem("user", JSON.stringify(res))
      }

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      if (isMounted) console.error("Error fetching user:", err);
    }
  };
  fetchUser();
}, []);
  
  // useEffect(() => {
  //   // let isMounted = true;

  //   // const fetchUser = async () => {
  //   //   try {
  //       const savedUser = localStorage.getItem("user")

  //       // handle OAuth login
  //   //     if (!savedUser) {
  //   //       const userData = await userService.getMe()
  //   //       // if (isMounted) {
  //   //         // setUser(userData)
  //   //         localStorage.setItem("user", JSON.stringify(userData))
  //   //       // }
  //   //     }
  //   //   } catch (error) {
  //   //     console.error(error)
  //   //   }
  //   // }

  //   // fetchUser()

  //   // return () => {
  //   //   isMounted = false
  //   // }
  // }, [])

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