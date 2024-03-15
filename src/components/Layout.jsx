import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<Box mt={28}>
				<main>{children}</main>
			</Box>
		</>
	);
};

export default Layout;
