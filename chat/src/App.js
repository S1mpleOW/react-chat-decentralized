import { Routes, Route } from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home';
import Main from './pages/Main';
import SignIn from './pages/SignIn';

function App() {
	return (
		<Routes>
			<Route element={<Main />}>
				<Route path="/" element={<Home />}></Route>
				<Route path="/chat/:id" element={<ChatRoom />}></Route>
			</Route>
			<Route path="/sign-in" element={<SignIn />}></Route>
		</Routes>
	);
}

export default App;
