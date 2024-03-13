import {
	Avatar,
	Box,
	Container,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Search2Icon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { MdListAlt } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
	const { user, signInWithGoogle, logout } = useAuth();

	const handleGoogleLogin = async () => {
		try {
			await signInWithGoogle();
			console.log("Successfully logged In!");
		} catch (err) {
			console.log("Auth Error: ", err);
		}
	};

	return (
		<Box py={4} mb={2}>
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
					<Flex gap={"4"} alignItems={"center"}>
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
										<Link to="/">
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
				</Flex>
			</Container>
		</Box>
	);
};

export default Navbar;
