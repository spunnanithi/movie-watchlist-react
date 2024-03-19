import { Container, Flex, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
	fetchMoviesAndShowsGenres,
	fetchMoviesDiscover,
} from "../../services/api";

import PaginationComponent from "../../components/PaginationComponent";
import GridComponent from "../../components/GridComponent";
import CustomHeading from "../../components/CustomHeading";
import useTitle from "../../hooks/useTitle";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [sortBy, setSortBy] = useState("popularity.desc");
	const [genreQuery, setGenreQuery] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [moviesData, genresData] = await Promise.all([
					fetchMoviesDiscover(activePage, sortBy, genreQuery),
					fetchMoviesAndShowsGenres("movie"),
				]);

				// Set Movies data
				setMovies(moviesData?.results);

				// Set Active Page data
				setActivePage(moviesData?.page);

				// Set Total Pages data
				setTotalPages(moviesData?.total_pages);

				// Set Genres data
				setGenres(genresData?.genres);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [activePage, sortBy, genreQuery]);

	// console.log(movies);
	// console.log(genres);
	// console.log(genreQuery);

	// Set the document title of page
	useTitle("Discover Movies");

	return (
		<Container
			maxW={{
				base: "container.sm",
				sm: "container.md",
				lg: "container.lg",
				xl: "container.xl",
			}}>
			<Flex justify={"space-between"}>
				<Flex alignItems={"baseline"} my={10}>
					<CustomHeading>Discover Movies</CustomHeading>
				</Flex>
				<Flex align={"center"} gap={4}>
					{/* SELECT FOR POPULARITY */}
					<Select
						borderColor={"teal"}
						focusBorderColor="teal.500"
						w={"130px"}
						onChange={(e) => {
							setActivePage(1);
							setSortBy(e.target.value);
						}}>
						<option value="popularity.desc">Popular</option>
						<option value="vote_average.desc&vote_count.gte=500">
							Top Rated
						</option>
					</Select>

					{/* SELECT FOR GENRES */}
					<Select
						placeholder="Select a genre"
						borderColor={"teal"}
						focusBorderColor="teal.500"
						w={"200px"}
						onChange={(e) => {
							setActivePage(1);
							setGenreQuery(e.target.value);
						}}>
						{genres?.map((genre) => (
							<option key={genre?.id} value={genre?.id?.toString()}>
								{genre?.name}
							</option>
						))}
					</Select>
				</Flex>
			</Flex>

			<GridComponent data={movies} loading={loading} mediaType={"movie"} />

			{/* Pagination */}
			<PaginationComponent
				activePage={activePage}
				totalPages={totalPages}
				setActivePage={setActivePage}
			/>
		</Container>
	);
};

export default Movies;
