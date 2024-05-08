import { ReactNode, createContext, useState } from "react";

interface UserContextProps {
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextProps>({
  isAuthenticated: false,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [logUser, setLogUser] = useState();

  const isAuthenticated = logUser !== null;

  const handleGetUser = async () => {
    try {
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
