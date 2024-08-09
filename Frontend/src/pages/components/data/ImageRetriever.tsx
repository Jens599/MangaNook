import axios from "axios";

const baseUrl = "https://api.jikan.moe/v4/manga/";

interface MangaData {
  images: {
    webp: {
      image_url: string;
    };
  };
}

const getImageUrl = async (id: number): Promise<string> => {
  try {
    const response = await axios.get(`${baseUrl}${id}`);
    const data = response.data.data as MangaData;
    return data.images.webp.image_url;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    throw new Error("Failed to fetch image URL");
  }
};

export default getImageUrl;
