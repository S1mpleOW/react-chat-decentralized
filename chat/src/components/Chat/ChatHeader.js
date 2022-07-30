import React, { useState } from 'react';
import PortalLayout from '../PortalLayout';
import Skeleton from '../skeleton/Skeleton';
import ConversationSetting from './ConversationSetting';
import MediaView from './MediaView';

const ChatHeader = () => {
	const [loading, setLoading] = useState(false);
	const [isConversationSettingsOpened, setIsConversationSettingsOpened] = useState(false);
	const [isViewMediaOpened, setIsViewMediaOpened] = useState(false);
	return (
		<>
			<div className="flex items-center justify-between h-[73px] px-5 border-b border-dark-green dark:border-dark-green-lighter">
				<div className="flex items-center flex-grow gap-3">
					{loading ? (
						<Skeleton width="40px" height="40px" radius="100%" />
					) : (
						<>
							<img
								src="https://source.unsplash.com/random"
								className="w-10 h-10 rounded-full"
								alt="avatar"
							/>
							<p>Name</p>
						</>
					)}
				</div>

				{!loading && (
					<div className="w-[100px]">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setIsConversationSettingsOpened(true);
							}}
						>
							<i className="text-2xl bx bxs-info-circle text-primary"></i>
						</button>
					</div>
				)}
			</div>

			<PortalLayout
				isOpened={isConversationSettingsOpened}
				setIsOpened={setIsConversationSettingsOpened}
			>
				<ConversationSetting
					setIsOpened={setIsConversationSettingsOpened}
					setMediaViewOpened={setIsViewMediaOpened}
				></ConversationSetting>
			</PortalLayout>

			<PortalLayout isOpened={isViewMediaOpened} setIsOpened={setIsViewMediaOpened}>
				<MediaView setIsOpened={setIsViewMediaOpened}></MediaView>
			</PortalLayout>
		</>
	);
};

export default ChatHeader;
