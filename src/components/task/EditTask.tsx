"use client"
import { useState, ReactNode } from 'react';
import CustomDialog from '../ui/Dialog';

type EditTaskProps = {
  children: ReactNode
  isOpen: boolean
  setIsOpen: () => void
}

export default function EditTask({ children, isOpen, setIsOpen }: EditTaskProps) {

  const handleEditTask = async () => {

  }

  return (
    <>
      <CustomDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <h1 className="text-center font-bold text-2xl">
          Nueva tarea
        </h1>
        <form
          action={handleEditTask}
          autoComplete="off"
        >
          {children}
          <input
            type='submit'
            className='border-1 border-indigo-500 text-indigo-600 px-2 py-1 w-full rounded-md mt-5 cursor-pointer'
            value="Guardar cambios"
          />
        </form>
      </CustomDialog>
    </>
  )
}
