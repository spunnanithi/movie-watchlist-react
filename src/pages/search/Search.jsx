import { SearchIcon } from "@chakra-ui/icons";
import {
	CloseButton,
	Container,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Spinner,
	Grid,
	Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchSearchData } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";
import CustomHeading from "../../components/CustomHeading";
import useTitle from "../../hooks/useTitle";

const Search = () => {
	const [searchValue, setSearchValue] = useState("");
	const [tempSearchValue, setTempSearchValue] = useState("");
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isFetched, setIsFetched] = useState(false);

	useEffect(() => {
		setLoading(true);

		fetchSearchData(searchValue, activePage)
			.then((res) => {
				setData(res?.results);
				setActivePage(res?.page);
				setTotalPages(res?.total_pages);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	}, [activePage, searchValue]);

	const handleSearch = (e) => {
		e.preventDefault();

		setSearchValue(tempSearchValue);
		setIsFetched(true);
	};

	// console.log(data);

	// Set the document title of page
	useTitle("Search");

	return (
		<Container
			maxW={{
				base: "container.sm",
				sm: "container.md",
				lg: "container.lg",
				xl: "container.xl",
			}}
			minH={"100vh"}>
			<Flex alignItems={"baseline"} gap={4} my={10}>
				<CustomHeading>Search</CustomHeading>
			</Flex>

			<form onSubmit={handleSearch}>
				<InputGroup>
					<InputLeftElement>
						<SearchIcon />
					</InputLeftElement>
					<Input
						autoFocus={true}
						focusBorderColor="teal.500"
						borderColor="teal"
						type="text"
						onChange={(e) => setTempSearchValue(e.target.value)}
						value={tempSearchValue}
						placeholder="Search Movies, TV Shows, Actors..."
					/>

					{tempSearchValue && (
						<InputRightElement>
							<CloseButton
								onClick={() => {
									setTempSearchValue("");
									setData([]);
									setIsFetched(false);
								}}
							/>
						</InputRightElement>
					)}
				</InputGroup>
			</form>

			{loading && (
				<Flex justifyContent={"center"} mt={10}>
					<Spinner size={"xl"} color="teal" />
				</Flex>
			)}

			{data?.length === 0 && isFetched && (
				<Heading textAlign={"center"} as={"h3"} fontSize={"medium"} mt={10}>
					No results found
				</Heading>
			)}

			{/* Grid */}
			<Grid
				mt={10}
				templateColumns={{
					base: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
					xl: "repeat(5, 1fr)",
				}}
				gap={5}>
				{data?.length > 0 &&
					!loading &&
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

			{/* Pagination */}
			{data?.length !== 0 && isFetched && (
				<PaginationComponent
					activePage={activePage}
					setActivePage={setActivePage}
					totalPages={totalPages}></PaginationComponent>
			)}
		</Container>
	);
};

export default Search;
