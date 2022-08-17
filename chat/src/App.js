import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Toggle from './components/toggle/Toggle';
import ChatRoom from './pages/ChatRoom';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Gun from 'gun';
import { useEffect } from 'react';
import { useDarkModeSetting, useUserStore } from './store';
import HomeChat from './pages/HomeChat';
import HomePage from './pages/HomePage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
						<div className="absolute right-0 z-10 inline-block m-3 top-2 translate-y-[1px] ">
							<Toggle on={darkMode} onClick={toggleDarkMode}></Toggle>
						</div>
						<ToastContainer
							position="top-right"
							autoClose={3000}
							hideProgressBar={false}
							newestOnTop
							closeOnClick
							rtl={false}
							pauseOnFocusLoss={false}
							draggable
							pauseOnHover
							theme={darkMode ? 'dark' : 'light'}
						/>
						<Outlet />
					</>
				}
			>
				<Route
					element={
						<>
							{!user ? (
								<>
									<HomePage></HomePage>
								</>
							) : (
								<Outlet />
							)}
						</>
					}
				>
					<Route element={<Main />}>
						<Route path="/" element={<HomeChat />}></Route>
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
