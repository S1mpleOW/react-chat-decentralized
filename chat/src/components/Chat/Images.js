import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gun } from '../../App';
import ImageView from './ImageView';

const Image = ({ src = '' }) => {
	const [isImageViewOpened, setIsImageViewOpened] = useState(false);
	return (
		<>
			<img
				onClick={() => setIsImageViewOpened(true)}
				className="h-[100px] w-[100px] cursor-pointer object-cover transition duration-300 hover:brightness-75"
				src={src}
				alt=""
			/>
			<ImageView src={src} isOpened={isImageViewOpened} setIsOpened={setIsImageViewOpened} />
		</>
	);
};

const Images = () => {
	const conversationId = useParams();
	const [images, setImages] = React.useState([]);
	useEffect(() => {
		if (!conversationId) return;
		gun
			.get('messages-room1')
			.map()
			.once((data, id) => {
				if (!data || data.length === 0) return;
				const { messageType } = data;
				data.id = id;
				if (messageType === 'jpg' || messageType === 'png' || messageType === 'jpeg') {
					setImages((prev) => [...prev, data]);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex flex-wrap content-start gap-4 p-4 overflow-x-hidden overflow-y-auto h-80">
			{images.length > 0 && images.map((image) => <Image key={image.id} src={image?.content} />)}
		</div>
	);
};

export default Images;
