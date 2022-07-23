import React from 'react';
import Files from './Files';
import Images from './Images';

const MediaView = ({ setIsOpened }) => {
	const [isSelectedImageSection, setIsSelectedImageSection] = React.useState(true);
	return (
		<>
			<div className="flex items-center justify-between px-3 py-3 border-b border-dark-lighten">
				<div className="flex-1"></div>
				<div className="flex items-center justify-center flex-1">
					<h1 className="text-2xl text-center whitespace-nowrap">View images and files</h1>
				</div>
				<div className="flex items-center justify-end flex-1">
					<button
						onClick={() => setIsOpened(false)}
						className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-lighten"
					>
						<i className="text-2xl bx bx-x"></i>
					</button>
				</div>
			</div>
			<div className="flex items-stretch border-b border-dark-lighten">
				<button
					onClick={() => setIsSelectedImageSection(true)}
					className={`flex-1 py-2 text-center ${isSelectedImageSection ? 'bg-dark-lighten' : ''}`}
				>
					Images
				</button>
				<button
					onClick={() => setIsSelectedImageSection(false)}
					className={`flex-1 py-2 text-center ${!isSelectedImageSection ? 'bg-dark-lighten' : ''}`}
				>
					Files
				</button>
			</div>
			{isSelectedImageSection ? <Images /> : <Files />}
		</>
	);
};

export default MediaView;
