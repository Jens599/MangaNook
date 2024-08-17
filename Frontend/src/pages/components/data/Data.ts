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

// Define a delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Define a function to handle rate limiting
const rateLimitedFetch = async <T>(
  url: string,
  options?: object,
): Promise<T> => {
  await delay(333); // Wait for 333ms (1000ms / 3 requests = 333ms per request)
  const response = await axios.get<T>(url, options);
  return response.data;
};

// Function to fetch multiple pieces of data with rate limiting
export const fetchMultipleData = async (ids: number[]): Promise<Data[]> => {
  const apiURL = "https://api.jikan.moe/v4/manga/";
  const results: Data[] = [];

  for (const id of ids) {
    try {
      const url = `${apiURL}${id}`;
      const response = await rateLimitedFetch<ApiResponse>(url);
      const rawData = response.data; // Access the data property of ApiResponse

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

      results.push(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Error fetching data for ID ${id}: ${error.message}`);
      } else {
        console.error(`Unexpected error: ${error}`);
      }
      // Continue with the next request even if there was an error
    }
  }

  return results;
};
