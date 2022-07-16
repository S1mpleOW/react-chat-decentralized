import { Routes, Route, Outlet } from 'react-router-dom';
import Toggle from './components/toggle/Toggle';
import { useDarkmode } from './contexts/darkmodeContext';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import Gun from 'gun';
export const gun = new Gun({
	peers: ['http://localhost:4000/gun'],
});

function App() {
	const { darkmode, setDarkmode } = useDarkmode();
	return (
		<Routes>
			<Route
				element={
					<>
						<div className="absolute top-0 right-0 z-10 inline-block m-3 ">
							<Toggle on={darkmode} onClick={() => setDarkmode(!darkmode)}></Toggle>
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
			</Route>
		</Routes>
	);
}

export default App;
