const Skeleton = (props) => {
	return (
		<div
			className={`skeleton bg-gray-500 ${props.className} `}
			style={{
				height: props.height,
				width: props.width || '100%',
				borderRadius: props.radius,
			}}
		>
			{props.children}
		</div>
	);
};

export default Skeleton;
