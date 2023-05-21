import { useActivityContext } from "../context/ActivitiesContext";
import 'react-toastify/dist/ReactToastify.css';
import Activity from "../components/Activity";
import { CustomActivity } from "../components/Activity";
import { ActivityType } from "../components/Activity";
import { useState } from "react";

export interface HobbieAPIResponse{
  data: CustomActivity[]
}

/* https://www.bugatti.com/fileadmin/_processed_/e/e/csm_og-image_506cf6a92e.jpg */
/* export const myImages = [
  {
    key: "1",
    activity: "Go for a walk",
    participants: 1,
    type: "Recreational",
    price: 0,
    link: "",
    accessibility: 0.1,
    image: {
      id: "1",
      urls: {
        raw: "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad",
        full: "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
        regular:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carwow.co.uk%2Fbest%2Fbest-supercars&psig=AOvVaw1ZXR5BzsZBmpdyFQgVLefM&ust=1684354186257000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCQpqnS-v4CFQAAAAAdAAAAABAE",
        small:
          "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        thumb:
          "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        small_s3:
          "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80&dpr=2",
      },
      user: {
        name: "John Doe",
        links: {
          self: "https://unsplash.com/@johndoe",
          photos: "https://unsplash.com/@johndoe",
        },
      },
    },
  },
]; */

/* participants, activity, type, price, 
    link, key, accessibility, image }: CustomActivity */

    export default function RecomendedActivities() {
      const { isLoading, error, activities, filteredActivities, filterRecommendedActivities } = useActivityContext();
      const [selectedType, setSelectedType] = useState(""); // Estado para almacenar el tipo de actividad seleccionada
    
      const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value as ActivityType;
        setSelectedType(type);
        filterRecommendedActivities(type);
      };
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>There was an error while loading...</div>;
      }
    
      return (
        <div>
          <label htmlFor="activityType">Choose the category of the activities</label>
    
          <select
            name="activityType"
            id="activityType"
            value={selectedType}
            onChange={handleFilterChange}
            className="mb-4"
          >
            <option value="">All</option>
            <option value={ActivityType.Education}>Education</option>
            <option value={ActivityType.Recreational}>Recreational</option>
            <option value={ActivityType.Social}>Social</option>
            <option value={ActivityType.DIY}>DIY</option>
            <option value={ActivityType.Charity}>Charity</option>
            <option value={ActivityType.Cooking}>Cooking</option>
            <option value={ActivityType.Relaxation}>Relaxation</option>
            <option value={ActivityType.Music}>Music</option>
            <option value={ActivityType.Busywork}>Busywork</option>
          </select>
    
          <h1 className="text-4xl text-gray-950 font-bold mb-8">Recommended Activities</h1>
          <div className="flex gap-4">
            {selectedType === "" ? (
              activities.map((activityData: CustomActivity) => (
                <Activity {...activityData} key={activityData.id} />
              ))
            ) : (
              filteredActivities.map((activityData: CustomActivity) => (
                <Activity {...activityData} key={activityData.id} />
              ))
            )}
          </div>
        </div>
      );
    }
