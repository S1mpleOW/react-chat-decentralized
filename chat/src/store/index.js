import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const darkmodeSetting = (set) => ({
	darkMode: false,
	toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
});

const useDarkModeSetting = create(persist(devtools(darkmodeSetting), { name: 'darkmode_setting' }));
export default useDarkModeSetting;
