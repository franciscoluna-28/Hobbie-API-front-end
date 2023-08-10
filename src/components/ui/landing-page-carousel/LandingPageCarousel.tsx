import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsQuote } from "react-icons/bs";
import LoadingSpinner from "../spinner";
import { Quote } from "@/types/quotes";
import { withLoading } from "@/components/hoc/withLoadingSpinner";
import { WithLoadingProps } from "@/components/hoc/withLoadingSpinner";
import { fetchQuotes } from "@/api/quotes";

interface LandingPageCarouselProps {
  image: string;
}

// TODO document the code
const LandingPageCarousel: React.FC<
  LandingPageCarouselProps & WithLoadingProps<Quote[]>
> = ({ image, data: quotes, isLoading }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div className="group h-screen w-full max-w-lg shadow-xl relative order-2 row-auto hidden lg:block">
      <div
        className=" absolute inset-0 bg-cover bg-center max-w-lg"
        style={{ backgroundImage: `url(${image})` }}
      >
        <motion.div
          className={`absolute inset-0 flex items-center justify-center text-white duration-500 group-hover:bg-black group-hover:bg-opacity-50`}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          key={currentQuoteIndex}
        >
          <AnimatePresence initial={false} mode="wait">
            {isLoading ? (
              <LoadingSpinner aria-label="Loading quotes for the user..." />
            ) : (
              <motion.div
                className="flex flex-col gap-4 p-16 opacity-0 duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <BsQuote className="text-2xl group-hover:opacity-100 opacity-0" />
                <p className="text-xl rounded-xl text-white opacity-0 group-hover:opacity-100 duration-200">
                  {quotes[currentQuoteIndex]?.quote}
                </p>
                <p className="text-xl rounded-xl text-white opacity-0 group-hover:opacity-100 duration-200">
                  - {quotes[currentQuoteIndex]?.author}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// Wrapping the component within the withLoadingHOC
export default withLoading<Quote[]>("quotes", fetchQuotes)(LandingPageCarousel);
