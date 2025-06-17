import { useEffect } from "react";
import { useLogsContext } from "../contexts/InventoryLog";
import { Loader2 } from "lucide-react";
const InventoryLog = () => {
  const { logs, loading, fetchLogs } = useLogsContext();

  useEffect(() => {
    fetchLogs();
    console.log(logs);
  }, []);

  return (
    <div className="w-full">
      <table className="border w-full rounded-sm">
        <thead className="border">
          <tr className="border">
            <th className="px-4 py-2 border">Id</th>
            <th className="px-4 py-2 border">Product id</th>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2  border">Change Type</th>
            <th className="px-4 py-2 border">Change Quantity</th>
            <th className="px-4 py-2 border">Timestamp</th>
          </tr>
        </thead>
        {!loading && (
          <tbody className="border">
            {logs.map((log, index) => (
              <tr className="border" key={index}>
                <td className="px-4 py-2 border">{log.log_id}</td>
                <td className="px-4 py-2 border">{log.product_id}</td>
                <td className="px-4 py-2 border">{log.product_name}</td>
                <td className="px-4 py-2 border">{log.change_type}</td>
                <td className="px-4 py-2 border">{log.change_qty}</td>
                <td className="px-4 py-2 border">
                  {new Date(log.timestamp).toLocaleDateString() +
                    "-" +
                    new Date(log.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gray-500" size={24} />
        </div>
      )}
    </div>
  );
};

export default InventoryLog;
