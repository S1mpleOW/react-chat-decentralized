import React, { useState } from 'react';
import InputSection from '../components/Chat/InputSection';

const ChatRoom = () => {
	const [loading, setLoading] = useState(true);
	return (
		<div className="flex flex-col items-stretch flex-grow h-screen">
			{loading ? (
				<>
					<div className="h-20 border-b border-dark-lighten"></div>
					<div className="flex-grow"></div>
					<InputSection disabled={false} />
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default ChatRoom;
