import { Grid, Skeleton } from "@chakra-ui/react";
import CardComponent from "./CardComponent";

const GridComponent = ({ data, loading, mediaType }) => {
	return (
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
						<CardComponent key={item?.id} item={item} type={mediaType} />
					)
				)}
		</Grid>
	);
};

export default GridComponent;
