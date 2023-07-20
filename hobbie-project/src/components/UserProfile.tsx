import { useAuthContext } from "../hooks/useAuthContext";
import { useActivityContext } from "../context/ActivitiesContext";
import { deleteUser } from "firebase/auth";
import { deleteUserAPI } from "../api/users";
export default function UserProfile() {
  const { currentUser } = useAuthContext();
  const { savedActivities } = useActivityContext();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        if (currentUser) {
          // deletes the user from firebase
          await deleteUser(currentUser);

          // deletes the user from the current database
          await deleteUserAPI(currentUser.uid);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        // Handle errors or show error messages to the user.
      }
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-bold text-6xl text-left flex">User Profile</h2>
      <h3>Email: {currentUser?.email}</h3>
      <h3>{currentUser?.emailVerified}</h3>
      <h3>Number of saved activities: {savedActivities.length}</h3>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white w-1/4 rounded-sm p-4 duration-200 hover:brightness-75"
      >
        Delete User
      </button>
    </div>
  );
}
