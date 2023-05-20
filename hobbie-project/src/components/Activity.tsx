import { BsFillPeopleFill } from "react-icons/bs";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useActivityContext } from "../context/ActivitiesContext";


// Enums
export enum ActivityType {
  Education = "education",
  Recreational = "recreational",
  Social = "social",
  DIY = "diy",
  Charity = "charity",
  Cooking = "cooking",
  Relaxation = "relaxation",
  Music = "music",
  Busywork = "busywork",
}

// Intefaces
export interface Activity {
  participants: number;
  activity: string;
  type: ActivityType;
  price: number;
  link: string;
  id: string;
  accessibility: Accessibility;
}

export interface UnsplashImage {
  id: string;
  urls?: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  user?: {
    name: string;
    links: {
      self: string;
      phothos: string;
    };
  };
}

// Activity with Unsplash Image Properties
export interface CustomActivity extends Activity {
  image?: UnsplashImage;
}

// Type accesibility
export type Accessibility = number;

export default function Activity({
  participants,
  activity,
  type,
  price,
  link,
  id,
  accessibility,
  image,
}: CustomActivity) {
  // Getting the savedActivities from the context and the function for
  // saving them
  const { savedActivities, saveActivity } = useActivityContext();

  return (
    <article
      className="bg-white shadow-md border-2 rounded-lg overflow-hidden min-h-fit h-full max-w-xl"
    >
      <img
        className="w-auto h-full"
        src={image?.urls?.regular}
        alt="Activity"
      ></img>
      <div className="p-4">
        <h2 className="font-bold py-2 text-start text-4xl text-gray-900">
          {activity}
        </h2>
        <div className="flex gap-2 items-center">
          <div className="w-auto">
            <h5 className="text-start text-gray-400 mb-2 font-semibold">
              Category:
            </h5>
            <div className="border-main border-2 text-center p-2 rounded-xl w-full">
              <p className="font-semibold text-main first-letter:capitalize">
                {type}
              </p>
            </div>
          </div>
        </div>
        <ul>
          <li className="flex gap-2 items-center">
            <div className="w-full flex-col justify-center flex-wrap gap-4 mt-4">
              <div className="flex items-center mb-2">
                <FaMoneyBillAlt className="mt-1 mr-2 text-main" />
                <h5 className="text-gray-400 font-normal text-xl">
                  Cost range: {price} / 1
                </h5>
              </div>
              <div className="flex items-center mb-2">
                <SiLevelsdotfyi className="mt-1 mr-2 text-main" />
                <h5 className="text-gray-400 font-normal text-xl">
                  Accessibility: {id} / 1
                </h5>
              </div>
              <div className="flex items-center">
                <BsFillPeopleFill className="mt-1 mr-2 text-main" />
                <h5 className="text-gray-400 font-normal text-xl">
                  Participants: {participants}
                </h5>
              </div>
            </div>
          </li>
        </ul>
        <button className="text-white cursor-pointer font-semibold bg-main px-4 my-4 py-2 rounded-lg text-xl w-full">
          See the image
        </button>
        <button
          onClick={() => saveActivity(id)}
          disabled={savedActivities.some(
            (activity) => activity.id === id
          )}
          className="cursor-pointer hover:brightness-90 duration-200 text-white font-semibold disabled:brightness-75 bg-main px-4 my-4 py-2 rounded-lg text-xl w-full"
        >
          {savedActivities.find(
            (activity) => activity.id === id
          )
            ? "Activity Saved"
            : "Save this activity"}
        </button>
        <p>Image by </p> <a>{image?.user?.name}</a>
        <p>{}</p>
      </div>
    </article>
  );
}
