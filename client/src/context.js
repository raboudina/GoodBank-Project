import { createContext, useState } from "react";

const UserContext = createContext({
  loggedIn: null,
  isGoogleAccount: null,
  setIsGoogleAccount: () => {},
  setLoggedIn: () => {},
  name: null,
  setName: () => {},
  email: null,
  setEmail: () => {},
  balance: null,
  setBalance: () => {},
});

function Context({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);

  return (
    <UserContext.Provider
      value={{
        isGoogleAccount,
        setIsGoogleAccount,
        loggedIn,
        setLoggedIn,
        name,
        setName,
        email,
        setEmail,
        balance,
        setBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { Context, UserContext };
