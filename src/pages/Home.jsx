import { useEffect, useState } from "react";
import {
	Box,
	Container,
	Flex,
	Grid,
	Heading,
	Skeleton,
} from "@chakra-ui/react";
import { fetchAllTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
	const [data, setData] = useState([]);
	const [timeWindow, setTimeWindow] = useState("day");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchAllTrending(timeWindow)
			.then((res) => {
				setData(res);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [timeWindow]);

	// console.log("data", data);

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
					Trending
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
