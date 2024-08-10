import axios, { AxiosResponse, isAxiosError } from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse = await axios.post("/user/signup", {
        name,
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

  return { signup, isLoading, error };
};
