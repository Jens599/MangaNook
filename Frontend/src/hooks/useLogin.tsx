import { AuthContext } from "@/context/AuthContext";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { useContext, useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse = await axios.post("/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        authContext?.dispatch({ type: "LOGIN", payload: response.data });
      }
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        console.error(e.response?.data.error);
        setError(e.response?.data.error);
      } else {
        const errorMessage = "An unexpected error occurred";
        console.error(errorMessage);
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
