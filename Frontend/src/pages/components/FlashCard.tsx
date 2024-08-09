import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Data } from "./data/Data";

interface FlashCardProps {
  data: Data;
}

const FlashCard = ({ data }: FlashCardProps) => {
  return (
    <Card className="w-72 cursor-pointer transition-transform hover:scale-105">
      <CardHeader>
        <CardTitle className="max-h-8">{data.title} </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 overflow-hidden text-xs">
        <img
          src={data.images.image_url}
          className="w-full rounded-md object-cover"
        />
        <div className="">
          <div className="text-[10px] font-extralight text-orange-300">
            {data.title_japanese}
          </div>
          <div className="line-clamp-1">{data.synopsis}</div>
        </div>
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
      </CardContent>
    </Card>
  );
};

export default FlashCard;
