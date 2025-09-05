import CustomDialog from '../ui/Dialog';
import { IoWarningOutline } from 'react-icons/io5';

type DeleteModalProps = {
  isOpen: boolean
  message: String
  setIsOpen: () => void
  onAccept: () => void
  onCancel: () => void
}

export default function DeleteModal({
  isOpen,
  message,
  setIsOpen,
  onAccept,
  onCancel
}: DeleteModalProps) {
  return (
    <>
      <CustomDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="grid gap-6">
          <h1 className="font-bold flex flex-col gap-2 items-center text-xl">
            <IoWarningOutline
              className="text-yellow-400 size-20"
            />
            Atención
          </h1>

          <p className="text-center">
            ¿Estas seguro de eliminar {" "}
            <span className="font-bold">
              {message}
            </span>
          </p>

          <div className="flex justify-center gap-3">
            <button
              className="bg-zinc-200 font-bold px-4 rounded-full py-1 cursor-pointer"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className="bg-indigo-500 text-white font-bold px-4 rounded-full py-1 cursor-pointer"
              onClick={onAccept}
            >
              Aceptar
            </button>
          </div>
        </div>
      </CustomDialog>
    </>
  )
}
