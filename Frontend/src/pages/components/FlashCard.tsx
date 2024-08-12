import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Data } from "./data/Data";

interface FlashCardProps {
  data: Data;
}

const FlashCard = ({ data }: FlashCardProps) => {
  return (
    <Card className="flex min-h-[527px] w-72 cursor-pointer flex-col transition-transform hover:scale-105">
      <CardHeader className="">
        <CardTitle className="max-h-8">{data.title} </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-center justify-around gap-4 overflow-hidden text-xs">
        <div className="relative flex flex-grow items-center justify-center isolate">
          <img
            src={data.images.image_url}
            className="absolute size-full object-cover opacity-45 scale-y-[80%] blur -z-10"
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
