import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Simulation } from "../types/Simulation";
import { usePostSimulation } from "../hooks/usePostSimulation";
import { Flex } from "../components/Flex";
import { ErrorMessage } from "../components/ErrorMessage";
import { useValidation } from "../hooks/useValidation";

type Error = {
  title: Array<string>;
  principal: Array<string>;
};

export const New = () => {
  const [errors, setErrors] = React.useState<Error>({
    title: [],
    principal: []
  });
  const { postSimulation } = usePostSimulation();
  const titleRef = useRef<HTMLInputElement>(null);
  const principalRef = useRef<HTMLInputElement>(null);
  const { validations } = useValidation();

  const postData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newData: Simulation = {
      title: titleRef.current?.value || "",
      principal: Number(principalRef.current?.value) || 0
    };
    const titleErrors: Array<string> = validations(
      String(titleRef.current?.value),
      50
    );
    const principalErrors: Array<string> = validations(
      String(principalRef.current?.value),
      12
    );
    if (titleErrors.length > 0 || principalErrors.length > 0) {
      setErrors({
        title: titleErrors,
        principal: principalErrors
      });
      return;
    }
    await postSimulation(newData);
    console.log(newData);
  };

  return (
    <Flex direction="column" gap={2}>
      <Link to="/">もどる</Link>
      <Flex direction="column">
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" name="title" ref={titleRef} />
        <ErrorMessage messages={errors.title} />
      </Flex>
      <Flex direction="column">
        <label htmlFor="principal">元本</label>
        <input
          type="number"
          id="principal"
          name="principal"
          ref={principalRef}
          defaultValue={0}
          onBlur={
            // 何も値が入力されてない場合は0を入れる
            (e) => {
              if (e.target.value === "") {
                e.target.value = "0";
              }
            }
          }
        />
        <ErrorMessage messages={errors.principal} />
      </Flex>
      <button onClick={(e) => postData(e)}>保存</button>
    </Flex>
  );
};
