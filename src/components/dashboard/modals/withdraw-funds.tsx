import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth.context";
import { getAccessToken } from "@/utils/constant";
import { useState } from "react";
import paymentService from "@/services/paymentService";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function WithdrawFundsModal({ isOpen, setIsOpen }: Props) {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useAuth();

  const handleWithdrawFunds = async () => {
    if (!amount || amount === 0) {
      toast.error("Amount is cannot be empty or zero");
      return;
    }
    setIsLoading(true);
    const token = getAccessToken();
    try {
      await paymentService.initiateWithdrawal(token, profile.recipientCode, amount);
      toast.success("Withdrawal initiated successfully");
      setIsOpen(false);
      setAmount(0);
    } catch (error: any) {
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Enter the amount you want to withdraw</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Amount
            </Label>
            <Input
              id="name"
              type="number"
              onChange={(e) => setAmount(+e.target.value)}
              value={amount}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading} onClick={handleWithdrawFunds}>
            {isLoading ? "Please waiting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
