import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";
import CustomCardBadge from "./CustomCardBadge";
import posterFallbackImg from "../assets/poster-placeholder.jpg";

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
				<Flex position={"absolute"} top={2} right={2}>
					<CustomCardBadge type={type} />
				</Flex>
				<Image
					src={`${imagePath}${item?.poster_path} || ${imagePath}${item?.profile_path}`}
					// Replace with placeholder image if src cannot be found
					fallbackSrc={posterFallbackImg}
					alt={item?.title || item?.name}
					height={"350px"}
					borderRadius={"md"}
				/>

				{/* Overlay appears upon hover */}
				<Flex
					borderBottomRadius={"md"}
					flexDirection="column"
					justifyContent={"center"}
					alignItems={"center"}
					className="overlay"
					position={"absolute"}
					p={2}
					bottom={0}
					left={0}
					w={"100%"}
					h={"37%"}
					bg={"rgba(0,0,0,0.9)"}
					opacity={0}
					transition={"opacity 0.3s ease-in-out"}>
					<Text fontSize={"medium"} textAlign={"center"}>
						{item?.title || item?.name}
					</Text>
					<Text textAlign={"center"} fontSize={"small"} color={"teal.300"}>
						{new Date(
							item?.release_date || item?.first_air_date
						).getFullYear() || "No Date Found"}
					</Text>
					<Flex justifyContent={"center"} alignItems={"center"} gap={1} mt={1}>
						<StarIcon fontSize={"medium"} />
						<Text fontSize={"medium"}>{item?.vote_average?.toFixed(1)}</Text>
					</Flex>
				</Flex>
			</Box>
		</Link>
	);
};

export default CardComponent;
