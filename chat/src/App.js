import { Routes, Route, Outlet } from 'react-router-dom';
import Toggle from './components/toggle/Toggle';
import { useDarkmode } from './contexts/darkmodeContext';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Gun from 'gun';
import { useEffect } from 'react';
import useDarkModeSetting from './store';
export const gun = new Gun({
	peers: ['http://localhost:8765/gun'],
});

function App() {
	const darkMode = useDarkModeSetting((state) => state.darkMode);
	const toggleDarkMode = useDarkModeSetting((state) => state.toggleDarkMode);
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
				<Route element={<Main />}>
					<Route path="/" element={<Home />}></Route>
					<Route path="/chat/:id" element={<ChatRoom />}></Route>
				</Route>
				<Route path="/sign-in" element={<SignIn />}></Route>
				<Route path="/sign-up" element={<SignUp />}></Route>
			</Route>
		</Routes>
	);
}

export default App;
