import { SimulationList } from "@/components/SideNavi/SimulationList";
import { Flex } from "../Flex";
import { User } from "./User";

export const SideNavi = () => {
  return (
    <Flex
      direction="column"
      style={{ background: "lightgrey", maxWidth: "300px", minWidth: "300px" }}
    >
      <User />
      <SimulationList />
    </Flex>
  );
};
