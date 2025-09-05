"use client"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

type CustomDialogProps = {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function CustomDialog({
  children,
  isOpen,
  setIsOpen
}: CustomDialogProps) {

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => { }}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full relative max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <IoMdClose
                className="text-black hover:text-black/50 size-5 cursor-pointer absolute right-2 top-2"
                onClick={close}
              />
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}