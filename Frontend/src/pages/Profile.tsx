import { useEffect, useState } from "react";
import { Data, fetchData } from "./components/data/Data";
import FlashCard from "./components/FlashCard";

const Profile = () => {
  const handleProfileChange = () => {};

  const [ids, setIds] = useState<number[] | null>(null);
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIds([13, 2, 8, 6, 90]);
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (!ids) return;

      setLoading(true);
      try {
        const promises = ids.map((id) => fetchData(id));

        const results = await Promise.allSettled(promises);

        const resolvedResults = results.filter(
          (result) => result.status === "fulfilled",
        ) as PromiseFulfilledResult<Data>[];

        if (resolvedResults.length > 0) {
          setData(resolvedResults.map((result) => result.value));
          setLoading(false);
        } else {
          console.error("All promises failed.");
        }
      } catch (error) {
        console.error(error);
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
