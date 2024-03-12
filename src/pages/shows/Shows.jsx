import {
	Container,
	Heading,
	Grid,
	Skeleton,
	Flex,
	Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchShowsDiscover } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Shows = () => {
	const [shows, setShows] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [sortBy, setSortBy] = useState("popularity.desc");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchShowsDiscover(activePage, sortBy)
			.then((res) => {
				setShows(res?.results);
				setActivePage(res?.page);
				setTotalPages(res?.total_pages);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, [activePage, sortBy]);

	// console.log(shows);

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
					Discover TV Shows
				</Heading>

				<Select
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
				{shows &&
					shows.map((item, index) =>
						loading ? (
							<Skeleton height={350} key={index} />
						) : (
							<CardComponent key={item?.id} item={item} type={"tv"} />
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

export default Shows;
