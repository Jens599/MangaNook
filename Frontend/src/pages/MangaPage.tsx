import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Data, noRateLimitFetch } from "./components/data/Data";

const MangaPage = () => {
  const { id } = useParams();
  const [mal_id] = useState<number>(parseInt(id as string));
  const [data, setData] = useState<Data | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Data = await noRateLimitFetch(mal_id);
        setData(data);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [mal_id]);

  return (
    <>
      <div className="container">
        {!error ? (
          <div className="">
            <div className="grid grid-cols-[auto,2fr] gap-16">
              <div className="max-h-[600px] overflow-hidden rounded-2xl">
                <img
                  className="h-full object-contain"
                  src={data?.images.large_image_url}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-5xl font-bold capitalize">
                  {data?.title}{" "}
                </div>
                <div className="border-b px-2 py-2 text-lg font-extralight">
                  {data?.title_japanese}
                </div>
                <div className="py-2 font-medium">Type: {data?.type}</div>
                <div className="flex flex-col gap-8">
                  <div className="text-sm">{data?.synopsis}</div>
                  <div className="text-sm">{data?.background}</div>
                </div>
                <div className="my-8 h-px bg-white"></div>
                <div className="text-sm">
                  Authors: {data?.authors.map((author) => author.name)}
                </div>
                <div className="text-sm">
                  Geners: {data?.genres.map((genre) => genre.name).join(", ")}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">Internal Server Error.</div>
        )}
      </div>
    </>
  );
};

export default MangaPage;
