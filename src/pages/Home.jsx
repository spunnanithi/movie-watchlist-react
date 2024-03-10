import { Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { fetchAllTrending } from "../services/api";

const Home = () => {
	useEffect(() => {
		fetchAllTrending("day")
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Container maxW={"container.xl"}>
			<Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
				Trending
			</Heading>
		</Container>
	);
};

export default Home;
