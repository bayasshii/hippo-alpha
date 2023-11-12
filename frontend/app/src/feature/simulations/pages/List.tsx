import { useContext, useEffect, useState } from "react";
import { getAPIData } from "@/utils/api/getAPIData";
import { Simulation } from "@/feature/simulations/types/Simulation";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { AuthContext } from "@/utils/auth/AuthProvider";

export const List = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<Simulation>>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext) {
      // AuthContextがundefinedの場合の処理をここに書く
      // 例えば、エラーメッセージを表示するなど
    } else {
      const { currentUser } = authContext;
      setCurrentUser(currentUser);
    }
  }, [authContext]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      getAPIData("/simulations", { user_id: currentUser?.id })
        .then((response) => {
          if (response?.status !== 200) {
            // 最初サインアップする前から500番のエラー出るのなんか可哀想
            throw new Error("Error!");
          }
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
  }, [currentUser]);

  if (isLoading) return <p>loading...</p>;

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
