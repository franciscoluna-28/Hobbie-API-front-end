import useFetch from "../hooks/useFetch"
import { BsFillPeopleFill, BsPeopleFill } from "react-icons/bs"
import { SiLevelsdotfyi } from "react-icons/si"
import {FaMoneyBillAlt} from "react-icons/fa"

export type Accessibility = ' ' | number

// Enums
export enum ActivityType {
  Education = 'education',
  Recreational = 'recreational',
  Social = 'social',
  DIY = 'diy',
  Charity = 'charity',
  Cooking = 'cooking',
  Relaxation = 'relaxation',
  Music = 'music',
  Busywork = 'busywork',
}

// Intefaces
export interface Activity {
  participants: number
  activity: string
  type: ActivityType
  price: number
  link: string
  key: string
  accessibility: Accessibility
}

export interface UnsplashImage {
  id: string
  urls?: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
    small_s3: string
  }
  user?: {
    name: string
    links: {
      self: string
      phothos: string
    }
  }
}

// Activity with Unsplash Image Properties
export interface CustomActivity extends Activity {
  image?: UnsplashImage
}

export interface HobbieAPIResponse {
  data: CustomActivity[]
}

 const myImages = [
    {
      "key": "1",
      "activity": "Go for a walk",
      "participants": 1,
      "type": "Recreational",
      "price": 0,
      "link": "",
      "accessibility": 0.1,
      "image": {
        "id": "1",
        "urls": {
          "raw": "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad",
          "full": "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
          "regular": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carwow.co.uk%2Fbest%2Fbest-supercars&psig=AOvVaw1ZXR5BzsZBmpdyFQgVLefM&ust=1684354186257000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCQpqnS-v4CFQAAAAAdAAAAABAE",
          "small": "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          "thumb": "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
          "small_s3": "https://images.unsplash.com/photo-1579546928456-2f48e7f2a7ad?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80&dpr=2"
        },
        "user": {
          "name": "John Doe",
          "links": {
            "self": "https://unsplash.com/@johndoe",
            "photos": "https://unsplash.com/@johndoe"
          }
        }
      }
    }
  ] 
  


/* participants, activity, type, price, 
    link, key, accessibility, image }: CustomActivity */

export default function Activities() {

/*      const {response, error, isLoading } = useFetch("http://localhost:3000/activity/get-a-few-activities") 

     if (isLoading) {
        return <div>Cargando...</div>;
      }
    
      if (error) {
        return <div>There was an error while loading...</div>;
      } 


      console.log(response)
 */


    return (
<div>
<div className="flex gap-4">
      {myImages.map((activityData) => (
        <article key={activityData.key} className="bg-white shadow-md border-2 rounded-lg overflow-hidden min-h-fit hover:scale-105 duration-200 h-full max-w-xl">
          <img className="w-auto h-full" src="https://www.bugatti.com/fileadmin/_processed_/e/e/csm_og-image_506cf6a92e.jpg"></img>
          <div className="p-4">
          <h2 className="font-bold py-2 text-start text-4xl text-gray-900">{activityData.activity}</h2>

            <div className="flex gap-2 items-center">
            <div className="w-auto">
            <h5 className="text-start text-gray-400 mb-2 font-semibold">Category:</h5>
            <div className="border-red-500 border-2 text-center p-2 rounded-xl w-full">
              <p className="font-semibold text-red-500">{activityData.type}</p>
            </div>
            </div>
            </div>
            
            <ul>
            <li className="flex gap-2 items-center">
              <div className="w-full flex-col justify-center flex-wrap gap-4 mt-4">
                <li className="flex items-center mb-2">
                  <FaMoneyBillAlt className="mt-1 mr-2 text-red-500"/>
                  <h5 className="text-gray-400 font-normal text-xl">Cost range: {activityData.price} / 1</h5>
                  </li>
                <li className="flex items-center mb-2">
                  <SiLevelsdotfyi className="mt-1 mr-2 text-red-500"/>
                  <h5 className="text-gray-400 font-normal text-xl">Accesibility: {activityData.accessibility} / 1</h5>
                  </li>
                <li className="flex items-center">
                  <BsFillPeopleFill className="mt-1 mr-2 text-red-500"/>
                  <h5 className="text-gray-400 font-normal text-xl">Participants: {activityData.participants}</h5>
                  </li>

              </div>



            </li>
          </ul>
          <button className="text-white font-semibold bg-red-500 px-4 my-4 py-2 text-red-500 rounded-lg text-xl w-full">See the image</button>

        </div>
        </article>
      ))}
    </div>
  
</div>
    );
  }