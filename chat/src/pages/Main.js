import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { MessageProvider } from '../contexts/messageContext';

const Main = () => {
	return (
		<div className="flex">
			<MessageProvider>
				<SideBar />
				<Outlet />
			</MessageProvider>
		</div>
	);
};

export default Main;
