import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Data } from "./data/Data";
import { useNavigate } from "react-router-dom";

interface FlashCardProps {
  data: Data;
}

const FlashCard = ({ data }: FlashCardProps) => {
  const navigate = useNavigate();
  const gotoMangaPage = () => {
    navigate(`/manga/${data.mal_id}`);
  };

  return (
    <Card
      onClick={gotoMangaPage}
      className="flex min-h-[527px] w-72 cursor-pointer flex-col transition-transform hover:scale-105"
    >
      <CardHeader className="">
        <CardTitle className="max-h-8">{data.title} </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-center justify-around gap-4 overflow-hidden text-xs">
        <div className="relative isolate flex flex-grow items-center justify-center">
          <img
            src={data.images.image_url}
            className="absolute -z-10 size-full scale-y-[80%] object-cover opacity-45 blur"
          />
          <img
            src={data.images.image_url}
            className="w-full rounded-md object-scale-down"
          />
        </div>
        <div className="">
          <div className="text-[10px] font-extralight text-orange-300">
            {data.title_japanese}
          </div>
          <div className="line-clamp-1">{data.synopsis}</div>
          <div className="flex gap-2">
            {data.genres.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="whitespace-nowrap rounded-md bg-red-900 px-2 py-1"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashCard;
