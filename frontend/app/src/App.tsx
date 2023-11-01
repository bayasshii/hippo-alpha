import React, { useEffect } from "react";
import "./App.css";
import { getAPIData } from "./api/getAPIData";
import { SimulationResult } from "./types/SimulationResult";
import { usePostSimulationResults } from "./hooks/usePostSimulationResults";

const App = () => {
  const [data, setData] = React.useState<Array<SimulationResult>>([]);
  const { postSimulationResults } = usePostSimulationResults();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPIData("/simulation_results");
      setData(response?.data as Array<SimulationResult>);
    };
    fetchData();
  }, []);

  const postData = async () => {
    const newData: SimulationResult = {
      title: "foo",
      principal: 5000
    };
    await postSimulationResults(newData);
    setData([...data, newData]);
  };

  return (
    <div className="App">
      {data.map((item: SimulationResult, key) => (
        <div key={key}>
          <h1>
            {key}:{item.title}
          </h1>
          <p>{item.principal}</p>
        </div>
      ))}
      <button onClick={postData}>Post Data</button>
    </div>
  );
};

export default App;
