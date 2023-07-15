import { auth } from "../../firebase/firebase";
import axios from "axios";



export function createNewUser() {
  return axios.post("http://localhost:3000/api/user/register-user", {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
    bearedToken: sessionStorage.getItem("accessToken")
  });
}

export function registerUserToken(uid: string) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.post(`http://localhost:3000/api/user/register-user-token/${uid}`, {
    bearedToken: accessToken,
  });
}

console.log(sessionStorage.getItem("accessToken"))
