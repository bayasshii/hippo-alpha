import { SimulationList } from "@/components/SideNavi/SimulationList";
import { Flex } from "../Flex";
import { Header } from "./Header";

export const SideNavi = () => {
  return (
    <Flex direction="column" style={{ background: "lightgrey" }}>
      <Header />
      <SimulationList />
    </Flex>
  );
};
