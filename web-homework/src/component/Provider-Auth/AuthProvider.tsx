import { ReactNode, useEffect, useState } from "react";
import { User } from "../../models/user";
import { authContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userState, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setTimeout(() => {}, 10000);
      setUser(new User("uid", "email", "name", new Date(2002, 6, 1), 40));
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logout = () => {
    //inserrt firebase function here
    setUser(undefined);
  };

  const login = () => {
    setUser(new User("uid", "email", "name", new Date(2002, 6, 1), 40));
  };

  return (
    <authContext.Provider
      value={{ user: userState, logout: logout, login: login }}
    >
      {loading ? <div>loading</div> : children}
    </authContext.Provider>
  );
}

export default AuthProvider;
