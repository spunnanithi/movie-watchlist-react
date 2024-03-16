import { useEffect, useState } from "react";
import {
	Box,
	Container,
	Flex,
	Grid,
	Heading,
	Select,
	Skeleton,
} from "@chakra-ui/react";
import { fetchAllTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
	const [data, setData] = useState([]);
	const [mediaType, setMediaType] = useState("all");
	const [timeWindow, setTimeWindow] = useState("day");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchAllTrending(mediaType, timeWindow)
			.then((res) => {
				setData(res);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [timeWindow, mediaType]);

	// console.log("data", data);

	return (
		<Container
			maxW={{
				base: "container.sm",
				sm: "container.md",
				lg: "container.lg",
				xl: "container.xl",
			}}>
			<Flex justifyContent={"space-between"}>
				<Flex alignItems={"baseline"} gap={4} my={10}>
					<Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
						Trending {mediaType === "all" && "All Media Type"}
						{mediaType === "movie" && "Movies"}
						{mediaType === "tv" && "TV Shows"}
					</Heading>

					<Flex
						alignItems={"center"}
						gap={2}
						border={"2px solid teal"}
						borderRadius={"20px"}>
						<Box
							as="button"
							px={3}
							py={1}
							borderRadius={"20px"}
							bg={`${timeWindow === "day" ? "gray.600" : ""}`}
							onClick={() => setTimeWindow("day")}>
							Today
						</Box>
						<Box
							as="button"
							px={3}
							py={1}
							borderRadius={"20px"}
							bg={`${timeWindow === "week" ? "gray.600" : ""}`}
							onClick={() => setTimeWindow("week")}>
							This Week
						</Box>
					</Flex>
				</Flex>
				<Flex align={"center"}>
					<Select
						borderColor={"teal"}
						focusBorderColor="teal.500"
						w={"150px"}
						onChange={(e) => {
							setMediaType(e.target.value);
						}}>
						<option value="all">All</option>
						<option value="movie">Movies</option>
						<option value="tv">TV Shows</option>
					</Select>
				</Flex>
			</Flex>

			<Grid
				templateColumns={{
					base: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
					xl: "repeat(5, 1fr)",
				}}
				align={"center"}
				gap={5}>
				{data &&
					data.map((item, index) =>
						loading ? (
							<Skeleton height={350} key={index} />
						) : (
							<CardComponent
								key={item?.id}
								item={item}
								type={item?.media_type}
							/>
						)
					)}
			</Grid>
		</Container>
	);
};

export default Home;
