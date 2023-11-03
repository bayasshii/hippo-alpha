import React, { useEffect } from "react";
import { getAPIData } from "../api/getAPIData";
import { Simulation } from "../types/Simulation";
import { Link } from "react-router-dom";

export const List = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<Array<Simulation> | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await getAPIData("/simulations");
      await setData(response?.data as Array<Simulation>);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Link to="/new">New</Link>

      {isLoading ? (
        <p>loading...</p>
      ) : (
        data?.map((item: Simulation, key) => (
          <Link to={`/${item.id}`} key={key}>
            <h1>
              {item.id}:{item.title}
            </h1>
            <p>{item.principal}</p>
          </Link>
        ))
      )}
    </div>
  );
};