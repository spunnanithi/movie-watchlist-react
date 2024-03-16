import { Heading } from "@chakra-ui/react";

const CustomHeading = ({ children }) => {
	return (
		<Heading as={"h2"} fontSize={"lg"} textTransform={"uppercase"}>
			{children}
		</Heading>
	);
};

export default CustomHeading;
