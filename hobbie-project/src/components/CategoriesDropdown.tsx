import { useState, useEffect } from "react";
import { ActivityType } from "./Activity";
import { useActivityContext } from "../context/ActivitiesContext";



export default function CategoriesDropdown() {
    const { currentKeyword, setCurrentKeyword } = useActivityContext();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setCurrentKeyword(selectedValue);
  };

  useEffect(() => {
    console.log(currentKeyword);
  }, [currentKeyword]);

  return (
    <>
      <label htmlFor="activityType">Choose the category of the activities</label>
      <select
        name="activityType"
        id="activityType"
        value={currentKeyword}
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
    </>
  );
}
