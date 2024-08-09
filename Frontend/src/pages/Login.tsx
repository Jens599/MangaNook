import { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import hero from "@/assets/Luffy.jpg";
import { useLogin } from "@/hooks/useLogin";

const Signup = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const { login } = useLogin();

  const { email, password } = fields;

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });

    console.log(fields);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Add your signup logic here
    console.log("Logging up", email, password);

    try {
      await login(email, password);
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="grid h-[80vh] gap-4 md:grid-cols-[2fr_1fr]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-10 w-[80%] border-b border-slate-700 py-4 text-center text-4xl font-bold">
          Log In
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid w-4/6 grid-cols-[1fr_3fr] items-center justify-center gap-6"
        >
          <label htmlFor="email" className="text-end">
            Email:
          </label>
          <input
            type="email"
            onChange={(e) => handleFieldChange(e)}
            name="email"
            className="px-2 py-2 text-black"
            placeholder="Enter your Email"
          />
          <label htmlFor="password" className="text-end">
            Password:
          </label>
          <input
            type="password"
            onChange={(e) => handleFieldChange(e)}
            name="password"
            className="px-2 py-2 text-black"
            placeholder="Enter your Password"
          />
          <button
            type="submit"
            className="col-span-2 rounded-md border py-4 font-black hover:bg-red-950"
          >
            Log In
          </button>
          <div className="col-span-full flex place-content-center gap-2">
            Don't have an account?
            <NavLink
              to="/signup"
              className="col-span-2 text-center text-blue-500 hover:underline"
            >
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
      <div className="hidden md:block">
        <img src={hero} className="size-full object-cover object-[76%]" />
      </div>
    </div>
  );
};

export default Signup;
