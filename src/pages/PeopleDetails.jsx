import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	fetchPeopleCombinedCredits,
	fetchPeopleDetails,
	fetchPeopleImages,
	fetchPeopleSearch,
	imagePath,
} from "../services/api";
import {
	Badge,
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	Image,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { CalendarIcon, StarIcon } from "@chakra-ui/icons";
import { calculateAge } from "../utils/helpers";
import CustomHeading from "../components/CustomHeading";

const PeopleDetails = () => {
	const { id } = useParams();

	const [peopleDetails, setPeopleDetails] = useState([]);
	const [images, setImages] = useState([]);
	const [castCombinedCredits, setCastCombinedCredits] = useState([]);
	const [knownFor, setKnownFor] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [peopleDetailsData, peopleImagesData, peopleCombinedCreditsData] =
					await Promise.all([
						fetchPeopleDetails(id),
						fetchPeopleImages(id),
						fetchPeopleCombinedCredits(id),
					]);

				// Set Details data
				setPeopleDetails(peopleDetailsData);

				// Set Images data
				setImages(peopleImagesData?.profiles);

				// Set Combined Credits - Cast
				setCastCombinedCredits(peopleCombinedCreditsData?.cast);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		// Scroll to top upon movie redirect
		window.scrollTo(0, 0);
	}, [id]);

	const name = peopleDetails?.name;

	useEffect(() => {
		fetchPeopleSearch(name)
			.then((res) => setKnownFor(res?.results[0].known_for))
			.catch((err) => {
				console.log(err);
			});
	}, [name]);

	if (loading) {
		return (
			<Flex height={"100vh"} justifyContent={"center"} alignContent={"center"}>
				<Spinner size={"xl"} color="teal" />
			</Flex>
		);
	}

	// console.log(peopleDetails);
	// console.log(images);
	// console.log(castCombinedCredits);
	console.log(knownFor);

	return (
		<Box>
			{/* Background Image */}
			<Box
				background={`linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88))`}
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
							borderRadius={"md"}
							src={`${imagePath}${peopleDetails?.profile_path}`}
						/>

						<Box>
							{/* Title & Year */}
							<Heading fontSize={"3xl"}>
								{peopleDetails?.name}{" "}
								<Text as={"span"} fontWeight={"normal"} color={"teal.400"}>
									{calculateAge(peopleDetails?.birthday)} Years Old
								</Text>
							</Heading>

							{/* Place of Birth */}
							<Text color={"gray.400"} fontSize={"large"} fontStyle={"italic"}>
								Place of Birth: {peopleDetails?.place_of_birth}
							</Text>

							{/* Calender & Date */}
							<Flex alignItems={"center"} gap={4} mt={1} mb={5}>
								<Flex alignItems={"center"}>
									<CalendarIcon mr={2} color={"gray.400"} />
									<Text mr={1} fontWeight={"bold"} fontSize={"small"}>
										Born:
									</Text>
									<Text fontSize={"small"}>
										{new Date(peopleDetails?.birthday).toLocaleDateString(
											"en-US"
										)}
									</Text>
								</Flex>
								{peopleDetails?.deathday && (
									<Flex alignItems={"center"}>
										<CalendarIcon mr={2} color={"gray.400"} />
										<Text mr={1} fontWeight={"bold"} fontSize={"small"}>
											Died:
										</Text>
										<Text fontSize={"small"}>
											{new Date(peopleDetails?.deathday).toLocaleDateString(
												"en-US"
											)}
										</Text>
									</Flex>
								)}
							</Flex>

							{/* Biography & Known For Department Badge */}
							<Heading fontSize={"xl"} mb={3}>
								Biography
							</Heading>
							<Text fontSize={"md"} mb={3}>
								{peopleDetails?.biography}
							</Text>
							<Flex mt={6} gap={2}>
								<Badge
									colorScheme="whiteAlpha"
									bg={"whiteAlpha.300"}
									border={"1px"}
									borderColor={"whiteAlpha.900"}
									textColor={"whiteAlpha.900"}
									variant={"outline"}
									p={1}>
									{peopleDetails?.known_for_department}
								</Badge>
							</Flex>
						</Box>
					</Flex>
				</Container>
			</Box>

			<Container
				maxW={{
					base: "container.sm",
					sm: "container.md",
					lg: "container.lg",
					xl: "container.xl",
				}}
				pb={10}>
				{/* Images */}
				<Box mt={10}>
					<CustomHeading>Images</CustomHeading>
					<Divider mt={2} />
				</Box>
				<Flex mt={5} mb={10} overflowX={"scroll"} gap={5}>
					{images?.length === 0 && <Text>No images found</Text>}
					{images &&
						images.map((item, index) => (
							<Box key={index} maxW={"150px"} minW={"150px"}>
								<Image
									src={`${imagePath}${item?.file_path}`}
									// Replace with placeholder image if src cannot be found
									onError={(e) => {
										e.currentTarget.src =
											"https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
										e.currentTarget.onerror = null;
									}}
									w={"100%"}
									h={"225px"}
									objectFit={"cover"}
									borderRadius={"md"}
								/>
							</Box>
						))}
				</Flex>

				{/* Known For Section */}
				<Box mt={10} mb={5}>
					<CustomHeading>Known For</CustomHeading>
					<Divider mt={2} />
				</Box>
				<Flex mt={5} mb={10} px={2} pt={3} overflowX={"scroll"} gap={5}>
					{knownFor?.length === 0 && <Text>No known for credits found</Text>}
					{knownFor &&
						knownFor.map((item) => (
							<Box key={item?.id} maxW={"150px"} minW={"150px"}>
								<Link to={`/${item?.media_type}/${item?.id}`}>
									<Image
										transform={"scale(1)"}
										_hover={{
											transform: { base: "scale(1)", md: "scale(1.08)" },
											transition: "transform 0.2s ease-in-out",
											zIndex: 10,
										}}
										src={`${imagePath}${item?.poster_path}`}
										// Replace with placeholder image if src cannot be found
										onError={(e) => {
											e.currentTarget.src =
												"https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
											e.currentTarget.onerror = null;
										}}
										w={"100%"}
										h={"225px"}
										objectFit={"cover"}
										borderRadius={"md"}
									/>
								</Link>
								<Text>{item?.name || item?.title}</Text>
								<Text fontSize={"small"} color={"teal.300"}>
									{new Date(
										item?.release_date || item?.first_air_date
									).getFullYear() || "N/A"}
								</Text>
								<Text fontSize={"small"} color={"gray.400"}>
									{item?.character}
								</Text>
								<Flex alignItems={"center"} gap={1} mt={1}>
									<StarIcon fontSize={"medium"} />
									<Text fontSize={"medium"}>
										{item?.vote_average?.toFixed(1)}
									</Text>
								</Flex>
							</Box>
						))}
				</Flex>

				{/* Filmography */}
				<Box mt={10} mb={5}>
					<CustomHeading>Filmography</CustomHeading>
					<Divider mt={2} />
				</Box>
				<Flex
					mt={5}
					mb={10}
					px={2}
					pt={3}
					overflowX={"scroll"}
					h={"400px"}
					gap={5}>
					{castCombinedCredits?.length === 0 && <Text>No credits found</Text>}
					{castCombinedCredits &&
						castCombinedCredits.map((item) => (
							<Box key={item?.credit_id} maxW={"150px"} minW={"150px"}>
								<Link to={`/${item?.media_type}/${item?.id}`}>
									<Image
										transform={"scale(1)"}
										_hover={{
											transform: { base: "scale(1)", md: "scale(1.08)" },
											transition: "transform 0.2s ease-in-out",
											zIndex: 10,
										}}
										src={`${imagePath}${item?.poster_path}`}
										// Replace with placeholder image if src cannot be found
										onError={(e) => {
											e.currentTarget.src =
												"https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
											e.currentTarget.onerror = null;
										}}
										w={"100%"}
										h={"225px"}
										objectFit={"cover"}
										borderRadius={"md"}
									/>
								</Link>
								<Text>{item?.name || item?.title}</Text>
								<Text fontSize={"small"} color={"teal.300"}>
									{new Date(
										item?.release_date || item?.first_air_date
									).getFullYear() || "N/A"}
								</Text>
								<Text fontSize={"small"} color={"gray.400"}>
									{item?.character}
								</Text>
								<Flex alignItems={"center"} gap={1} mt={1}>
									<StarIcon fontSize={"medium"} />
									<Text fontSize={"medium"}>
										{item?.vote_average?.toFixed(1)}
									</Text>
								</Flex>
							</Box>
						))}
				</Flex>
			</Container>
		</Box>
	);
};

export default PeopleDetails;
