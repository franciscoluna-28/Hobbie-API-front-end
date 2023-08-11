"use client";

import { Quote } from "@/types/quotes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsQuote } from "react-icons/bs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchQuotes } from "@/pages/api/quotes";
import LoadingSpinner from "../spinner";
import { AnimatePresence } from "framer-motion";

export default function Quotes() {
  const {
    data: quotes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
  });

  const queryClient = useQueryClient();

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes!.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>There was an error while loading...</p>;
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className={`absolute inset-0 flex items-center justify-center text-white duration-500 group-hover:bg-black group-hover:bg-opacity-50`}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col gap-4 p-16 opacity-0 duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          exit={{ opacity: 0 }}
          key={currentQuoteIndex}
        >
          <>
            <BsQuote className="text-2xl group-hover:opacity-100 opacity-0" />
            <p className="text-xl rounded-xl text-white opacity-0 group-hover:opacity-100 duration-200">
              {quotes![currentQuoteIndex]?.quote}
            </p>
            <p className="text-xl rounded-xl text-white opacity-0 group-hover:opacity-100 duration-200">
              - {quotes![currentQuoteIndex]?.author}
            </p>
          </>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
