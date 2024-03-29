import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// TRENDING (Movies, TV Shows & People)
export const fetchAllTrending = async (mediaType, timeWindow = "day") => {
	// * NOTE: timeWindow can be day or week * //
	const { data } = await axios.get(
		`${baseUrl}/trending/${mediaType}/${timeWindow}?api_key=${apiKey}`
	);

	return data?.results;
};

// MOVIES & TV SHOWS - Genres
export const fetchMoviesAndShowsGenres = async (mediaType) => {
	const res = await axios.get(
		`${baseUrl}/genre/${mediaType}/list?api_key=${apiKey}`
	);

	return res?.data;
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

// MOVIES & TV SHOWS - Videos
export const fetchMovieAndShowsVideos = async (mediaType, id) => {
	const res = await axios.get(
		`${baseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}`
	);

	return res?.data;
};

// MOVIES & TV SHOWS - Recommendations
export const fetchMoviesAndShowsRecommendations = async (mediaType, id) => {
	const res = await axios.get(
		`${baseUrl}/${mediaType}/${id}/recommendations?api_key=${apiKey}`
	);

	return res?.data;
};

// MOVIES - Discover
export const fetchMoviesDiscover = async (
	page,
	sortBy = "popularity.desc",
	genreId = ""
) => {
	const res = await axios.get(
		`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}&with_genres=${genreId}`
	);

	return res?.data;
};

// TV SHOWS - Discover
export const fetchShowsDiscover = async (
	page,
	sortBy = "popularity.desc",
	genreId = ""
) => {
	const res = await axios.get(
		`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}&with_genres=${genreId}`
	);

	return res?.data;
};

// SEARCH
export const fetchSearchData = async (query, page) => {
	const res = await axios.get(
		`${baseUrl}/search/multi?api_key=${apiKey}&page=${page}&query=${query}`
	);

	return res?.data;
};

// PEOPLE - Details
export const fetchPeopleDetails = async (id) => {
	const res = await axios.get(`${baseUrl}/person/${id}?api_key=${apiKey}`);

	return res?.data;
};

// PEOPLE - Images
export const fetchPeopleImages = async (id) => {
	const res = await axios.get(
		`${baseUrl}/person/${id}/images?api_key=${apiKey}`
	);

	return res?.data;
};

// PEOPLE - Combined Credits
export const fetchPeopleCombinedCredits = async (id) => {
	const res = await axios.get(
		`${baseUrl}/person/${id}/combined_credits?api_key=${apiKey}`
	);

	return res?.data;
};

// PEOPLE - Search
export const fetchPeopleSearch = async (name) => {
	const res = await axios.get(
		`${baseUrl}/search/person?api_key=${apiKey}&query=${name}`
	);

	return res?.data;
};
