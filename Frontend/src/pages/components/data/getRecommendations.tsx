import axios from "axios";
import { Manga } from "./FuseOperations";

interface recommendMangaTypes {
  id: string;
  similarity: string;
}

export const getRecommendations = async (
  query: Manga,
): Promise<recommendMangaTypes[]> => {
  const { manga_id } = query;
  const res = await axios.post("/operation/recommendManga", {
    query: manga_id,
  });

  return res.data;
};
