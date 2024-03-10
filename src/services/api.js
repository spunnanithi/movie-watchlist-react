import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// TRENDING (Movies, TV Shows & People)
export const fetchAllTrending = async (timeWindow = "day") => {
	// * NOTE: timeWindow can be day or week * //
	const { data } = await axios.get(
		`${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
	);

	return data?.results;
};
