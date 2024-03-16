import {
	Container,
	Heading,
	Grid,
	Skeleton,
	Flex,
	Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
	fetchMoviesAndShowsGenres,
	fetchMoviesDiscover,
} from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

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
	console.log(genreQuery);

	return (
		<Container
			maxW={{
				base: "container.sm",
				sm: "container.md",
				lg: "container.lg",
				xl: "container.xl",
			}}>
			<Flex alignItems={"baseline"} gap={4} my={10}>
				<Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
					Discover Movies
				</Heading>

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
					<option value="vote_average.desc&vote_count.gte=1000">
						Top Rated
					</option>
				</Select>

				{/* SELECT FOR GENRES */}
				<Select
					placeholder="Select a genre"
					borderColor={"teal"}
					focusBorderColor="teal.500"
					w={"170px"}
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

			<Grid
				templateColumns={{
					base: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
					xl: "repeat(5, 1fr)",
				}}
				gap={5}>
				{movies &&
					movies.map((item, index) =>
						loading ? (
							<Skeleton height={350} key={index} />
						) : (
							<CardComponent key={item?.id} item={item} type={"movie"} />
						)
					)}
			</Grid>

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
