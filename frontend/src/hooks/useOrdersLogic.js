// Desc: Custom hook to fetch orders data from the API
import { useState, useEffect } from "react";
import { getOrders } from "../services/api";

export function useOrdersLogic() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getOrders();
      setData(result);
      console.log("data fetched from useOrdersLogic()");
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, fetchData };
}
