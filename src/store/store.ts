import { create } from 'zustand';
import { Routes } from '../types';

type State = {
  showSidebar: boolean
  routes: Routes[]
}

type Action = {
  setShowSidebar: (show: boolean) => void
  setRoutes: (routes: Routes[]) => void
}

const store = create<State & Action>((set) => ({
  showSidebar: true,
  routes: [],
  setShowSidebar: (showSidebar) => set({ showSidebar }),
  setRoutes: (routes) => set({ routes }),
}));

export default store;