import SignInForm from "@/components/form/sign-in-form/SignInForm";
import SignUpForm from "@/components/form/sign-up-form/SignUpForm";
import LandingPageCarousel from "@/components/ui/landing-page-carousel/LandingPageCarousel";
import Link from "next/link";

// Main app route page '/' to handle Signup logic with Firebase
// Besides the auth form this includes a small carousel of quotes as a detail
export default function Login() {
  return (
    <main className="">
      <section className="flex flex-row-reverse overflow-hidden">
        <div className="flex flex-col w-full p-8">
          <h1 className="text-center text-4xl leading-tight font-semibold text-accent">
            Welcome!
          </h1>
          <span className="block text-center text-accent text-sm">
            Hobby Explore | Discover, Share and Connect
          </span>
          <SignInForm/>
          <Link href="/">Go to Signup</Link>
        </div>
        <LandingPageCarousel image="/assets/dog.jpg" />
      </section>
    </main>
  );
}
