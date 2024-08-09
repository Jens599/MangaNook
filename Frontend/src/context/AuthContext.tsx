import { createContext, Dispatch, ReactNode, useReducer } from "react";

interface User {
  email: string;
  token: string;
}

type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export interface AuthContextType {
  state: User;
  dispatch: Dispatch<Action>;
}

export interface AuthContextProviderType {
  children: ReactNode;
}

const noUser: User = { email: "", token: "" };

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AuthReducer = (state: User, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return noUser;
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<AuthContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, noUser);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
