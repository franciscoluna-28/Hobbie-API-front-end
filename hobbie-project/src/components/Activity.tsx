import { BsFillPeopleFill } from "react-icons/bs";
import { FaBookmark, FaMoneyBillAlt } from "react-icons/fa";
import { useActivityContext } from "../context/ActivitiesContext";
import { BiWorld } from "react-icons/bi";
import { FaUnsplash } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

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
  id,
  accessibility,
  urls,
}: CustomActivity) {
  // Getting the savedActivities from the context and the function for
  // saving them
  const { savedActivities, saveActivity } = useActivityContext();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <article className="bg-white min-w-full relative shadow-md border-2 rounded-lg overflow-hidden w-full min-h-fit max-w-6xl hover:shadow-2xl duration-200">
      <img
        className="w-full h-auto bg-contain relative"
        src={urls.full}
        alt="Activity"
      ></img>
      <button
        onClick={() => saveActivity(id)}
        disabled={savedActivities.some((activity) => activity.id === id)}
        className="hover:brightness-90 bg-white absolute z-50 left-4 top-0 duration-200 text-white font-semibold disabled:brightness-75 px-4 my-4 py-2 text-xl w-24 h-24 rounded-full"
      >
        {savedActivities.find((activity) => activity.id === id) ? (
          <MdOutlineDownloadDone className="text-main  text-5xl m-auto" />
        ) : (
          <FaBookmark className="text-main relative text-3xl m-auto" />
        )}
      </button>
      <div className="p-6 bg-white">
        <h2 className="font-bold py-2 text-start text-4xl text-accent/90 leading-relaxed">
          {activity}
        </h2>
        <div className="flex gap-2 items-center">
          <div className="w-auto">
            <h5 className="text-start text-accent/70 mb-2 font-normal py-2">
              Category:
            </h5>
            <div className="border-main border-2 text-center p-2 rounded-xl w-full">
              <p className="font-normal text-accent/70 first-letter:capitalize">
                {type}
              </p>
            </div>
          </div>
        </div>
        <button
          className="text-accent/70 mt-4 flex items-center gap-2"
          onClick={toggleShowMore}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: showMore ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {showMore ? <AiOutlineUp /> : <AiOutlineDown />}
          </motion.div>
          Show more
        </button>

        <AnimatePresence>
          {showMore && (
            <motion.div
              key="modal"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showMore ? "auto" : 0,
                opacity: showMore ? 1 : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="py-4 flex gap-6 mt-2 flex-col">
                <li className="flex gap-2 items-center">
                  <p className="text-accent/70">Accesibility:</p>
                  <BiWorld className="text-accent/70 text-2xl" />
                  <h5 className="text-accent/70 text-xl font-semibold">
                    {accessibility}
                  </h5>
                </li>
                <li className="flex gap-2 items-center">
                  <p className="text-accent/70">Cost range:</p>
                  <FaMoneyBillAlt className="text-accent/70 text-2xl" />
                  <h5 className="text-accent/70 text-xl font-semibold">
                    {price}
                  </h5>
                </li>
                <li className="flex gap-2 items-center">
                  <p className="text-accent/70">Participants:</p>
                  <BsFillPeopleFill className="text-accent/70 text-2xl" />
                  <h5 className="text-accent/70 text-xl font-semibold">
                    {participants}
                  </h5>
                </li>
              </ul>
              <a href={urls.full}>
                <button className="text-white flex justify-center items-center gap-2 cursor-pointer font-semibold bg-main px-4 my-4 py-4 rounded-lg text-2xl w-full hover:brightness-90 duration-100">
                  See the image <FaUnsplash />
                </button>
              </a>

              <a href={urls.full}>
                <p className="text-gray-400 flex">
                  Photo by {urls.full}
                </p>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
