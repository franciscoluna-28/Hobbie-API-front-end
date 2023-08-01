import { Accordion } from "flowbite-react";
import Avatar from "../components/ui/avatar";
import ArtistCard from "../components/ui/artistCard";


export default function FaqPage() {
  return (
    <section className="min-w-full">
      <h1 className="text-4xl text-gray-950 font-bold mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-accent/80 text-lg py-4">
        Welcome to Hobby Explore! Find answers to common questions about our application below.
      </p>
      <Accordion>
        {/* Sección: Qué es Hobby Explore */}
        <Accordion.Panel>
          <Accordion.Title>
            What is Hobby Explore?
          </Accordion.Title>
          <Accordion.Content>
            <p className="text-accent/80 text-lg py-4">
              Hobby Explore is an application designed to help users discover new hobbies and activities using BoredAPI and captivating images from Unsplash! My idea is to make users find and discover new hobbies with a wholesome community.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        {/* Sección: Por qué algunas imágenes no coinciden con el nombre de la actividad */}
        <Accordion.Panel>
          <Accordion.Title>
            Why don't some images match the activity name?
          </Accordion.Title>
          <Accordion.Content>
            <p className="text-accent/80 text-lg py-4">
              This happens because of the way Hobby Explore's API works. While we strive for precision, the results may sometimes be whimsical due to the creative process. And we believe imperfection is important to keep things interesting and fun!
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        {/* Sección: Por qué creé este proyecto */}
        <Accordion.Panel>
          <Accordion.Title>
            Why did I create this project?
          </Accordion.Title>
          <Accordion.Content>
            <p className="text-accent/80 text-lg py-4">
              I created Hobby Explore to offer a user-friendly platform for discovering new hobbies and sharing experiences with others through comments. This way, users can interact together and review activities if they're given them a try!
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        {/* Sección: Cómo comenzó la idea */}
        <Accordion.Panel>
          <Accordion.Title>
            How did the idea start?
          </Accordion.Title>
          <Accordion.Content>
            <p className="text-accent/80 text-lg py-4">
              Hobby Explore originated as a simple API to fetch images from Unsplash and activities from BoredAPI. It grew into a polished project by merging components from WIP projects and exploring backend development, all thanks to the encouragement of potential employers and readers like you! I really hope you're emjoying this application.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      {/* <ArtistCard imageURL="https://yt3.googleusercontent.com/vqx6-hhQDaWcbjjJWWp5H58l8LEBxX1gStQPXJUL2fSfUyTHgpOYrZ23v7EuURuWwM7tPwJJLw=s100-c-k-c0x00ffffff-no-rj" quote="The best way to have a good idea, is to have multiple ideas and merge them together" artistName="TheFatRat"/>
      <ArtistCard imageURL="https://yt3.googleusercontent.com/ZJGwKd4H-lsmPo6cZ2WJ7aaU6uRJYOAmj-MDIDy_Se0sUu3iM41hG3KXgVz690DeEPRqxaKx=s900-c-k-c0x00ffffff-no-rj" quote="We don't make mistakes, just happy little accidents" artistName="Bob Ross"/>
      <ArtistCard imageURL="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_ai4cfEBiHNGn7dCm9lYuvxQ_qIahDNNekp02W3a6yiyBXxIG1AZ2ZSGlhWxClX_zzn5Pa5cOkknqwwbJ4ok2uF5-gDLO8HuVwuhwxwWZfqyUqsJ1WEHRS5UZISbCz2_6jllB7kwfWETgkfGbaQvyJKODsVxdzQwRpkWNnJ6OEU57gzeQAf8rH6IV/s1600/Dali_Harcourt_1936.jpg" quote="Those who do not imitate anything produce nothing" artistName="Salvador Dalí"/> */}




    </section>
  );
}

