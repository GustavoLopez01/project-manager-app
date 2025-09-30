"use client"
import { IoNotifications } from 'react-icons/io5';
import { IoIosMenu } from 'react-icons/io';
import store from '@/src/store/store';

export default function Navbar() {
  const showSidebar = store((state) => state.showSidebar);
  const setShowSidebar = store((state) => state.setShowSidebar);
  return (
    <>
      <nav className="w-full h-15 bg-white shadow top-0">
        <div className="flex justify-end h-full relative">
          <span className="absolute right-8.5 text-[11px] top-2 font-barlow-bold bg-amber-500 rounded-full w-4 text-center h-4">
            1
          </span>
          <div className="flex items-center px-5">
            <IoIosMenu
              className="size-5 cursor-pointer"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
          <div className="flex items-center pr-10">
            <IoNotifications className="size-5 cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  )
}
