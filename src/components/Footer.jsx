import {
	Box,
	ButtonGroup,
	Container,
	Flex,
	IconButton,
	Image,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import tvIcon from "../assets/tv-icon.svg";
import { NavLink } from "react-router-dom";

const Footer = () => (
	<Box width={"100%"} bg={"blackAlpha.900"}>
		<Container
			as="footer"
			role="contentinfo"
			py={{ base: "12", md: "16" }}
			px={{ base: "10", md: "0" }}
			maxW={{
				base: "container.sm",
				sm: "container.md",
				lg: "container.lg",
				xl: "container.xl",
			}}>
			<Stack spacing={{ base: "4", md: "5" }}>
				<Stack justify="space-between" direction="row" align="center">
					<Link
						_hover={{
							textDecoration: "none",
						}}
						as={NavLink}
						to="/">
						<Flex
							gap={3}
							fontSize={"2xl"}
							fontWeight={"bold"}
							color={"teal.500"}
							letterSpacing={"widest"}
							fontFamily={"Tahoma"}>
							<Image
								objectFit={"cover"}
								boxSize={"30px"}
								src={tvIcon}
								alt="FlixQueue logo"
							/>
							<Text>FLIXQUEUE</Text>
						</Flex>
					</Link>
					<ButtonGroup spacing={5} variant="tertiary">
						<IconButton
							as="a"
							target="_blank"
							size={"large"}
							fontSize={"30px"}
							rel="noopener noreferrer"
							href="https://www.linkedin.com/in/sirasit-punnanithi/"
							aria-label="LinkedIn"
							icon={<FaLinkedin />}
						/>
						<IconButton
							as="a"
							target="_blank"
							rel="noopener noreferrer"
							size={"large"}
							fontSize={"30px"}
							href="https://github.com/spunnanithi"
							aria-label="GitHub"
							icon={<FaGithub />}
						/>
					</ButtonGroup>
				</Stack>
				<Text fontSize="sm" color="fg.subtle">
					&copy; {new Date().getFullYear()} FlixQueue, Inc. All rights reserved.
				</Text>
			</Stack>
		</Container>
	</Box>
);

export default Footer;
