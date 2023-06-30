import { auth } from "../../firebase/firebase";
import axios from "axios";

export function createNewUser() {
  return axios.post("http://localhost:3000/users/register-user", {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
  });
}
