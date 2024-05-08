import { ReactNode, createContext, useState } from "react";
import axios from "axios";
import { GET } from "@/app/api/users/route";

interface UserContextProps {
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextProps>({
  isAuthenticated: false,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [logUser, setLogUser] = useState("");

  const isAuthenticated = logUser !== null;

  const handleGetUser = async (id: string) => {
    try {
      const data = await axios.get(`/api/users/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
