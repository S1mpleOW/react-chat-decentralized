import React, { useMemo, useState } from 'react';
import { isFileOrImage } from '../../utils/helper';
import DownLoadIcon from '../icon/DownLoadIcon';
import ImageView from './ImageView';

const LeftMessage = ({ message: { content = '', type, extension, name } }) => {
	const [isImageViewOpened, setIsImageViewOpened] = useState(false);
	const checkType = useMemo(() => isFileOrImage(extension), [extension]);
	return (
		<>
			{(!type && !extension) || !content ? (
				<></>
			) : (
				<div className={`group relative flex items-stretch gap-2 px-8 mb-6`}>
					{checkType === 'message' ? (
						<div
							className={`bg-left-message after:border-left-message relative rounded-lg p-2 text-white after:absolute after:left-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-r-transparent break-words max-w-[400px]`}
						>
							<span>{content || ''}</span>
						</div>
					) : checkType === 'image' ? (
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
					) : checkType === 'file' ? (
						<a
							className="bg-left-message after:border-left-message relative rounded-lg p-2 text-white after:absolute after:left-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-r-transparent break-words max-w-[400px] "
							href={content}
						>
							<div className="flex items-center w-full">
								<DownLoadIcon className="w-[10%]"></DownLoadIcon>
								<span className="w-[90%] break-word">{name}</span>
							</div>
						</a>
					) : (
						<></>
					)}
				</div>
			)}
		</>
	);
};

export default LeftMessage;
