import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityById } from '../api/activities';
import { useAuthContext } from '../hooks/useAuthContext';
import Rate from '../components/ui/activityCard/Rating';
import { getUserRatingInActivity } from '../api/users';
import { auth } from '../../firebase/firebase';

const ActivityDetails = () => {
  const { activityId } = useParams();
  const { token } = useAuthContext();
  const formattedToken = token || '';

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activity = await getActivityById(activityId, formattedToken);
        setSelectedActivity(activity);
        setLoading(false);

        // Obtenemos el currentRating del usuario en la actividad
        const ratingResponse = await getUserRatingInActivity(auth.currentUser?.uid, activityId);
        if (ratingResponse.status === 200) {
          setCurrentRating(ratingResponse.data); // Actualizamos el estado con el currentRating de la API
        } else {
          setCurrentRating(0); // Si no existe el rating, establecemos el valor en 0 por defecto
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId, formattedToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedActivity) {
    return <div>Activity not found</div>;
  }

  console.log(selectedActivity);
  console.log(currentRating);

  return (
    <div>
      {/* Pasamos activityId y currentRating como props a Rate */}
      <Rate activityId={activityId} currentRating={currentRating} />
      <h2 className="font-bold text-5xl">{selectedActivity.activity}</h2>
      {/* Render the rest of the information about the activity here */}
      <p>{selectedActivity.description}</p>
      {/* Display the links here */}
      <h4 className='font-bold text-4xl'>Discover more here</h4>
      {Object.entries(selectedActivity.links[0]).map(([name, url]) => (
        <div key={name}>
          <p>{name}</p>
          <a href={url}>{url}</a>
        </div>
      ))}
    </div>
  );
};

export default ActivityDetails;
