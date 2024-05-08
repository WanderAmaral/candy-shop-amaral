'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const FetchUser = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(user);

  return <></>;
};

export default FetchUser;
