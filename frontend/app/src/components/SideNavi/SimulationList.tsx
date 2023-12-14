import { useContext, useEffect, useState } from "react";
import { getAPI } from "@/utils/api/getAPI";
import { Simulation } from "@/feature/simulations/types/Simulation";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { AuthContext } from "@/utils/auth/AuthProvider";
import { Flex } from "../Flex";

export const SimulationList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<Simulation>>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      const fetchData = async () => {
        getAPI("/simulations", { user_id: currentUser.id })
          .then((response) => {
            if (response?.status !== 200) {
              // 最初サインアップする前から500番のエラー出るのなんか可哀想
              throw new Error("Error!");
            }
            if (response?.data.length === 0) return;
            setData(response?.data as Array<Simulation>);
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) return <p>loading...</p>;
  if (!currentUser) return <Header />;

  return (
    <Flex gap={2} direction="column">
      <Link to="/new">New</Link>
      {data.length !== 0 &&
        data?.map((item: Simulation, key) => (
          <Link
            to={`/${item.id}`}
            key={key}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span>{item.title}</span>
            <span>{item.principal}</span>
          </Link>
        ))}
    </Flex>
  );
};
