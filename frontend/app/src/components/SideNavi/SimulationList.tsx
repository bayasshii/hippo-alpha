import { useContext } from "react";
import { Simulation } from "@/feature/simulations/types/Simulation";
import { Link, useLocation } from "react-router-dom";
import { Flex } from "../Flex";
import { SimulationContext } from "@/utils/provider/SimulationsProvider";

export const SimulationList = () => {
  const { isLoading, simulations } = useContext(SimulationContext);
  // useParamsでとってきたい
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  if (isLoading) return <p>ローディング中</p>;
  return (
    <Flex gap={1} direction="column">
      {simulations.length !== 0 &&
        simulations?.map((item: Simulation) => (
          <Link
            to={`/${item.id}`}
            key={item.id}
            style={{
              display: "flex",
              color: "#ddd",
              flexDirection: "column",
              fontWeight: "normal",
              ...(id == item.id && {
                color: "#fff",
                fontWeight: "bold"
              })
            }}
          >
            <span>{item.title}</span>
          </Link>
        ))}
    </Flex>
  );
};
