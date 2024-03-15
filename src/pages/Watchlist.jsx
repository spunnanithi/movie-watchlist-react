import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";

const Watchlist = () => {
	const { getWatchlist } = useFirestore();
	const { user } = useAuth();

	const [watchlist, setWatchlist] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user?.uid) {
			getWatchlist(user?.uid)
				.then((data) => {
					setWatchlist(data);
				})
				.catch((err) => console.log(err))
				.finally(() => setLoading(false));
		}
	}, [user?.uid, getWatchlist]);

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
					My Watchlist
				</Heading>
			</Flex>

			{loading && (
				<Flex justify={"center"} mt={10}>
					<Spinner size={"xl"} color="teal" />
				</Flex>
			)}

			{!loading && watchlist?.length === 0 && (
				<Flex justify={"center"} mt={10}>
					<Heading as={"h2"} fontSize={"medium"} textTransform={"uppercase"}>
						Watchlist is empty
					</Heading>
				</Flex>
			)}

			{!loading && watchlist?.length > 0 && (
				<Grid
					templateColumns={{
						base: "1fr",
					}}
					gap={4}>
					{watchlist?.map((item) => (
						<WatchlistCard
							key={item.id}
							item={item}
							type={item?.type}
							setWatchlist={setWatchlist}
						/>
					))}
				</Grid>
			)}
		</Container>
	);
};
export default Watchlist;
