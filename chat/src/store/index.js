import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const darkmodeSetting = (set) => {
	return {
		darkMode: false,
		toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
	};
};

const userStore = (set) => {
	if (sessionStorage.getItem('pair')) {
		return {
			user: JSON.parse(sessionStorage.getItem('pair')),
			setUser: (user) => set(() => ({ user })),
		};
	}
	return {
		user: null,
		setUser: (user) => set(() => ({ user })),
	};
};

const useDarkModeSetting = create(persist(devtools(darkmodeSetting), { name: 'darkmode_setting' }));
const useUserStore = create(devtools(userStore));

export { useDarkModeSetting, useUserStore };
