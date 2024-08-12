import { useContext, useEffect, useState } from "react";
import { Data, fetchMultipleData } from "./components/data/Data";
import FlashCard from "./components/FlashCard";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const handleProfileChange = () => {};

  const [ids, setIds] = useState<number[] | null>(null);
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const { token } = authContext?.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  useEffect(() => {
    setIds([13, 2, 8, 6, 90]);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      if (ids && ids?.length !== 0) {
        try {
          console.log(`ids: ${ids}`);

          // Fetch data for up to 20 IDs
          const results = await fetchMultipleData(ids.slice(0, 3));

          setData(results);
        } catch (error) {
          console.error(`Error fetching data: ${error}`);
        } finally {
          setLoading(false);
        }
      }
    };

    getData();
  }, [ids]);

  return (
    <>
      <div className="border-b border-slate-700 py-8">
        <div className="flex items-center gap-10">
          <div
            className="flex size-32 items-center justify-center rounded-full bg-red-900"
            onClick={handleProfileChange}
          >
            <img
              src="https://api.dicebear.com/9.x/big-ears/svg?seed=Boo"
              className="size-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-black capitalize">Jenish Shrestha</h1>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-3 place-items-center">
        {loading ? (
          <div className="relative col-span-full flex h-96 w-full items-center justify-center">
            <div className="bottom-0 aspect-square w-16 animate-spin rounded-full border-8 border-b-8 border-white border-b-orange-500"></div>
          </div>
        ) : (
          data.slice(0, 3).map((d) => <FlashCard key={d.mal_id} data={d} />)
        )}
      </div>
    </>
  );
};

export default Profile;
