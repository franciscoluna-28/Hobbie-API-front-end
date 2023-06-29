import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ActivityProvider } from "./context/ActivitiesContext.tsx";
import AuthProvider from "./context/UserAuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </AuthProvider>
);
