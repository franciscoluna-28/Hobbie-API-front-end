import { useEffect } from "react";
import { ActivityType } from "./Activity";
import { useActivityContext } from "../context/ActivitiesContext";

const categoryOptions = [
  { value: "", label: "All" },
  { value: ActivityType.Education, label: "Education" },
  { value: ActivityType.Recreational, label: "Recreational" },
  { value: ActivityType.Social, label: "Social" },
  { value: ActivityType.DIY, label: "DIY" },
  { value: ActivityType.Charity, label: "Charity" },
  { value: ActivityType.Cooking, label: "Cooking" },
  { value: ActivityType.Relaxation, label: "Relaxation" },
  { value: ActivityType.Music, label: "Music" },
  { value: ActivityType.Busywork, label: "Busywork" },
];

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
      <label htmlFor="activityType" className="text-gray-400 text-xl">
        Filter Activities by Category
      </label>
      <select
        name="activityType"
        id="activityType"
        value={currentKeyword}
        onChange={handleFilterChange}
        className="mb-4 bg-main mt-4 text-white p-4 flex rounded-lg text-xl font-bold"
      >
        {categoryOptions.map((option) => (
          <option className="bg-white text-black/70 appearance-none text-center my-2 border-none block py-4" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
