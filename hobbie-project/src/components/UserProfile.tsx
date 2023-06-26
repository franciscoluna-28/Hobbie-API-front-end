import { useActivityContext } from "../context/ActivitiesContext";
import { useAuthContext } from "../context/UserAuthContext";

export default function UserProfile() {
  const { currentUser } = useAuthContext();
  const { savedActivities } = useActivityContext();

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-bold text-6xl text-left flex">User Profile</h2>
      <h3>Email: {currentUser?.email}</h3>
      <h3>{currentUser?.emailVerified}</h3>
      <h3>Number of saved activities: {savedActivities.length}</h3>
    </div>
  );
}
