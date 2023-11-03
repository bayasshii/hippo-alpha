import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Simulation } from "../types/Simulation";
import { usePostSimulation } from "../hooks/usePostSimulation";
import { Flex } from "../components/Flex";

export const New = () => {
  const { postSimulation } = usePostSimulation();
  const titleRef = useRef<HTMLInputElement>(null);
  const principalRef = useRef<HTMLInputElement>(null);

  const postData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newData: Simulation = {
      title: titleRef.current?.value || "",
      principal: Number(principalRef.current?.value) || 0
    };
    await postSimulation(newData);
  };

  return (
    <Flex direction="column" gap={2}>
      <Link to="/">もどる</Link>
      <Flex direction="column">
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" name="title" ref={titleRef} />
      </Flex>
      <Flex direction="column">
        <label htmlFor="principal">元本</label>
        <input
          type="number"
          id="principal"
          name="principal"
          ref={principalRef}
        />
      </Flex>
      <button onClick={(e) => postData(e)}>保存</button>
    </Flex>
  );
};
