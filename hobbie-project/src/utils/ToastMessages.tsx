import { toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const toastMessages = {
  successOnSavingActivity: "Congratulations! You've saved a new activity to your collection",
  errorOnDeletingActivity: "There was an error while deleting the activity! Check your internet connection",
  errorOnSavingActivity: "There was an error saving the activity. Please, check your internet connection",
  sucessOnDeletingActivity: "Activity deleted successfully"
}

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

