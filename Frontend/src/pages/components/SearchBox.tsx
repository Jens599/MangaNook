import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import FS, { manga } from "./data/FuseOperations";
import { FuseResult } from "fuse.js";
import React from "react";

const SearchBox = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<FuseResult<manga>[] | null>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    console.log(query, result);
  };

  useEffect(() => {
    setResult(FS(query));
  }, [query]);

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
      {result?.length ? (
        <div className="absolute top-3/4 flex h-44 w-full bg-slate-950">
          <div className="grid w-full place-items-center text-white">
            {result.slice(0, 3).map((item) => (
              <React.Fragment key={item.item.manga_id}>
                <div className="flex size-full items-center justify-center border text-xl">
                  {item.item.title}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
