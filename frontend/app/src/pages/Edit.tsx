import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Flex } from "../components/Flex";
import { getAPIData } from "../api/getAPIData";
import { useParams } from "react-router-dom";

export const Edit = () => {
  const [data, setData] = React.useState([]);
  const { simulation_result_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPIData("/assumed_yields", {
        simulation_result_id: simulation_result_id
      });
      setData(response?.data);
    };
    fetchData();
  }, []);

  return (
    <Flex direction="column" gap={2}>
      <Link to="/">もどる</Link>
      newと同じコンポーネントにしたいね
      {data.map((item: any, key) => (
        <div key={key}>{item.order}</div>
      ))}
    </Flex>
  );
};
