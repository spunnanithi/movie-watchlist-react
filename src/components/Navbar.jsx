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
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
	useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { MdListAlt } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
	const { user, signInWithGoogle, logout } = useAuth();
	const { onOpen, isOpen, onClose } = useDisclosure();

	const handleGoogleLogin = async () => {
		try {
			await signInWithGoogle();
			console.log("Successfully logged In!");
		} catch (err) {
			console.log("Auth Error: ", err);
		}
	};

	return (
		<Box
			position={"fixed"}
			bg={"blackAlpha.900"}
			width={"100%"}
			zIndex={50}
			top={0}
			py={4}
			mb={2}>
			<Container maxW={"container.xl"}>
				<Flex justifyContent={"space-between"}>
					<Link to="/">
						<Box
							fontSize={"2xl"}
							fontWeight={"bold"}
							color={"red"}
							letterSpacing={"widest"}
							fontFamily={"Tahoma"}>
							FLIXQUEUE
						</Box>
					</Link>

					{/* DESKTOP */}
					<Flex
						gap={"4"}
						alignItems={"center"}
						display={{ base: "none", md: "flex" }}>
						<Link to="/">Home</Link>
						<Link to="/movies">Movies</Link>
						<Link to="/shows">TV Shows</Link>
						<Link to="/search">
							<Search2Icon fontSize={"lg"} />
						</Link>
						{user ? (
							<Menu isLazy>
								<MenuButton>
									<Avatar
										src={user?.photoURL}
										bg={"red.500"}
										color={"white"}
										size={"sm"}
										name={user?.displayName}
									/>
								</MenuButton>
								<MenuList borderColor={"gray.600"} bg={"gray.700"}>
									<MenuGroup title="Profile">
										<Link to="/watchlist">
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
											onClick={logout}>
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
						<Link to="/search">
							<SearchIcon fontSize={"xl"} />
						</Link>
						<IconButton onClick={onOpen} icon={<HamburgerIcon />} />
						<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
							<DrawerOverlay />
							<DrawerContent bg={"black"}>
								<DrawerCloseButton />
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
										<Link to="/">Home</Link>
										<Link to="/movies">Movies</Link>
										<Link to="/shows">TV Shows</Link>
										{user && (
											<>
												<Link to="/watchlist">Watchlist</Link>
												<Button
													variant={"outline"}
													colorScheme="red"
													onClick={logout}>
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
