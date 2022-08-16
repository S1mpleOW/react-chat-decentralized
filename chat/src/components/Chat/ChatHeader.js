import React, { useEffect, useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import { useParams } from 'react-router-dom';
import { gun } from '../../App';
import InfoIcon from '../icon/InfoIcon';
import VideoIcon from '../icon/VideoIcon';
import PortalLayout from '../PortalLayout';
import Skeleton from '../skeleton/Skeleton';
import ConversationSetting from './ConversationSetting';
import MediaView from './MediaView';

const ChatHeader = () => {
	const [loading, setLoading] = useState(false);
	const [isConversationSettingsOpened, setIsConversationSettingsOpened] = useState(false);
	const [isViewMediaOpened, setIsViewMediaOpened] = useState(false);
	const conversationId = useParams();
	const [receiver, setReceiver] = useState(null);
	useEffect(() => {
		if (conversationId && conversationId.id) {
			gun
				.get('users')
				.get(conversationId.id)
				.on((data, id) => {
					if (data) {
						setReceiver({
							id: id,
							name: data.name,
							isOnline: data.isOnline,
							photoURL: `${process.env.REACT_APP_AVATAR}/${data.name}.svg`,
						});
					}
				});
		}
	}, [conversationId]);
	const startVideoCall = () => {
		setLoading(true);
	};
	return (
		<>
			<div className="flex items-center justify-between h-[73px] px-5 border-b border-dark-green dark:border-dark-green-lighter">
				<div className="flex items-center flex-grow gap-3">
					{!receiver ? (
						<Skeleton width="40px" height="40px" radius="100%" />
					) : (
						<>
							<img src={receiver?.photoURL} className="w-10 h-10 rounded-full" alt="avatar" />
							<p>Name</p>
						</>
					)}
				</div>

				<div className="w-[130px] flex items-center gap-2">
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsConversationSettingsOpened(true);
						}}
					>
						<InfoIcon></InfoIcon>
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							startVideoCall();
						}}
					>
						<VideoIcon className="text-primary"></VideoIcon>
					</button>
				</div>

				{loading && (
					<>
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-800 bg-opacity-80 ">
							<Spin color="#62A388" className="w-[100px] h-[100px]" />
						</div>
					</>
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
