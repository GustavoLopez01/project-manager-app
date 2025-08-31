
export default function CardProject() {
  return (
    <div className="p-5 rounded-md bg-white">
      <h1 className="font-black text-lg">
        Nombre del proyecto
      </h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit illum quisquam at tenetur nemo, explicabo quis esse nostrum id labore! Ipsum nesciunt aspernatur, ex modi recusandae libero excepturi dolore nostrum!
      </p>

      <div className="flex justify-center mt-3">
        <button
          className="bg-indigo-500 rounded-md font-bold w-full text-white text-center px-5 py-2 cursor-pointer hover:bg-indigo-600 transition-all"
        >
          Ver detalles
        </button>
      </div>
    </div>
  )
}
