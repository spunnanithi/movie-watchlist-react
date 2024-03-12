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
import { useState } from "react";
import { fetchSearchData } from "../../services/api";
import CardComponent from "../../components/CardComponent";

const Search = () => {
	const [searchValue, setSearchValue] = useState("");
	const [activePage, setActivePage] = useState(1);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isFetched, setIsFetched] = useState(false);

	const handleSearch = (e) => {
		e.preventDefault();

		setLoading(true);

		fetchSearchData(searchValue, activePage)
			.then((res) => {
				setData(res?.results);
				setActivePage(res?.page);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
				setIsFetched(true);
			});
	};

	// console.log(data);

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
					Search
				</Heading>
			</Flex>

			<form onSubmit={handleSearch}>
				<InputGroup>
					<InputLeftElement>
						<SearchIcon />
					</InputLeftElement>
					<Input
						type="text"
						onChange={(e) => setSearchValue(e.target.value)}
						value={searchValue}
						placeholder="Search Movies, TV Shows, Actors..."
					/>

					{searchValue && (
						<InputRightElement>
							<CloseButton onClick={() => setSearchValue("")} />
						</InputRightElement>
					)}
				</InputGroup>
			</form>

			{loading && (
				<Flex justifyContent={"center"} mt={10}>
					<Spinner size={"xl"} color="red" />
				</Flex>
			)}

			{data?.length === 0 && isFetched && (
				<Heading textAlign={"center"} as={"h3"} fontSize={"small"} mt={10}>
					No results found
				</Heading>
			)}

			<Grid
				mt={10}
				templateColumns={{
					base: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
					xl: "repeat(5, 1fr)",
				}}
				gap={4}>
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
		</Container>
	);
};

export default Search;
