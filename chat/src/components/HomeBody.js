import React from 'react';
import { Link } from 'react-router-dom';
import ArrowRightIcon from './icon/ArrowRightIcon';

const HomeBody = () => {
	return (
		<div className="container-fluid">
			<div className="flex gap-24 px-24 mt-24">
				<div className="w-1/2 text-dark-green dark:text-white">
					<h1 className="font-bold text-[56px] capitalize">Monkey Message</h1>
					<span className="block my-8 text-lg dark:text-slate-300">
						Monkey Chat Dapp is a decentralized chat app implemented using GunJS with modern
						features: real-time messaging, send or receive files, and video-call. Your privacy is
						our priority where <strong>"no one individual has control entire network"</strong>, even
						us. So join now!
					</span>
					<div className="flex gap-5 text-dark-lighten dark:text-white">
						<Link to="/sign-up" className="button-homepage">
							<span className="gap-2">
								<p>Start</p>
								<ArrowRightIcon></ArrowRightIcon>
							</span>
						</Link>
					</div>
				</div>
				<div className="w-1/2">
					<div className="flex bg-gradient-to-b from-green-primary to-green-secondary p-[80px] rounded-2xl">
						<img src="/Banner.png" className="object-cover w-full h-full ml-auto" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeBody;
