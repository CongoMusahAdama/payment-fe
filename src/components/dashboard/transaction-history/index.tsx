import { SkeletonCard } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import transactionService from "@/services/transactionService";
import reportService from "@/services/reportService";
import { getAccessToken } from "@/utils/constant";
import { TransactionHistoryTypes } from "@/utils/types/transaction";
import { useEffect, useState } from "react";

type Props = {};

const TransactionHistory = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionHistoryTypes[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const getTransactionHistory = async () => {
    setIsLoading(true);
    const token = getAccessToken();
    try {
      const res = (await transactionService.getTransactionHistory(token)) as {
        transactions: TransactionHistoryTypes[];
      };
      setTransactions(res.transactions);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactionHistory();
  }, []);

  const downloadTransactionReport = async () => {
    setIsDownloading(true);
    const token = getAccessToken();
    try {
      const res = await reportService.downloadTransactionReport(token);
      const blob = new Blob([res], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.download = `transaction-report-${new Date().toISOString().split("T")[0]}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
        <Button variant={"secondary"} className="cursor-pointer" onClick={downloadTransactionReport}>
          {isDownloading ? "Downloading..." : "Donwload Report"}
        </Button>
      </div>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="space-y-4">
          {transactions.length === 0 && <p className="text-red-400">No transactions found.</p>}
          {transactions?.map((transaction, i) => (
            <div key={i} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium capitalize">{transaction.transactionType}</p>
                <p className="text-sm text-gray-400">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                <p className="font-bold">GHS{transaction.amount}</p>
              </div>
              <div
                className={`font-bold capitalize ${
                  transaction.status !== "completed" ? "text-red-400" : "text-green-400"
                }`}
              >
                {transaction.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TransactionHistory;
