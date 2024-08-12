import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import FS, { Manga } from "./data/FuseOperations";

interface Props {
  handleSearchOperation: (query: Manga) => void;
}

const SearchBox = ({ handleSearchOperation }: Props) => {
  const [query, setQuery] = useState<string>("");

  const [result, setResult] = useState<Manga[] | null>(null);

  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  const [searchQuery, setSearchQuery] = useState<Manga>();

  const [q, setQ] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setQ(e.target.value);
  };

  const handleSet = (value: Manga) => {
    setQ(value.title);
    setQuery("");
    setSearchQuery(value);
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

  return (
    <div className="relative mb-10 h-44 w-full">
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-700">
        <form
          className="flex size-full items-center justify-center gap-8 px-52"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="text"
            placeholder="One Piece, Violet Evergarden"
            className="text-center"
            value={q}
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="button"
            value="Search"
            onClick={() => searchQuery && handleSearchOperation(searchQuery)}
            className="w-80 cursor-pointer border-2 bg-slate-900 hover:bg-slate-800"
          />
        </form>
      </div>
      {result && (
        <div className="absolute top-3/4 grid h-44 w-full place-items-center bg-slate-950">
          {result.slice(0, 4).map((manga) => (
            <div
              className="grid size-full cursor-pointer place-items-center border"
              key={manga.manga_id}
              onClick={() => handleSet(manga)}
            >
              <div className="flex">{manga.title}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
