import SearchBox from "./components/SearchBox";
import FlashCard from "@/pages/components/FlashCard";
import { useEffect, useState } from "react";
import { Data, fetchData } from "./components/data/Data";

const Recommendation = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const ids = [22, 13, 26, 36, 95, 102, 15, 80, 9];

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const promises = ids.map((id) => fetchData(id));

        const results = await Promise.allSettled(promises);

        const resolvedResults = results.filter(
          (result) => result.status === "fulfilled",
        ) as PromiseFulfilledResult<Data>[];

        setData(resolvedResults.map((result) => result.value));

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="relative h-96 w-full">
          <div className="absolute bottom-0 right-1/2 aspect-square w-16 animate-spin rounded-full border-8 border-b-8 border-white border-b-orange-500"></div>
        </div>
      ) : (
        <>
          <SearchBox />

          <div className="grid place-items-center gap-y-4 font-[inter] text-sm md:grid-cols-2 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((m) => (
              <FlashCard key={m.mal_id} data={m} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Recommendation;
