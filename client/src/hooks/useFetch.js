import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newUrl = `${BASE_URL}${url}`;
        const res = await axios.get(newUrl);
        setData(res.data);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  const refetch = async () => {
    setLoading(true);
    try {
      const newUrl = `${BASE_URL}${url}`;
      const res = await axios.get(newUrl);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, refetch };
};

export default useFetch;
