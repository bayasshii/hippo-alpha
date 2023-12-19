import { Flex } from "@/components/Flex";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Flex direction="column" gap={2} align="flex-start">
      <h1 style={{ color: "#56555A", fontSize: "1.5rem" }}>
        資産運用のシミュレーションをしてみよう！
      </h1>
      <Link
        to="/new"
        style={{
          backgroundColor: "#56555A",
          color: "#F5F5F5",
          fontSize: "1rem",
          lineHeight: 1.5,
          padding: "1rem",
          borderRadius: "1rem",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        New シミュレーション
      </Link>
    </Flex>
  );
};
