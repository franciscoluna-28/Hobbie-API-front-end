import axios from "axios";
import { IUserComment } from "../types/comments";

export function addUserCommentToActivity(
  uid: string,
  activityId: string,
  commentText: string
) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.post<IUserComment>(
    "http://localhost:3000/api/comment/add-comment-in-activity",
    {
      uid: uid,
      activityId: activityId,
      commentText: commentText,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function getAllCommentsFromActivity(activityId: string) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.get<IUserComment[]>(
    `http://localhost:3000/api/comment/get-comments-from-activity/${activityId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function removeCommentFromActivity(
  uid: string,
  activityId: string,
  commentId: string
) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.delete(
    `http://localhost:3000/api/comment/remove-comment-from-activity/${uid}/${activityId}/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function editCommentFromActivity(
  uid: string,
  activityId: string,
  commentId: string,
  newText: string
) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.post<IUserComment>(
    `http://localhost:3000/api/comment/edit-comment-from-activity/${uid}/${activityId}/${commentId}`,
    {
      newText: newText,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
