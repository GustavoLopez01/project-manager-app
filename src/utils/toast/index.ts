import { showToast } from 'nextjs-toast-notify';

type ToastOptions = {
  duration: number,
  progress: boolean,
  position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
  transition: "fadeIn" | "swingInverted" | "bounceIn" | "popUp" | "topBounce" | "bounceInDown",
  icon: string,
  sound: boolean,
}

const OPTIONS: ToastOptions = {
  duration: 2000,
  progress: true,
  position: "top-right",
  transition: "fadeIn",
  icon: '',
  sound: true,
}

export const successToast = (message: string) => {
  return showToast.success(message, OPTIONS);
}

export const errorToast = (message: string) => {
  return showToast.error(message, OPTIONS);
}