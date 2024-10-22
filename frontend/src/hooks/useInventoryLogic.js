import { useState, useEffect } from "react";
import { getInventory } from "../services/api";

export function useInventoryLogic() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getInventory();
                setData(result);
                console.log("data fetched from useInventoryLogic()")
            } catch(error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    return {data, loading};
}