import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<Box my={28}>
				<main>{children}</main>
			</Box>
			<Footer />
		</>
	);
};

export default Layout;
