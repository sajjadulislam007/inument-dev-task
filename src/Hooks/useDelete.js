// hooks/useDeleteData.js
import { useState } from "react";

const useDeleteData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (resource, id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${resource}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete data. Status: ${response.status}`);
      }

      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { deleteData, isLoading, error };
};

export default useDeleteData;
