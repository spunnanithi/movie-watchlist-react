import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchMovieAndShowsCredits,
	fetchMovieAndShowsDetails,
	imagePath,
	imagePathOriginal,
} from "../services/api";
import {
	Badge,
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Container,
	Flex,
	Heading,
	Image,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon } from "@chakra-ui/icons";
import { ratingToPercentage, resolveRatingColor } from "../utils/helpers";

const Details = () => {
	const { type, id } = useParams();

	const [details, setDetails] = useState({});
	const [cast, setCast] = useState([]);
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	setLoading(true);
	// 	fetchMovieAndShowsDetails(type, id)
	// 		.then((res) => {
	// 			setDetails(res);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		})
	// 		.finally(() => {
	// 			setLoading(false);
	// 		});

	// 	fetchMovieAndShowsCredits(type, id)
	// 		.then((res) => {
	// 			setCredits(res);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		})
	// 		.finally(() => {
	// 			setLoading(false);
	// 		});
	// }, [id, type]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [detailsData, creditsData] = await Promise.all([
					fetchMovieAndShowsDetails(type, id),
					fetchMovieAndShowsCredits(type, id),
				]);

				// Set Details data
				setDetails(detailsData);

				// Set Cast data
				setCast(creditsData?.cast);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [type, id]);

	// console.log(details);
	// console.log(cast);

	const title = details?.name || details?.title;
	const releaseDate = details?.first_air_date || details?.release_date;

	if (loading) {
		return (
			<Flex justifyContent={"center"} alignContent={"center"}>
				<Spinner size={"xl"} color="red" />
			</Flex>
		);
	}

	return (
		<Box>
			{/* Background Image */}
			<Box
				background={`linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url(${imagePathOriginal}${details.backdrop_path})`}
				backgroundRepeat={"no-repeat"}
				backgroundSize={"cover"}
				backgroundPosition={"center"}
				width={"100%"}
				height={{ base: "auto", md: "500px" }}
				py={2}
				zIndex={-1}
				display={"flex"}
				alignItems={"center"}>
				{/* Main Content */}
				<Container maxW={"container.xl"}>
					<Flex
						alignItems={"center"}
						gap={10}
						flexDirection={{ base: "column", md: "row" }}>
						{/* Movie Poster Image */}
						<Image
							height={"450px"}
							borderRadius={"sm"}
							src={`${imagePath}${details?.poster_path}`}
						/>

						<Box>
							{/* Title & Year */}
							<Heading fontSize={"3xl"}>
								{title}{" "}
								<Text as={"span"} fontWeight={"normal"} color={"gray.400"}>
									{new Date(releaseDate).getFullYear()}
								</Text>
							</Heading>

							{/* Calender & Date */}
							<Flex alignItems={"center"} gap={4} mt={1} mb={5}>
								<Flex alignItems={"center"}>
									<CalendarIcon mr={2} color={"gray.400"} />
									<Text fontSize={"small"}>
										{new Date(releaseDate).toLocaleDateString("en-US")} (US)
									</Text>
								</Flex>
							</Flex>

							{/* Rating Circle & Add To Watchlist Button */}
							<Flex alignItems={"center"} gap={4}>
								<CircularProgress
									value={ratingToPercentage(details?.vote_average)}
									bg={"gray.800"}
									borderRadius={"full"}
									p={0.5}
									size={"70px"}
									color={resolveRatingColor(details?.vote_average)}
									thickness={"6px"}>
									<CircularProgressLabel>
										{ratingToPercentage(details?.vote_average)}{" "}
										<Box as="span" fontSize={"12px"}>
											%
										</Box>
									</CircularProgressLabel>
								</CircularProgress>
								<Text display={{ base: "none", md: "initial" }}>
									User Score
								</Text>
								<Button
									display={"none"}
									colorScheme="green"
									variant={"outline"}
									onClick={() => console.log("click")}
									leftIcon={<CheckCircleIcon />}>
									In Watchlist
								</Button>
								<Button
									colorScheme="whiteAlpha"
									variant={"outline"}
									onClick={() => console.log("click")}
									leftIcon={<SmallAddIcon color={"whiteAlpha.900"} />}>
									<Text color={"whiteAlpha.900"}>Add To Watchlist</Text>
								</Button>
							</Flex>

							{/* Tagline */}
							<Text
								color={"gray.400"}
								fontSize={"medium"}
								fontStyle={"italic"}
								my={5}>
								{details?.tagline}
							</Text>

							{/* Overview & Genre Badges */}
							<Heading fontSize={"xl"} mb={3}>
								Overview
							</Heading>
							<Text fontSize={"md"} mb={3}>
								{details?.overview}
							</Text>
							<Flex mt={6} gap={2}>
								{details?.genres?.map((genre) => (
									<Badge p={1} key={genre?.id}>
										{genre?.name}
									</Badge>
								))}
							</Flex>
						</Box>
					</Flex>
				</Container>
			</Box>

			{/* Cast */}
			<Container maxW={"container.xl"} pb={10}>
				<Heading
					as={"h2"}
					fontSize={"medium"}
					textTransform={"uppercase"}
					mt={10}>
					Cast
				</Heading>
				<Flex mt={5} mb={10} overflowX={"scroll"} gap={5}>
					{cast?.length === 0 && <Text>No cast found</Text>}
					{cast &&
						cast.map((item) => (
							<Box key={item?.id} minW={"150px"}>
								<Image src={`${imagePath}${item?.profile_path}`} />
							</Box>
						))}
				</Flex>
			</Container>
		</Box>
	);
};

export default Details;
