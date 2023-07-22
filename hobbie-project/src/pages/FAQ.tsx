export default function FaqPage() {
  return (
    <section>
      <h1 className="text-4xl text-gray-950 font-bold mb-8">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-950 text-xl py-4">
        Welcome to Hobby Explore! Below are some common questions and answers to
        help you understand our application better.
      </p>
      <ul>
        <li>
          <section>
            <h3 className="text-gray-950 text-3xl py-4 font-bold">
              What is Hobby Explore?
            </h3>
            <p className="text-gray-950 text-xl py-4">
              Hobby Explore is an application designed to help users find and
              discover new hobbies and activities. We achieve this by leveraging
              BoredAPI and the incredible image collection from Unsplash.
            </p>
          </section>
        </li>

        <li>
          <section>
            <h3 className="text-gray-950 text-3xl py-4 font-bold">
              Why don't some images match the activity name?
            </h3>
            <p className="text-gray-950 text-xl py-4">
              That's because of the way Hobby Explore's API works. We use
              Natural.js to process queries in the backend and then search for
              an image based on the input. While we've coded it with precision
              and avoided stopwords and repeated common verbs, the results may
              sometimes be imprecise. But remember, our primary goal is to have
              fun!
            </p>
          </section>
        </li>

        <li>
          <section>
            <h3 className="text-gray-950 text-3xl py-4 font-bold">
              Why are there only 3 activities available for now?
            </h3>
            <p className="text-gray-950 text-xl py-4">
              Currently, we have a limited selection of activities as we focus
              on providing the best user experience for these options. However,
              we're actively working on expanding our activity database, and you
              can expect more exciting activities to be added soon!
            </p>
          </section>
        </li>
      </ul>
    </section>
  );
}
