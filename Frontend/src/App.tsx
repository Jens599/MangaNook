import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";

import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Recommendation from "./pages/Recommendation";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/recommend" element={<Recommendation />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>,
  ),
);

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-react-app">
        <RouterProvider router={routes} />
      </ThemeProvider>
    </>
  );
};

export default App;
