import { BsFillPeopleFill } from "react-icons/bs";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaBookmark, FaMoneyBillAlt } from "react-icons/fa";
import { useActivityContext } from "../context/ActivitiesContext";
import { BiWorld } from "react-icons/bi"
import { BiMoney } from "react-icons/bi";
import { FaUnsplash } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md"

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
      className="bg-white shadow-md border-2 rounded-lg overflow-hidden h-fit max-w-md hover:shadow-2xl duration-200"
    >
      <img
        className="h-96 w-full bg-contain relative"
        src={image?.urls?.small}
        alt="Activity"
      ></img>
      <button
        onClick={() => saveActivity(id)}
        disabled={savedActivities.some(
          (activity) => activity.id === id
        )}
        className="hover:brightness-90 bg-white absolute duration-200 text-white font-semibold disabled:brightness-75 px-4 my-4 py-2 -translate-y-96 translate-x-4 text-xl w-24 h-24 rounded-full"
      >
        {savedActivities.find(
          (activity) => activity.id === id
        )
          ? <MdOutlineDownloadDone className="text-main relative text-5xl m-auto" />
          : <FaBookmark className="text-main relative text-3xl m-auto" />}
      </button>
      <div className="p-6 bg-accent">
        <h2 className="font-bold py-2 text-start text-4xl text-white">
          {activity}
        </h2>
        <div className="flex gap-2 items-center">
          <div className="w-auto">
            <h5 className="text-start text-white/70 mb-2 font-normal py-2">
              Category:
            </h5>
            <div className="border-main border-2 text-center p-2 rounded-xl w-full">
              <p className="font-semibold text-white first-letter:capitalize">
                {type}
              </p>
            </div>
          </div>
        </div>
        <ul className="py-4 flex gap-6 mt-2">
          <li className="flex gap-2 items-center">
            <BiWorld className="text-white text-2xl" />
            <h5 className="text-white text-xl font-semibold">{accessibility}</h5>
          </li>
          <li className="flex gap-2 items-center">
            <FaMoneyBillAlt className="text-white text-2xl" />
            <h5 className="text-white text-xl font-semibold">{price}</h5>
          </li>
          <li className="flex gap-2 items-center">
            <BsFillPeopleFill className="text-white text-2xl" />
            <h5 className="text-white text-xl font-semibold">{participants}</h5>
          </li>
        </ul>
        <a href={image?.urls?.full}><button className="text-white flex justify-center items-center gap-2 cursor-pointer font-semibold bg-main px-4 my-4 py-4 rounded-lg text-2xl w-full hover:brightness-90 duration-100">
          See the image <FaUnsplash />
        </button></a>

        <a href={image?.user?.links.self}><p className="text-gray-400 flex">Photo by {image?.user?.name}</p></a>
        <p>{ }</p>
      </div>
    </article>
  );
}
