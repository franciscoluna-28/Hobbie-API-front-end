import { HobbieAPIResponse } from "../components/RecommendedActivities";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url: string) {
  const [response, setResponse] = useState<HobbieAPIResponse | any | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url);
        setResponse(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { response, error, isLoading };
}