import React, { useMemo, useState } from 'react';
import { useTheme } from '../../contexts/themeContext';
import { isFileOrImage } from '../../utils/helper';
import DownLoadIcon from '../icon/DownLoadIcon';
import ImageView from './ImageView';

const RightMessage = ({ message: { content = '', type, extension, name } }) => {
	const [isImageViewOpened, setIsImageViewOpened] = useState(false);
	const checkType = useMemo(() => isFileOrImage(extension), [extension]);
	const { theme, getTheme } = useTheme();
	const classes = getTheme(theme);
	return (
		<>
			{(!type && !extension) || !content ? (
				<></>
			) : (
				<div className={`group relative flex flex-row-reverse items-stretch gap-2 px-8 mb-6`}>
					{checkType === 'message' ? (
						<div
							style={{
								backgroundColor: `var(--${classes})`,
							}}
							className={`relative rounded-lg p-2 text-white break-words max-w-[400px]`}
						>
							<div
								style={{
									borderBottomColor: `var(--${classes})`,
									borderLeftColor: `var(--${classes})`,
								}}
								className="absolute left-full bottom-[6px] border-8 border-t-transparent border-r-transparent"
							></div>
							<span>{content || ''}</span>
						</div>
					) : checkType === 'image' ? (
						<>
							<img
								src={content}
								alt="message"
								className="lg:max-w-[500px] lg:max-h-[300px] object-cover rounded-lg cursor-pointer hover:brightness-90"
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
							className="relative rounded-lg p-2 text-white  break-words max-w-[400px] "
							href={content}
							download={name}
							style={{
								backgroundColor: `var(--${classes})`,
							}}
						>
							<div
								style={{
									borderBottomColor: `var(--${classes})`,
									borderLeftColor: `var(--${classes})`,
								}}
								className="absolute left-full bottom-[6px] border-8 border-t-transparent border-r-transparent"
							></div>
							<div className="flex items-center w-full gap-2">
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

export default RightMessage;
