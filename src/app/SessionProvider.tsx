'use client'

import { SessionProvider as Provider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react";
import { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export default function SessionProvider({ children, session }: Props) {
  const [client] = useState(new QueryClient());
  return (
    <Provider session={session}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Provider>
  );
}
