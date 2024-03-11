import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";

const CardComponent = ({ item, type }) => {
	return (
		<Link to={`/${type}/${item?.id}`}>
			<Box
				position={"relative"}
				transform={"scale(1)"}
				_hover={{
					transform: { base: "scale(1)", md: "scale(1.08)" },
					transition: "transform 0.2s ease-in-out",
					zIndex: 10,
					"& .overlay": {
						opacity: 1,
					},
				}}>
				<Image
					src={`${imagePath}${item?.poster_path}`}
					alt={item?.title || item?.name}
					height={"100%"}
				/>

				{/* Overlay appears upon hover */}
				<Box
					className="overlay"
					position={"absolute"}
					p={2}
					bottom={0}
					left={0}
					w={"100%"}
					h={"33%"}
					bg={"rgba(0,0,0,0.9)"}
					opacity={0}
					transition={"opacity 0.3s ease-in-out"}>
					<Text fontSize={"large"} textAlign={"center"}>
						{item?.title || item?.name}
					</Text>
					<Text textAlign={"center"} fontSize={"small"} color={"gray.400"}>
						{item?.media_type === "movie" ? "Movie" : "TV Show"}
					</Text>
					<Text textAlign={"center"} fontSize={"x-small"} color={"green.200"}>
						{new Date(
							item?.release_date || item?.first_air_date
						).getFullYear() || "No Date Found"}
					</Text>
					<Flex justifyContent={"center"} alignItems={"center"} gap={1} mt={4}>
						<StarIcon fontSize={"medium"} />
						<Text fontSize={"medium"}>{item?.vote_average?.toFixed(1)}</Text>
					</Flex>
				</Box>
			</Box>
		</Link>
	);
};

export default CardComponent;
