import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { getAllLogs } from "./../services/logs.service";

const InventoryLogContext = createContext();

const InventoryLogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    const response = await getAllLogs();
    if (response) {
      setLogs(response);
    }
    setLoading(false);
  };
  return (
    <InventoryLogContext.Provider value={{ logs, loading, fetchLogs }}>
      {children}
    </InventoryLogContext.Provider>
  );
};

const useLogsContext = () => {
  const { logs, loading, fetchLogs } = useContext(InventoryLogContext);
  return { logs, loading, fetchLogs };
};

export { InventoryLogProvider, useLogsContext };
