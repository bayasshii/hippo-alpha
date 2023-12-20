import { Simulation } from "@/feature/simulations/types/Simulation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { getAPI } from "@/utils/api/getAPI";
import { AuthContext } from "@/utils/provider/auth/AuthProvider";

export const SimulationContext = createContext<any>(null);
type Props = {
  children: React.ReactNode;
};
export const SimulationProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [simulations, setSimulations] = useState<Array<Simulation>>([]);
  const { currentUser } = useContext(AuthContext);
  const fetchSimulations = useCallback(async () => {
    setIsLoading(true);
    if (currentUser?.id) {
      try {
        const response = await getAPI("/simulations", {
          user_id: currentUser.id
        });
        if (response?.status !== 200) {
          throw new Error("Error!");
        }
        if (response?.data.length === 0) return;
        setSimulations(response?.data as Array<Simulation>);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser?.id) {
      fetchSimulations();
    }
  }, [currentUser, fetchSimulations]);

  return (
    <SimulationContext.Provider
      value={{ isLoading, simulations, fetchSimulations }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
