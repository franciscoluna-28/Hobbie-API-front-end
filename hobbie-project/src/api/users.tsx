import { User } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import axios from "axios";

export function createNewUser() {
  return axios.post("http://localhost:3000/api/user/register-user", {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
    bearedToken: sessionStorage.getItem("accessToken"),
  });
}

export function registerUserToken(uid: string) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.post(
    `http://localhost:3000/api/user/register-user-token/${uid}`,
    {
      bearedToken: accessToken,
    }
  );
}
export function deleteUserAPI(uid: string) {
  const accessToken = sessionStorage.getItem("accessToken");
  return axios.delete<User>(`http://localhost:3000/api/user/delete-user/${uid}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}


console.log(sessionStorage.getItem("accessToken"));
