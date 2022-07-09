import React, { useState } from 'react';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatWindow from '../components/Chat/ChatWindow';
import InputSection from '../components/Chat/InputSection';

const ChatRoom = () => {
	const [loading, setLoading] = useState(false);
	const [inputSectionOffset, setInputSectionOffset] = useState(0);
	return (
		<div className="flex flex-col items-stretch flex-grow h-screen">
			{loading ? (
				<>
					<div className="h-20 border-b border-dark-lighten"></div>
					<div className="flex-grow"></div>
					<InputSection disabled />
				</>
			) : (
				<>
					<ChatHeader></ChatHeader>
					<ChatWindow inputSectionOffset={inputSectionOffset}></ChatWindow>
					<InputSection setInputSectionOffset={setInputSectionOffset} disabled={false} />
				</>
			)}
		</div>
	);
};

export default ChatRoom;
