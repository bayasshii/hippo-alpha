import { useContext, useEffect, useState } from "react";
import { getAPI } from "@/utils/api/getAPI";
import { Simulation } from "@/feature/simulations/types/Simulation";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { AuthContext } from "@/utils/auth/AuthProvider";

export const List = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<Simulation>>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      const fetchData = async () => {
        getAPI("/simulations", { user_id: currentUser.id })
          .then((response) => {
            if (response?.status !== 200) {
              // 最初サインアップする前から500番のエラー出るのなんか可哀想
              throw new Error("Error!");
            }
            if (response?.data.length === 0) return;
            setData(response?.data as Array<Simulation>);
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) return <p>loading...</p>;
  if (!currentUser) return <Header />;

  return (
    <div>
      <Header />
      <Link to="/new">New</Link>

      {data.length !== 0 &&
        data?.map((item: Simulation, key) => (
          <Link to={`/${item.id}`} key={key}>
            <h1>
              {item.id}:{item.title}
            </h1>
            <p>{item.principal}</p>
          </Link>
        ))}
    </div>
  );
};
