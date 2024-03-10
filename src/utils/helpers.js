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
