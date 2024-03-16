import {
	Avatar,
	Box,
	Button,
	Container,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Text,
	Icon,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import tvIcon from "../assets/tv-icon.svg";
import { FcGoogle } from "react-icons/fc";
import { MdListAlt } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import PopupNavItem from "./PopupNavItem";
import { useEffect, useState } from "react";
import { fetchMoviesAndShowsGenres } from "../services/api";

const Navbar = () => {
	const [genres, setGenres] = useState([]);

	const { user, signInWithGoogle, logout } = useAuth();
	const { onOpen, isOpen, onClose } = useDisclosure();
	const toast = useToast();

	const handleGoogleLogin = async () => {
		try {
			await signInWithGoogle();
			toast({
				title: "Success",
				description: "You are logged in through Google",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			console.log("Successfully logged In!");
		} catch (err) {
			toast({
				title: "Error",
				description: "Unable to log in through Google",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.log("Auth Error: ", err);
		}
	};

	useEffect(() => {
		fetchMoviesAndShowsGenres("movie")
			.then((res) => {
				setGenres(res?.genres);
			})
			.catch((err) => console.log(err));
	}, []);

	// console.log(genres);

	return (
		<Box
			position={"fixed"}
			bg={"blackAlpha.900"}
			width={"100%"}
			zIndex={50}
			top={0}
			py={4}
			mb={2}>
			<Container
				maxW={{
					base: "container.sm",
					sm: "container.md",
					lg: "container.lg",
					xl: "container.xl",
				}}>
				<Flex justifyContent={"space-between"}>
					<Link
						_hover={{
							textDecoration: "none",
						}}
						as={NavLink}
						to="/">
						<Flex
							gap={3}
							fontSize={"3xl"}
							fontWeight={"bold"}
							color={"teal.500"}
							letterSpacing={"widest"}
							fontFamily={"Tahoma"}>
							<Image
								objectFit={"cover"}
								boxSize={"40px"}
								src={tvIcon}
								alt="FlixQueue logo"
							/>
							<Text>FLIXQUEUE</Text>
						</Flex>
					</Link>

					{/* DESKTOP */}
					<Flex
						gap={5}
						alignItems={"center"}
						display={{ base: "none", md: "flex" }}>
						<Link
							as={NavLink}
							_hover={{
								textDecoration: "none",
							}}
							_activeLink={{
								borderBottom: "2px",
								textColor: "teal.500",
								fontWeight: "bold",
							}}
							to="/">
							Home
						</Link>
						<PopupNavItem genres={genres} />
						<Link
							as={NavLink}
							_hover={{
								textDecoration: "none",
							}}
							_activeLink={{
								borderBottom: "2px",
								textColor: "teal.500",
								fontWeight: "bold",
							}}
							to="/movies">
							Movies
						</Link>
						<Link
							as={NavLink}
							_hover={{
								textDecoration: "none",
							}}
							_activeLink={{
								borderBottom: "2px",
								textColor: "teal.500",
								fontWeight: "bold",
							}}
							to="/shows">
							TV Shows
						</Link>
						<Link
							as={NavLink}
							_activeLink={{
								"& > svg": {
									textColor: "teal",
								},
							}}
							to="/search">
							<Search2Icon fontSize={"lg"} />
						</Link>
						{user ? (
							<Menu isLazy>
								<MenuButton>
									<Avatar
										src={user?.photoURL}
										bg={"teal.500"}
										color={"white"}
										size={"sm"}
										name={user?.displayName}
									/>
								</MenuButton>
								<MenuList borderColor={"gray.600"} bg={"gray.700"}>
									<MenuGroup title="Profile">
										<Link as={NavLink} to="/watchlist">
											<MenuItem
												icon={<Icon as={MdListAlt} fontSize={20} />}
												_hover={{ bg: "gray.500" }}
												bg={"gray.700"}>
												Watchlist
											</MenuItem>
										</Link>
									</MenuGroup>
									<MenuDivider />
									<MenuGroup>
										<MenuItem
											icon={<Icon as={MdLogout} fontSize={20} />}
											_hover={{ bg: "gray.500" }}
											bg={"gray.700"}
											onClick={() => {
												toast({
													title: "Success",
													description: "You are logged out",
													status: "success",
													duration: 5000,
													isClosable: true,
												});
												logout;
											}}>
											Logout
										</MenuItem>
									</MenuGroup>
								</MenuList>
							</Menu>
						) : (
							<Menu isLazy>
								<MenuButton>
									<Avatar
										bg={"gray.600"}
										color={"white"}
										size={"sm"}
										name={user?.displayName}
									/>
								</MenuButton>
								<MenuList borderColor={"gray.600"} bg={"gray.700"}>
									<MenuGroup title="Sign In">
										<MenuItem
											icon={<Icon as={FcGoogle} fontSize={20} />}
											onClick={handleGoogleLogin}
											_hover={{ bg: "gray.500" }}
											bg={"gray.700"}>
											Google
										</MenuItem>
									</MenuGroup>
								</MenuList>
							</Menu>
						)}
					</Flex>

					{/* Mobile */}
					<Flex
						display={{ base: "flex", md: "none" }}
						alignItems={"center"}
						gap="4">
						<Link
							as={NavLink}
							_activeLink={{
								"& > svg": {
									textColor: "teal",
								},
							}}
							to="/search">
							<SearchIcon fontSize={"xl"} />
						</Link>
						<IconButton
							bg={"gray.700"}
							onClick={onOpen}
							icon={<HamburgerIcon color={"whiteAlpha.900"} />}
						/>
						<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
							<DrawerOverlay />
							<DrawerContent bg={"black"}>
								<DrawerCloseButton mt={1} />
								<DrawerHeader>
									{user ? (
										<Flex alignItems="center" gap="2">
											<Avatar
												src={user?.photoURL}
												bg="red.500"
												size={"sm"}
												name={user?.email}
											/>
											<Box fontSize={"sm"}>
												{user?.displayName || user?.email}
											</Box>
										</Flex>
									) : (
										<Flex alignItems="center" gap="2">
											<Avatar
												size={"sm"}
												bg="gray.700"
												as="button"
												onClick={handleGoogleLogin}
											/>
											<Box fontSize={"sm"}>
												{user?.displayName || user?.email}
											</Box>
										</Flex>
									)}
								</DrawerHeader>

								<DrawerBody>
									<Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
										<Link
											as={NavLink}
											_activeLink={{
												borderBottom: "2px",
												textColor: "teal.500",
												fontWeight: "bold",
											}}
											to="/">
											Home
										</Link>
										<Link
											as={NavLink}
											_activeLink={{
												borderBottom: "2px",
												textColor: "teal.500",
												fontWeight: "bold",
											}}
											to="/movies">
											Movies
										</Link>
										<Link
											as={NavLink}
											_activeLink={{
												borderBottom: "2px",
												textColor: "teal.500",
												fontWeight: "bold",
											}}
											to="/shows">
											TV Shows
										</Link>
										{user && (
											<>
												<Link
													as={NavLink}
													_activeLink={{
														borderBottom: "2px",
														textColor: "teal.500",
														fontWeight: "bold",
													}}
													to="/watchlist">
													Watchlist
												</Link>
												<Button
													variant={"outline"}
													colorScheme="red"
													onClick={() => {
														toast({
															title: "Success",
															description: "You are logged out",
															status: "success",
															duration: 5000,
															isClosable: true,
														});
														logout;
													}}>
													Logout
												</Button>
											</>
										)}
									</Flex>
								</DrawerBody>
							</DrawerContent>
						</Drawer>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
};

export default Navbar;
