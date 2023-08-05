import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useActivitiesStore from "../store/activitiesStore";
import { deleteUser, updateProfile } from "firebase/auth";
import { deleteUserAPI } from "../api/users";
import { getFavoriteCategories } from "../api/activities";
import llamaPfp from "../assets/anonymousUserIcon.jpg";
import { getUserSavedActivitiesIds } from "../api/activities";
import NotificationService from "../utils/ToastMessages";
import { Modal } from "flowbite-react"; // Step 1: Import the Modal component

export default function UserProfile() {
  const { currentUser, token } = useAuthContext();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || llamaPfp);
  const userSavedActivities = useActivitiesStore(
    (state) => state.userSavedActivities
  );
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [numberOfSavedActivities, setNumberOfSavedActivities] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Step 2: State for confirmation modal
  // Estado para almacenar el número de actividades guardadas

  useEffect(() => {
    const fetchFavoriteCategories = async () => {
      try {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          const categoriesResponse = await getFavoriteCategories(
            currentUser.uid,
            token
          );
          const numberOfActivitiesResponse = await getUserSavedActivitiesIds(
            currentUser.uid
          );

          // Extraemos el array de categorías del objeto de respuesta
          const categories = categoriesResponse.favoriteCategories;

          setFavoriteCategories(categories);

          console.log(categoriesResponse);
          // Actualizamos el estado con el número de actividades guardadas
          setNumberOfSavedActivities(
            numberOfActivitiesResponse.data.numberOfSavedActivities
          );
        }
      } catch (error) {
        console.error("Error fetching favorite categories:", error);
      }
    };

    fetchFavoriteCategories();
  }, [currentUser]);


  const handleDelete = async () => {
    try {
      setShowDeleteConfirmation(true); // Show the confirmation modal
    } catch (error) {
      NotificationService.error(
        "Account couldn't be deleted. Try to login again or check your internet connection"
      );
    }
  };

  const confirmAccountDeletion = async (uid: string) => {
    try {
      // Close the confirmation modal
      setShowDeleteConfirmation(false);
      if (currentUser) {
        // Deleting the user from Firebase
        await deleteUser(currentUser);

        // Deleting the user from Hobby Explore
        await deleteUserAPI(uid);

        // Provide a success notification to the user
        NotificationService.success("Account deleted successfully!");
      }
    } catch (error: any) {
      // Handle specific error codes if needed
      if (error.code === "auth/requires-recent-login") {
        NotificationService.error(
          "You need to log in again to delete your account."
        );
      } else if (error.code === "auth/network-request-failed") {
        NotificationService.error(
          "Unable to delete account. Check your internet connection."
        );
      } else {
        NotificationService.error(
          "Account couldn't be deleted. Please try again later."
        );
      }
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-bold text-6xl text-left flex">User Profile</h2>
      <h4 className="font-bold text-xl text-accent">
        {displayName || "Anonymous User"}
      </h4>
      {!currentUser?.displayName && currentUser?.photoURL === null && (
        <div>{/* ... Mensaje para usuarios anónimos ... */}</div>
      )}
      <img
        className="h-16 w-16 rounded-full"
        src={photoURL}
        alt="User profile"
      />
      <h3>Email: {currentUser?.email}</h3>
      <h3>{currentUser?.emailVerified}</h3>
      <h3>Number of saved activities: {numberOfSavedActivities}</h3>

      {/* Sección de actividades favoritas */}
      <div>
        <h3>Favorite Categories:</h3>
        {favoriteCategories.map((category: any) => (
          <span key={category.category}>
            {category.category} ({category.count})
          </span>
        ))}
      </div>

      <button
        onClick={handleDelete}
        className="bg-main text-accent w-1/4 rounded-xl p-4 duration-200 hover:brightness-75"
      >
        Delete User
      </button>
      <Modal
        show={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <div>
          <h3>Confirm Account Deletion</h3>
          <p>Are you sure you want to delete your account?</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => confirmAccountDeletion(currentUser?.uid || "")}
              className="bg-red-500 text-white rounded px-4 py-2 mr-4"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirmation(false)}
              className="bg-gray-300 text-gray-800 rounded px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
