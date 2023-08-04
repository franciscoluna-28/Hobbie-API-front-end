import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useActivitiesStore from "../store/activitiesStore";
import { deleteUser, updateProfile } from "firebase/auth";
import { deleteUserAPI } from "../api/users";
import { getFavoriteCategories } from "../api/activities";
import llamaPfp from "../assets/anonymousUserIcon.jpg";
import { getUserSavedActivitiesIds } from "../api/activities";

export default function UserProfile() {
  const { currentUser, token } = useAuthContext();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || llamaPfp);
  const userSavedActivities = useActivitiesStore(
    (state) => state.userSavedActivities
  );
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [numberOfSavedActivities, setNumberOfSavedActivities] = useState(0); // Estado para almacenar el número de actividades guardadas

  useEffect(() => {
    const fetchFavoriteCategories = async () => {
      try {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          const categoriesResponse = await getFavoriteCategories(currentUser.uid, token);
          const numberOfActivitiesResponse = await getUserSavedActivitiesIds(currentUser.uid)

          // Extraemos el array de categorías del objeto de respuesta
          const categories = categoriesResponse.favoriteCategories;

          setFavoriteCategories(categories);

          console.log(categoriesResponse)
          // Actualizamos el estado con el número de actividades guardadas
          setNumberOfSavedActivities(numberOfActivitiesResponse.data.numberOfSavedActivities);
        }
      } catch (error) {
        console.error("Error fetching favorite categories:", error);
      }
    };

    fetchFavoriteCategories();
  }, [currentUser]);

  const handleDelete = async () => {
    // ... Resto del código para eliminar el usuario ...
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-bold text-6xl text-left flex">User Profile</h2>
      <h4 className="font-bold text-xl text-accent">
        {displayName || "Anonymous User"}
      </h4>
      {(!currentUser?.displayName && currentUser?.photoURL === null) && (
        <div>
          {/* ... Mensaje para usuarios anónimos ... */}
        </div>
      )}
      <img className="h-16 w-16 rounded-full" src={photoURL} alt="User profile" />
      <h3>Email: {currentUser?.email}</h3>
      <h3>{currentUser?.emailVerified}</h3>
      <h3>Number of saved activities: {numberOfSavedActivities}</h3>
      
      {/* Sección de actividades favoritas */}
      <div>
        <h3>Favorite Categories:</h3>
        {favoriteCategories.map((category: any) => (
          <span key={category.category}>{category.category} ({category.count})</span>
        ))}
      </div>
      
      <button
        onClick={handleDelete}
        className="bg-main text-accent w-1/4 rounded-xl p-4 duration-200 hover:brightness-75"
      >
        Delete User
      </button>
    </div>
  );
}
