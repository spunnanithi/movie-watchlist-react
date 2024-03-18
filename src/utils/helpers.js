export const ratingToPercentage = (rating) => {
	return (rating * 10).toFixed(0);
};

export const resolveRatingColor = (rating) => {
	if (rating >= 8) {
		return "green.400";
	} else if (rating >= 7) {
		return "yellow.400";
	} else if (rating >= 6) {
		return "orange.400";
	} else {
		return "red.400";
	}
};

export const convertMinutesToHours = (mins) => {
	const hours = Math.floor(mins / 60);
	const minutes = mins % 60;

	return `${hours}h ${minutes}m`;
};

export const calculateAge = (dateString) => {
	const today = new Date();
	const birthday = new Date(dateString);

	let age = today.getFullYear() - birthday.getFullYear();
	const month = today.getMonth() - birthday.getMonth();

	if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
		age--;
	}

	return age;
};
