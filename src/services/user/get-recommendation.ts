import { RecomendationTracks } from "@/@types/user/recomendations";
import { spotifyAxiosInstance } from "../spotify-instance";

interface RecommendationsQueryParams {
  limit: number;
  market: string;
  seed_artists: string;
  seed_genres: string;
  seed_tracks: string;
}

const getRecommendations = async (queryParams: RecommendationsQueryParams) => {
  const data = await spotifyAxiosInstance.get<RecomendationTracks>(`v1/recommendations`, {
    params: {
      limit: queryParams.limit ?? 10,
      market: queryParams.market,
      seed_artists: queryParams.seed_artists,
      seed_genres: queryParams.seed_genres,
      seed_tracks: queryParams.seed_tracks,
    },
  });
  return data;
};

export default getRecommendations;
