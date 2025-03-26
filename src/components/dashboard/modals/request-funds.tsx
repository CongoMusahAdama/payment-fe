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
import { toast } from "sonner";
import { RequestFundsTypes } from "@/utils/types/transaction";
import { Textarea } from "@/components/ui/textarea";
import transactionService from "@/services/transactionService";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function RequestFundsModal({ isOpen, setIsOpen }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [requestMoneyData, setRequestMoneyData] = useState<Partial<RequestFundsTypes>>({
    recipientId: "",
    amount: 0,
    note: "",
  });

  const { profile } = useAuth();

  const handleRequestFunds = async () => {
    if (!requestMoneyData.amount || requestMoneyData.amount === 0) {
      toast.error("Amount is cannot be empty or zero");
      return;
    }
    setIsLoading(true);
    const token = getAccessToken();
    try {
      const data: RequestFundsTypes = {
        recipientId: requestMoneyData?.recipientId!,
        amount: requestMoneyData?.amount,
        note: requestMoneyData?.note || "",
        requesterId: profile._id!,
      };

      await transactionService.requestMoney(token, data);
      toast.success("Request sent successfully");
      setIsOpen(false);
      setRequestMoneyData({ recipientId: "", amount: 0, note: "" });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Funds</DialogTitle>
          <DialogDescription>Enter the amount you want to request for</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Amount
            </Label>
            <Input
              id="name"
              type="number"
              onChange={(e) => setRequestMoneyData({ ...requestMoneyData, amount: +e.target.value })}
              value={requestMoneyData.amount}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipientId" className="text-right">
              Recipient ID
            </Label>
            <Input
              id="recipientId"
              type="text"
              onChange={(e) => setRequestMoneyData({ ...requestMoneyData, recipientId: e.target.value })}
              value={requestMoneyData.recipientId}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Textarea
              onChange={(e) => setRequestMoneyData({ ...requestMoneyData, note: e.target.value })}
              value={requestMoneyData.note}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading} onClick={handleRequestFunds}>
            {isLoading ? "Please waiting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
