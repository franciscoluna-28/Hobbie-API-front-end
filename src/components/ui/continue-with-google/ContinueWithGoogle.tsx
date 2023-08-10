import { Button } from "../button";
import Image from "next/image";

/**
 * ContinueWithGoogleComponent that renders a button with the Google Auth Logic from Firebase
 * @param {disabled} - Current state of the component 
 * @param {boolean} props.disabled - Indicates the current state of the button to avoid multiple attempts of login.
 * @returns {JSX.Element} Component's JSX.
 */

interface ContinueWithGoogleProps {
  disabled: boolean;
}

export default function ContinueWithGoogle({
  disabled,
}: ContinueWithGoogleProps) {
  return (
    <Button
      className={`bg-white ${
        disabled ? "disabled:brightness-90" : "hover:brightness-95"
      } mt-4 text-normal text-gray-600 flex duration-200 items-center justify-center gap-2 shadow-sm border-2 p-4 rounded-xl`}
    >
      <Image
        className="h-4 w-4"
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327"
        }
        alt="Google logo"
        width={16} // px Width
        height={16} // px Height
      />{" "}
      Continue with Google
    </Button>
  );
}
