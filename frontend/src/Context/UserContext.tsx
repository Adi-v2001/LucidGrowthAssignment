/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface user {
  email: string;
  name: string;
}

interface AuthContext {
  login: (userData: { email: string; password: string }) => Promise<void>;
  user: user | null;
  isLoggedIn: boolean;
  logout: () => void
}

const authContext = createContext<AuthContext>({
  login: async (_userData: { email: string; password: string }) => {},
  user: null,
  isLoggedIn: false,
  logout: () => {}
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<user | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("lucidJWT");
    if (!token) {
      navigate("/");
    }
  }, []);

  const login = async (userData: { email: string; password: string }) => {
    const res = await axios.post(
      `${process.env.BASE_URL}/api/user/login`,
      userData
    );
    if (res.data.status === 200) {
      setUser(res.data.newUserObject);
      localStorage.setItem("lucidJWT", res.data.newUserObject.token);
      setIsLoggedIn(true)
      toast({
        title: "Login Successfull",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: res.data.message,
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('lucidJWT')
    navigate('/')
    toast({
      title: 'Logged Out'
    })
  }

  return (
    <authContext.Provider value={{ login, user, isLoggedIn, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
