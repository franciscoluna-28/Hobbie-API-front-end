import useFetch from "../hooks/useFetch"
import { BsFillPeopleFill } from "react-icons/bs"
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

/* const myImages = [
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
          "regular": "https://unsplash.com/es/fotos/VZEj0iepzKA",
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
  ] */
  


/* participants, activity, type, price, 
    link, key, accessibility, image }: CustomActivity */

export default function Activities() {

     const {response, error, isLoading } = useFetch("http://localhost:3000/activity/get-a-few-activities") 

     if (isLoading) {
        return <div>Cargando...</div>;
      }
    
      if (error) {
        return <div>There was an error while loading...</div>;
      } 


      console.log(response)



    return (
<div>
<div className="justify-center flex gap-4">
      {response?.data.map((activityData: CustomActivity) => (
        <div key={activityData.key} className="bg-white shadow-md border-2 rounded-lg overflow-hidden min-h-fit p-2 hover:scale-105 duration-200">
            <div className="absolute bg-red-500 text-white p-2 rounded-xl m-2 flex justify-center items-center font-semibold"><p>{activityData.type}</p></div>
            <img className="w-full h-96 rounded-lg" alt="test" src={activityData.image?.urls?.regular}></img>
          <h2 className="font-bold py-2 text-3xl text-gray-900">{activityData.activity}</h2>

          <ul>
            <li className="flex gap-2 items-center">
            <p>{activityData.participants}</p>
          <BsFillPeopleFill/>
            </li>
            <li className="flex gap-2 items-center">
            <p>{activityData.price}</p>
<FaMoneyBillAlt className="mt-1"/>
            </li>
          </ul>



          <a href={activityData.link}><p>Link</p></a>
          <p>Accesibility: {activityData.accessibility}</p>
          {/* Renderizar más propiedades de la actividad según sea necesario */}
        </div>
      ))}
    </div>
  
</div>
    );
  }