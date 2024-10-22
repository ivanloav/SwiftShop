// useTopProductsLogic.js
import { useState, useEffect } from "react";
import { getTopProducts } from "../services/api";

export function useTopProductsLogic() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopProducts = async () => {
    setLoading(true);
    try {
      const products = await getTopProducts();
      setTopProducts(products);
    } catch (error) {
      console.error("Error fetching top products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  return { topProducts, loading, fetchTopProducts };
}
