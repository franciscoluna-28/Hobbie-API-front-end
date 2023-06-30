import { toast, ToastOptions } from "react-toastify";

class NotificationService {
  private defaultOptions: ToastOptions;

  constructor() {
    this.defaultOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
  }

  public success(message: string): void {
    toast.success(message, this.defaultOptions);
  }

  public error(message: string): void {
    toast.error(message, this.defaultOptions);
  }
}

export default new NotificationService();
