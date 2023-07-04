import { useEffect } from "react";
import { ActivityType } from "./Activity";
import { useActivityContext } from "../context/ActivitiesContext";
import {AiOutlineCaretDown} from "react-icons/ai";

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
      <div className="group block">
        <select
          name="activityType"
          id="activityType"
          value={currentKeyword}
          onChange={handleFilterChange}
          className="bg-main text-accent p-4 pr-10 flex hover:brightness-75 rounded-lg appearance-none text-xl font-bold"
        >
          {categoryOptions.map((option) => (
            <option
              className="bg-white text-black/70 appearance-none text-center my-2 border-none block py-4"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <AiOutlineCaretDown className="-translate-x-2 group-hover:brightness-75 h-4 w-4 font-bold text-xl scale-125 text-accent" />
        </div>
      </div>
    </>
  );
}