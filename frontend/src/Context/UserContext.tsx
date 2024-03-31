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
}

const authContext = createContext<AuthContext>({
  login: async (_userData: { email: string; password: string }) => {},
  user: null,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<user | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("lucidJWT");
    if (!token) {
      navigate("/");
    }
  }, []);

  const login = async (userData: { email: string; password: string }) => {
    const res = await axios.post(
      "http://localhost:5000/api/user/login",
      userData
    );
    if (res.data.status === 200) {
      setUser(res.data.newUserObject);
      localStorage.setItem("lucidJWT", res.data.newUserObject.token);
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
  return (
    <authContext.Provider value={{ login, user }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
