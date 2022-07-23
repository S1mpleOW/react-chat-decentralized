import React, { useState } from 'react';
import DownLoadIcon from '../icon/DownLoadIcon';
import PortalLayout from '../PortalLayout';
import ImageView from './ImageView';

const RightMessage = ({ message: { content = '', type, extension, name } }) => {
	const [isImageViewOpened, setIsImageViewOpened] = useState(false);
	return (
		<div className={`group relative flex flex-row-reverse items-stretch gap-2 px-8 mb-3`}>
			{type === 'message' ? (
				<div
					className={`bg-primary after:border-primary relative rounded-lg p-2 text-white after:absolute after:left-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-r-transparent break-words max-w-[400px]`}
				>
					<span>{content || ''}</span>
				</div>
			) : extension === 'jpg' || extension === 'png' || extension === 'jpeg' ? (
				<>
					<img
						src={content}
						alt="message"
						className="lg:max-w-[700px] lg:max-h-[700px] object-cover rounded-lg cursor-pointer hover:brightness-90"
						onClick={() => setIsImageViewOpened(true)}
					/>

					<ImageView
						isOpened={isImageViewOpened}
						setIsOpened={setIsImageViewOpened}
						src={content}
					></ImageView>
				</>
			) : (
				<a
					className="bg-primary after:border-primary relative rounded-lg p-2 text-white after:absolute after:left-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-r-transparent break-words max-w-[400px] "
					href={content}
				>
					<div className="flex items-center w-full gap-2">
						<DownLoadIcon></DownLoadIcon>
						<span>{name}</span>
					</div>
				</a>
			)}
		</div>
	);
};

export default RightMessage;
