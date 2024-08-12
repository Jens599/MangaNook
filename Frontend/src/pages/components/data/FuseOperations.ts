import jsonData from "@/assets/title.json";
import Fuse from "fuse.js";

export interface Manga {
  manga_id: number;
  title: string;
}

const FS = (query: string): Manga[] => {
  const fuse = new Fuse(jsonData, {
    keys: ["title"],
    threshold: 0.3,
  });

  // Search for matches
  const searchResults = fuse.search(query);

  // Map the search results to Manga array, if results are found
  const result: Manga[] = searchResults.map((result) => result.item as Manga);

  return result;
};

export default FS;
