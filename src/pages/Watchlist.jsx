import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Container, Flex, Grid, Spinner } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";
import CustomHeading from "../components/CustomHeading";

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
				<CustomHeading>My Watchlist</CustomHeading>
			</Flex>

			{loading && (
				<Flex height={"100vh"} justify={"center"} mt={10}>
					<Spinner size={"xl"} color="teal" />
				</Flex>
			)}

			{!loading && watchlist?.length === 0 && (
				<Flex height={"100vh"} justify={"center"} mt={10}>
					<CustomHeading>Watchlist is empty</CustomHeading>
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
