import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedRequest: any;
};

const ConfirmMoneyRequestModal = ({ isModalOpen, setIsModalOpen, selectedRequest }: Props) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHC",
    }).format(amount);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>You're about to confirm this payment</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Amount</span>
            <span className="text-lg font-semibold">{formatCurrency(selectedRequest?.amount)}</span>
          </div>

          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">Note</p>
            <p className="text-sm text-muted-foreground">{selectedRequest?.note}</p>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 sm:justify-between">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">
              <X className="mr-1 h-4 w-4" />
              Decline
            </Button>
            <Button>
              <Check className="mr-1 h-4 w-4" />
              Confirm Payment
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmMoneyRequestModal;
