import { showToast } from 'nextjs-toast-notify';

export const successToast = (message: string) => {
  return showToast.success(message, {
    duration: 5000,
    progress: true,
    position: "top-right",
    transition: "fadeIn",
    icon: '',
    sound: true,
  });
}

export const errorToast = (message: string) => {
  return showToast.error(message, {
    duration: 5000,
    progress: true,
    position: "top-right",
    transition: "fadeIn",
    icon: '',
    sound: true,
  });
}