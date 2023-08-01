import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Rate from "../components/ui/Rating";
import useRating from "../hooks/useRating";
import CommentActivityForm from "../components/form/commentActivityForm";
import ActivityComments from "../components/activityComments";
import useActivityDetails from "../hooks/useActivityDetails";
import ActivityDetailsSection from "../components/ui/activityDetailsSection";
import { PulseLoader } from "react-spinners";

type ActivityParams = {
  activityId: string;
};

const ActivityDetails = () => {
  const { activityId } = useParams<keyof ActivityParams>() as ActivityParams;
  const { token, currentUser } = useAuthContext();
  const formattedToken = token || "";
  const { selectedActivity, isLoading, status } = useActivityDetails(
    activityId,
    formattedToken
  );

  /*   const {
    currentActivityRatingFromUser,
    totalRatingInActivityFromAllUsers,
    averageUsersRatingInActivity,
  } = useRating(activityId);
 */
  if (isLoading) {
    return <PulseLoader className="m-auto" color="#00C9A7" />;
  }

  if (status === "error") {
    return <div>There was an error while loading</div>;
  }

  if (!selectedActivity) {
    return <div>Activity not found</div>;
  }

  return (
    <div className="flex flex-col">
      <ActivityDetailsSection {...selectedActivity} />
      <CommentActivityForm activityId={activityId} />
      <ActivityComments activityId={activityId} userUid={currentUser.uid} />
    </div>
  );
};

export default ActivityDetails;
