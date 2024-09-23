import { useState, useEffect } from "react";
import { getProducts } from "../services/api";

export function useProductsLogic() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getProducts();
      setData(result);
      console.log("data fetched from useProductsLogic()");
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Return data, loading status, and fetchData function
  return { data, loading, fetchData };
}
