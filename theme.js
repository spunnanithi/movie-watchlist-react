import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const styles = {
	global: (props) => ({
		body: {
			bg: mode(
				"blackAlpha.900",
				props.theme.semanticTokens.colors["chakra-body-bg"]._light
			)(props),
			color: mode("whiteAlpha.900", "whiteAlpha.100")(props),
		},
	}),
};

const theme = extendTheme({ config, styles });

export default theme;
