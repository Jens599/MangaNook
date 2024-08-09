import jsonData from "@/assets/title.json";
import Fuse, { FuseResult } from "fuse.js";

export interface manga {
  manga_id: number;
  title: string;
}

const FS = (query: string): FuseResult<manga>[] => {
  const fuse = new Fuse(jsonData, {
    keys: ["title"],
  });

  return fuse.search(query);
};

export default FS;
