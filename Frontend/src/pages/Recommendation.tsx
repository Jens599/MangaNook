import SearchBox from "./components/SearchBox";
import FlashCard from "@/pages/components/FlashCard";
import { useEffect, useState } from "react";
import { Data, fetchMultipleData } from "./components/data/Data";
import { Manga } from "./components/data/FuseOperations";
import { getRecommendations } from "./components/data/getRecommendations";

const Recommendation = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ids, setIds] = useState<number[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const handleSearch = async (query: Manga) => {
    setIds([]);
    setSearchTitle(query.title);
    const recommendations = await getRecommendations(query);
    recommendations.map((recommendation) =>
      setIds((ids) => [...ids, parseInt(recommendation.id)]),
    );
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const results = await fetchMultipleData(ids.slice(0, 12));

        setData(results);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [ids]);

  return (
    <>
      {loading ? (
        <div className="relative h-96 w-full">
          <div className="absolute bottom-0 right-1/2 aspect-square w-16 animate-spin rounded-full border-8 border-b-8 border-white border-b-orange-500"></div>
        </div>
      ) : (
        <>
          <SearchBox handleSearchOperation={handleSearch} />
          {searchTitle && (
            <h1 className="my-10 text-4xl font-black capitalize">
              {searchTitle}
            </h1>
          )}
          <div className="flex flex-col">
            <div className="grid place-items-center gap-y-4 font-[inter] text-sm md:grid-cols-2 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((m) => (
                <FlashCard key={m.mal_id} data={m} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Recommendation;
