import { User } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import axios from "axios";

export function createNewUser() {
  return axios.post("http://localhost:3000/api/user/register-user", {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
    bearedToken: sessionStorage.getItem("accessToken"),
    displayName: auth.currentUser?.displayName,
    photoUrl: auth.currentUser?.photoURL,
    emailVerified: auth.currentUser?.emailVerified,
  });
}

export function createNewUserWithGoogle(result: any) {

  const { email, uid, accessToken, displayName, photoURL, emailVerified} = result;

  // EMAIL, UID 
  console.log(email, uid, accessToken, displayName, photoURL, emailVerified)
  return axios.post("http://localhost:3000/api/user/register-user", {
    email: email,
    uid: uid,
    bearedToken: accessToken,
    displayName: displayName,
    photoURL: photoURL,
    emailVerified: emailVerified
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
  return axios.delete<User>(
    `http://localhost:3000/api/user/delete-user/${uid}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function rateActivityWithUser(
  uid: string,
  activityId: string,
  rating: number
) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.post<any>(
    `http://localhost:3000/api/rating/rate-activity`,
    {
      uid: uid,
      activityId: activityId,
      rating: rating, // Aquí utilizamos la variable 'rating' en lugar de 'activityRating'
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function getUserRatingInActivity(uid: string, activityId: string) {
  try {
    const accessToken = sessionStorage.getItem("accessToken");

    // Realizar la solicitud POST con Axios y pasar los datos en el cuerpo
    const response = await axios.post(
      `http://localhost:3000/api/rating/get-current-rating-in-activity`,
      {
        uid: uid,
        activityId: activityId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pasar el token de autorización en los encabezados
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error while getting user rating in activity:", error);
    throw new Error("An error occurred while getting user rating in activity");
  }
}

export async function getActivityMeanAndReviews(activityId: string) {
  try {
    const accessToken = sessionStorage.getItem("accessToken");

    // Realizar la solicitud POST con Axios y pasar los datos en el cuerpo
    const response = await axios.post(
      `http://localhost:3000/api/rating/get-reviews-and-average-rating`,
      {
        activityId: activityId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pasar el token de autorización en los encabezados
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error while getting user rating in activity:", error);
    throw new Error("An error occurred while getting user rating in activity");
  }
}

export async function commentActivity(
  uid: string,
  activityId: string,
  commentText: string
) {
  try {
    const accessToken = sessionStorage.getItem("accessToken");

    const response = await axios.post(
      `http://localhost:3000/api/user/comment-activity`,
      {
        uid: uid,
        activityId: activityId,
        commentText: commentText,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pasar el token de autorización en los encabezados
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error while commenting in activity:", error);
    throw new Error("An error occurred while commenting in activity");
  }
}

export function getActivityComments(activityId: string) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.post<any>(
    `http://localhost:3000/api/user/get-activity-comments`,
    {
      activityId: activityId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function editActivityComment(
  uid: string,
  commentId: string,
  newText: string
) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.post<any>(
    `http://localhost:3000/api/user/edit-comment`,
    {
      uid: uid,
      commentId: commentId,
      newText: newText,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

console.log(sessionStorage.getItem("accessToken"));
