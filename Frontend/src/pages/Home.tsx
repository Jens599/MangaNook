import { NavLink } from "react-router-dom";
import hero from "../assets/hero.png";

const Home = () => {
  return (
    <>
      <div className="container my-6 grid w-full grid-cols-2 gap-4 rounded-xl">
        <div className="flex flex-col items-start justify-center font-[poppins]">
          <span className="text-4xl font-black">MangaNook:</span> <br />
          <span className="mt-3 text-2xl">
            Your Gateway to Endless Manga Adventures!
          </span>
          <p className="mt-2 text-slate-400">
            Unlock a world of endless manga adventures with
            MangaNook—personalized recommendations at your fingertips. Start
            your journey and find your next obsession!
          </p>
          <div className="mt-6 w-full">
            {true && (
              <button className="rounded-lg bg-slate-800 px-5 py-3 outline-1 hover:bg-slate-700 hover:outline">
                <NavLink to="/signup">Get Started!</NavLink>
              </button>
            )}
          </div>
        </div>
        <div className="h-[83vh] overflow-hidden">
          <img src={hero} className="h-full w-full object-contain" />
        </div>
      </div>
    </>
  );
};

export default Home;
