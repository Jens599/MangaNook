import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    await axios
      .post("/user/signup", { name, email, password })
      .then((res) => {
        console.log(res.data);
        authContext?.dispatch({ type: "LOGIN", payload: res.data });
      })
      .catch((err) => {
        setError(err.message || "An error occurred during signup");
        console.log("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { signup, isLoading, error };
};
