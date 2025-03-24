import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth.context";
import transactionService from "@/services/transactionService";
import { getAccessToken } from "@/utils/constant";
import { DepositFundsTypes } from "@/utils/types/transaction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {};

const DepositFunds = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const {
    profile: { email },
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const token = getAccessToken();
    const data: DepositFundsTypes = {
      amount,
      email,
    };

    try {
      const res = await transactionService.depositFunds(data, token);
      // Redirect to the home page using browser's native API
      window.location.href = res.authorizationUrl;
      toast.success("Deposit initiated. You will be redirected to make payment.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Deposit Funds</h2>
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto space-y-4">
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
                required
                className="bg-gray-700 border-gray-600 text-white pl-8"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            {isLoading ? "Depositing..." : "Make Deposit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default DepositFunds;
