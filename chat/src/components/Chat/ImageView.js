import React from 'react';
import PortalLayout from '../PortalLayout';

const ImageView = ({ src, isOpened, setIsOpened }) => {
	return (
		<PortalLayout isOpened={isOpened} setIsOpened={setIsOpened}>
			{src && (
				<img
					onClick={(e) => e.stopPropagation()}
					src={src}
					className="w-auto h-auto max-w-full max-h-full"
					alt=""
				/>
			)}

			<button
				onClick={() => setIsOpened(false)}
				className="fixed z-30 flex items-center justify-center w-10 h-10 text-white transition duration-300 rounded-full cursor-pointer bg-dark-lighten right-2 top-2 hover:brightness-125"
			>
				<i className="text-4xl bx bx-x"></i>
			</button>
		</PortalLayout>
	);
};

export default ImageView;
