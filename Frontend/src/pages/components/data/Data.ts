import axios from "axios";

// Define the new structure of the data
export interface Data {
  mal_id: number;
  images: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  title: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  synopsis: string;
  background: string;
  authors: { name: string }[];
  genres: { name: string }[];
}

// Define the structure of the raw response
interface ApiResponse {
  data: {
    mal_id: number;
    images: {
      [key: string]: unknown;
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    synopsis: string;
    background: string;
    authors: { [key: string]: unknown; name: string }[];
    genres: { [key: string]: unknown; name: string }[];
    [key: string]: unknown;
  };
}

// Function to fetch and transform data from the API
export const fetchData = async (id: number): Promise<Data> => {
  const apiURL = "https://api.jikan.moe/v4/manga/";
  try {
    const response = await axios.get<ApiResponse>(`${apiURL}${id}`);
    const rawData = response.data.data;

    // Transform rawData to match the Data interface
    const data: Data = {
      mal_id: rawData.mal_id,
      images: {
        image_url: rawData.images.webp.image_url,
        small_image_url: rawData.images.webp.small_image_url,
        large_image_url: rawData.images.webp.large_image_url,
      },
      title: rawData.title,
      title_japanese: rawData.title_japanese,
      title_synonyms: rawData.title_synonyms,
      type: rawData.type,
      synopsis: rawData.synopsis,
      background: rawData.background,
      authors: rawData.authors.map((author) => ({ name: author.name })),
      genres: rawData.genres.map((genre) => ({ name: genre.name })),
    };

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching data for ID ${id}: ${error.message}`);
    } else {
      console.error(`Unexpected error: ${error}`);
    }
    throw error;
  }
};
