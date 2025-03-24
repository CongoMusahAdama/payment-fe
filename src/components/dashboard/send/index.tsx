import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth.context";
import transactionService from "@/services/transactionService";
import { getAccessToken } from "@/utils/constant";
import { SendFundsTypes } from "@/utils/types/transaction";
import React from "react";
import { toast } from "sonner";

type Props = {};

const SendFunds = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [recipient, setRecipient] = React.useState("");

  const { profile } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const token = getAccessToken();
    const data: SendFundsTypes = {
      amount,
      recipientId: recipient,
      sendersId: profile._id!,
    };

    try {
      await transactionService.transferMoney(data, token);
      toast.success("Payment sent successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Send Funds</h2>
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-gray-300">
              Recipient ID
            </Label>
            <Input
              id="recipient"
              placeholder="Email or username"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">
              Amount
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">$</span>
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="bg-gray-700 border-gray-600 text-white pl-8"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
              />
            </div>
          </div>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            {isLoading ? "Sending..." : "Send Funds"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SendFunds;
