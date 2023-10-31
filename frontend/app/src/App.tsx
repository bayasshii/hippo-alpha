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
    postAPIData("/simulation_results", {
      title: "foo",
      content: "bar"
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="App">
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>
            {item.id}:{item.title}
          </h1>
          <p>{item.content}</p>
        </div>
      ))}
      <button onClick={postData}>Post Data</button>
    </div>
  );
};

export default App;
