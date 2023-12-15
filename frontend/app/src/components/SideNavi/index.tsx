import { SimulationList } from "@/components/SideNavi/SimulationList";
import { Flex } from "../Flex";
import { User } from "./User";
import { Link } from "react-router-dom";

export const SideNavi = () => {
  return (
    <Flex
      direction="column"
      px={2}
      py={2.5}
      style={{
        overflowY: "auto"
      }}
      as="nav"
    >
      <Flex
        direction="column"
        gap={2}
        style={{
          maxWidth: "13rem",
          minWidth: "13rem",
          overflowY: "auto"
        }}
      >
        <Link
          to="/new"
          style={{
            backgroundColor: "#F5F5F5",
            color: "#56555A",
            fontSize: "1rem",
            lineHeight: 1.5,
            padding: "1rem",
            borderRadius: "1rem",
            width: "100%",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          New シミュレーション
        </Link>
        <Flex style={{ flexGrow: 1, overflowY: "auto" }}>
          <SimulationList />
        </Flex>
        <User />
      </Flex>
    </Flex>
  );
};
