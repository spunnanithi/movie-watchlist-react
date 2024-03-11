import { Button, Flex, Text } from "@chakra-ui/react";

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
	return (
		<Flex gap={2} justifyContent={"center"} alignItems={"center"}>
			<Flex alignItems={"center"} gap={4} maxW={"250px"} my={10}>
				<Button
					onClick={() => setActivePage(activePage - 1)}
					isDisabled={activePage === 1}>
					Previous
				</Button>
				<Flex gap={1}>
					<Text>{activePage}</Text>
					<Text>of</Text>
					<Text>{totalPages}</Text>
				</Flex>
				<Button
					onClick={() => setActivePage(activePage + 1)}
					isDisabled={activePage === totalPages}>
					Next
				</Button>
			</Flex>
		</Flex>
	);
};

export default PaginationComponent;
