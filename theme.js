import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

// TODO: For Dev Env
// const styles = {
// 	global: (props) => ({
// 		body: {
// 			bg: mode("blackAlpha.900")(props),
// 			color: mode("whiteAlpha.900")(props),
// 		},
// 	}),
// };

// TODO: For Production Env
const styles = {
	global: (props) => ({
		body: {
			bg: mode(
				props.theme.semanticTokens.colors["chakra-body-bg"]._light,
				"blackAlpha.900"
			)(props),
			color: mode("whiteAlpha.100", "whiteAlpha.900")(props),
		},
	}),
};

const theme = extendTheme({ config, styles });

export default theme;
