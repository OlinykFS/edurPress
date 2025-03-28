"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { getProtectedData, postLogout } from "@/services/api/apiRequests";
import { User } from "@/services/types";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  logoutAndRedirect: () => Promise<void>;
  hasRole: (role: string) => boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const updateUser = (data: User) => {
    const updatedUser: User = {
      id: Number(data.id),
      avatarUrl: data.avatarUrl || "",
      username: data.username || "",
      userBio: data.userBio || "",
      joinDate: data.joinDate || "",
      role: data.role || "",
      email: data.email || "",
    };
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const initAuth = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
      const fetchedUser: User = await getProtectedData();
      updateUser(fetchedUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.warn("Failed to initialize authentication:", error);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async () => {
    try {
      const fetchedUser: User = await getProtectedData();
      if (fetchedUser) {
        updateUser(fetchedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const logoutAndRedirect = async () => {
    await logout();
    router.push("/");
  };

  const hasRole = (role: string) => {
    return user?.role === role || false;
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      loading,
      user,
      login,
      logout,
      logoutAndRedirect,
      hasRole,
      setUser,
    }),
    [isAuthenticated, loading, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
