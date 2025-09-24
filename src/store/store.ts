import { create } from 'zustand';

type State = {
  showSidebar: boolean
}

type Action = {
  setShowSidebar: (show: boolean) => void
}

const store = create<State & Action>((set) => ({
  showSidebar: true,
  setShowSidebar: (showSidebar) => set({ showSidebar })
}))

export default store;