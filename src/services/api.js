import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

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

// MOVIES & TV SHOWS - Details
export const fetchMovieAndShowsDetails = async (mediaType, id) => {
	const res = await axios.get(
		`${baseUrl}/${mediaType}/${id}?api_key=${apiKey}`
	);

	return res?.data;
};

// MOVIES & TV SHOWS - Credits
export const fetchMovieAndShowsCredits = async (mediaType, id) => {
	const res = await axios.get(
		`${baseUrl}/${mediaType}/${id}/credits?api_key=${apiKey}`
	);

	return res?.data;
};
