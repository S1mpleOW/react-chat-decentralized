import { createContext, useContext, useReducer } from 'react';
import Gun from 'gun';
const gun = Gun({
	peers: ['http://localhost:4000/gun'],
});

const messageContext = createContext();

const reducer = (state, dispatch) => {
	switch (dispatch.type) {
		case 'ADD_MESSAGE':
			const message = gun.get('messages-room1');
			message.set(dispatch.payload);
			return [...state, dispatch.payload];
		case 'GET_MESSAGES':
			const messages = gun.get('messages-room1');
			let messagesArray = [];
			messages.map().on((m) => {
				messagesArray.push(m);
			});
			return [...state, ...messagesArray];
		case 'REMOVE_MESSAGE':
			return state.filter((message) => message.id !== dispatch.payload);
		default:
			return state;
	}
};

const MessageProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, []);
	return <messageContext.Provider value={{ state, dispatch }} {...props}></messageContext.Provider>;
};

const useMessageContext = () => {
	const context = useContext(messageContext);
	if (typeof context === 'undefined') {
		throw new Error('useMessageContext must be used within a MessageProvider');
	}
	return context;
};

export { MessageProvider, useMessageContext };
