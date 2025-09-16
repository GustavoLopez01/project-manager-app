"use client"
import { FormEvent } from 'react';
import { signup } from '@/actions/auth';
import { errorToast } from '@/src/utils/toast';

export default function Login() {

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const response = await signup(formData);

    if (response?.errors) {
      response.errors.forEach(error =>
        errorToast(error.message)
      )
      return;
    }
  }

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-96 min-h-52 p-5 flex flex-col space-y-4 bg-white rounded-xl shadow"
        autoComplete="off"
      >
        <h1 className="w-full text-center py-2 text-2xl">
          Inicio de sesión
        </h1>

        <div className="grid gap-1">
          <label
            htmlFor="username"
          >
            Usuario
          </label>

          <input
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
            id="username"
            name="username"
            type="text"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="grid gap-1">
          <label
            htmlFor="username"
          >
            Contraseña
          </label>

          <input
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
            id="password"
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <input
          className="bg-indigo-500 text-white text-xl rounded-md w-full py-2 font-barlow-bold cursor-pointer hover:bg-indigo-600 transition-all"
          type="submit"
          value="Iniciar sesión"
        />

        <p className="text-sm text-center font-barlow-regular text-slate-600">
          ¿Aún no tienes una cuenta? - contacta con el administrador para acceder al sistema
        </p>
      </form>
    </>
  )
}
