import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import FS, { Manga } from "./data/FuseOperations";

const SearchBox = () => {
  const [query, setQuery] = useState<string>("");

  const [result, setResult] = useState<Manga[] | null>(null);

  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Debounce the query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const res = FS(debouncedQuery);
    if (res.length !== 0) setResult(res);
    else setResult(null);
  }, [debouncedQuery]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div className="relative mb-28 h-44 w-full">
      <div className="flex h-full w-full items-center justify-center gap-8 rounded-lg bg-slate-700 px-52">
        <Input
          type="text"
          placeholder="One Piece, Violet Evergarden"
          className="text-center"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="button"
          value="Search"
          className="w-80 cursor-pointer border-2 bg-slate-900 hover:bg-slate-800"
        />
      </div>
      {result && (
        <div className="absolute top-3/4 grid h-44 w-full place-items-center bg-slate-950">
          {result.slice(0, 3).map((manga) => (
            <div className="grid size-full place-items-center border">
              <div className="flex">{manga.title}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
