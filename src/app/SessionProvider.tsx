'use client'

import { SessionProvider as Provider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  const [client] = useState(new QueryClient());
  return (
    <Provider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Provider>
  );
}
