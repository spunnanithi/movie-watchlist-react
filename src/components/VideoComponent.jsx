const VideoComponent = ({ id, small, title }) => {
	return (
		<iframe
			width={small ? "350" : "100%"}
			height={small ? "250" : "500"}
			src={`https://www.youtube.com/embed/${id}`}
			title={title}
			allowFullScreen></iframe>
	);
};

export default VideoComponent;
