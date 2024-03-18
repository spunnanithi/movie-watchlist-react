import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme.js";
import Home from "./pages/Home.jsx";
import Movies from "./pages/movies/Movies.jsx";
import Shows from "./pages/shows/Shows.jsx";
import Search from "./pages/search/Search.jsx";
import Details from "./pages/Details.jsx";
import PeopleDetails from "./pages/PeopleDetails.jsx";
import { AuthProvider } from "./context/authProvider.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import ProtectedRoutes from "./components/routes/ProtectedRoutes.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/movies",
				element: <Movies />,
			},
			{
				path: "/shows",
				element: <Shows />,
			},
			{
				path: "/search",
				element: <Search />,
			},
			{
				path: "/:type/:id",
				element: <Details />,
			},
			{
				path: "/person/:id",
				element: <PeopleDetails />,
			},
			{
				path: "/watchlist",
				element: (
					<ProtectedRoutes>
						<Watchlist />
					</ProtectedRoutes>
				),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ChakraProvider>
	</React.StrictMode>
);
