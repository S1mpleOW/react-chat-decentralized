import React from 'react';
import { Link } from 'react-router-dom';
import ArrowRightIcon from './icon/ArrowRightIcon';

const HomeBody = () => {
	return (
		<div className=" mx-auto px-5 w-full xl:max-w-[1920px]">
			<div className="flex flex-col gap-8 mt-2 md:gap-12 md:px-12 md:mt-12 xl:gap-24 xl:mt-24 xl:px-24 lg:flex-row">
				<div className="w-full lg:w-1/2 text-dark-green dark:text-white">
					<h1 className="font-bold text-[35px] md:text-[45px] xl:text-[56px] capitalize">
						Monkey Message
					</h1>
					<span className="block mt-2 mb-4 text-base md:mt-4 md:mb-8 md:text-lg xl:my-8 dark:text-slate-300">
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
				<div className="w-full lg:w-1/2">
					<div className="flex bg-gradient-to-b from-green-primary to-green-secondary p-[40px] xl:p-[80px] rounded-2xl">
						<img src="/Banner.png" className="object-cover w-full h-full ml-auto" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeBody;
