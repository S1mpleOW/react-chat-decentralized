import { createContext, useContext, useReducer, useState } from 'react';

const messageContext = createContext();
// db: [conversationId, messages: [{ sender, message, receiver, createdAt }]]
const reducer = (state, dispatch) => {
	switch (dispatch.type) {
		case 'GET_MESSAGES':
			if (state.length === 0) {
				return { messages: [dispatch.payload.messages] };
			} else {
				let newMessages = [...state?.messages, dispatch.payload?.messages];
				newMessages = newMessages.sort((a, b) => (a.createdAt >= b.createdAt ? 1 : -1));
				return { messages: newMessages };
			}
		case 'CLEAR_MESSAGES':
			console.log('CLEAR_MESSAGES');
			return { messages: [] };
		case 'REMOVE_MESSAGE':
			return state.filter((message) => message.id !== dispatch.payload);
		default:
			return state;
	}
};

const MessageProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, []);
	const [type, setType] = useState('approved');
	return (
		<messageContext.Provider
			value={{ state, dispatch, type, setType }}
			{...props}
		></messageContext.Provider>
	);
};

const useMessageContext = () => {
	const context = useContext(messageContext);
	if (typeof context === 'undefined') {
		throw new Error('useMessageContext must be used within a MessageProvider');
	}
	return context;
};

export { MessageProvider, useMessageContext };
