import { useEffect } from "react";

const useTitle = (title) => {
	useEffect(() => {
		const prevTitle = document.title;
		document.title = title;
		return () => {
			document.title = prevTitle;
		};
	}, [title]);

	return null;
};

export default useTitle;
