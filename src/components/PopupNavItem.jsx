import { useRef, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Link } from "@chakra-ui/react";

// TODO: dynamic button text and items
const PopupNavItem = ({ genres }) => {
	const timerRef = useRef();
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	// menu list pops up automatically when cursor hovers over the button，
	const btnMouseEnterEvent = () => {
		setIsOpenMenu(true);
	};

	//,and vice versa，
	const btnMouseLeaveEvent = () => {
		// async
		timerRef.current = window.setTimeout(() => {
			setIsOpenMenu(false);
		}, 150);
	};

	// when the cursor moves away from the button but entering the menu list,the menu list stays open
	const menuListMouseEnterEvent = () => {
		// when entered, the timer has been cleared
		clearTimeout(timerRef.current);
		timerRef.current = undefined;
		setIsOpenMenu(true);
	};

	// finally, when the cursor moves away from the menu list, menu list closes
	const menuListMouseLeaveEvent = () => {
		setIsOpenMenu(false);
	};

	return (
		<Menu isLazy isOpen={isOpenMenu} id={1}>
			<MenuButton
				as={Link}
				_hover={{
					textDecoration: "none",
				}}
				_activeLink={{
					borderBottom: "2px",
					textColor: "teal.500",
					fontWeight: "bold",
				}}
				to="/"
				onMouseEnter={btnMouseEnterEvent}
				onMouseLeave={btnMouseLeaveEvent}>
				Genres
			</MenuButton>
			<MenuList
				borderColor={"gray.600"}
				bg={"gray.700"}
				onMouseEnter={menuListMouseEnterEvent}
				onMouseLeave={menuListMouseLeaveEvent}>
				{genres &&
					genres?.map((genre) => (
						<MenuItem
							key={genre?.id}
							_hover={{ bg: "gray.500" }}
							bg={"gray.700"}>
							{genre?.name}
						</MenuItem>
					))}
			</MenuList>
		</Menu>
	);
};

export default PopupNavItem;
