import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Toggle from './components/toggle/Toggle';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Gun from 'gun';
import { useEffect } from 'react';
import { useDarkModeSetting, useUserStore } from './store';

function App() {
	const darkMode = useDarkModeSetting((state) => state.darkMode);
	const toggleDarkMode = useDarkModeSetting((state) => state.toggleDarkMode);
	const { user, setUser } = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			if (user.pub) {
				gun.user(user.pub).once((user) => {
					const userInfo = {
						userName: user?.alias,
						userPub: user?.pub, //public key
					};
					setUser(userInfo);
				});
			}
			navigate(`/`);
		} else {
			navigate(`/sign-in`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (darkMode) {
			document?.documentElement?.classList.add('dark');
		} else {
			console.log(darkMode);
			document?.documentElement?.classList.remove('dark');
		}
	}, [darkMode]);

	return (
		<Routes>
			<Route
				element={
					<>
						<div className="absolute top-0 right-0 z-10 inline-block m-3 ">
							<Toggle on={darkMode} onClick={toggleDarkMode}></Toggle>
						</div>
						<Outlet />
					</>
				}
			>
				<Route
					element={
						<>
							{!user ? (
								<>
									<h1>Please login to chat</h1>
								</>
							) : (
								<Outlet />
							)}
						</>
					}
				>
					<Route element={<Main />}>
						<Route path="/" element={<Home />}></Route>
						<Route path="/chat/:id" element={<ChatRoom />}></Route>
					</Route>
				</Route>
				<Route path="/sign-in" element={<SignIn />}></Route>
				<Route path="/sign-up" element={<SignUp />}></Route>
			</Route>
		</Routes>
	);
}

export const gun = new Gun({
	peers: ['http://localhost:8765/gun'],
	localStorage: false,
});

export default App;
