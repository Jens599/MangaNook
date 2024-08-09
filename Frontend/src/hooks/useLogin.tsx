import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useContext, useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    await axios
      .post("/user/login", { email, password })
      .then((res) => {
        console.log(res.data);
        authContext?.dispatch({ type: "LOGIN", payload: res.data });
      })
      .catch((err) => {
        setError(err.message || "An error occurred during login");
        console.log("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { login, isLoading, error };
};
