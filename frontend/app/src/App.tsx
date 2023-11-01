import React, { useEffect } from "react";
import "./App.css";
import { getAPIData } from "./api/getAPIData ";
import { postAPIData } from "./api/postAPIData";

const App = () => {
  const [data, setData] = React.useState<Array<Object>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPIData("/simulation_results");
      setData(response?.data);
    };
    fetchData();
  }, []);

  const postData = async () => {
    const newData = {
      title: "foo",
      content: "bar"
    };
    postAPIData("/simulation_results", {
      simulationResult: newData
    })
      .catch((error) => {
        console.log("エラー", error.response.data);
      })
      .then(() => {
        setData([...data, newData]);
      });
  };

  return (
    <div className="App">
      {data.map((item: any, key) => (
        <div key={key}>
          <h1>
            {key}:{item.title}
          </h1>
          <p>{item.content}</p>
        </div>
      ))}
      <button onClick={postData}>Post Data</button>
    </div>
  );
};

export default App;
