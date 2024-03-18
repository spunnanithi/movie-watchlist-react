import { Badge } from "@chakra-ui/react";

const CustomCardBadge = ({ type }) => {
	return (
		<Badge
			variant={"solid"}
			bg={"gray.600"}
			textColor={"whiteAlpha.900"}
			zIndex={1}>
			{type === "movie" ? "Movie" : "TV"}
		</Badge>
	);
};

export default CustomCardBadge;
