import { motion, AnimatePresence } from "framer-motion";
import { fetchQuotes } from "@/pages/api/quotes";
import getQueryClient from "@/lib/get-query-client";
import Quotes from "../quotes";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "@/components/hydrate-client";

type Props = {
  image: string;
};

export default async function LandingPageCarousel({ image }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["quotes"], fetchQuotes);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="group h-screen w-full max-w-lg shadow-xl relative order-2 row-auto hidden lg:block">
      <div
        className=" absolute inset-0 bg-cover bg-center max-w-lg"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Hydrate state={dehydratedState}>
          <Quotes />
        </Hydrate>
      </div>
    </div>
  );
}
