import Toast, {CTOptions} from 'cogo-toast';

const toastOptions = {
  position: 'top-right',
  hideAfter: 3,
} as CTOptions;

export function toastSuccess(message: string) {
  Toast.success(message, toastOptions);
}

export function toastInfo(message: string) {
  Toast.info(message, toastOptions);
}

export function toastWarn(message: string) {
  Toast.warn(message, toastOptions);
}

export function toastError(message: string) {
  Toast.error(message, toastOptions);
}
