"use client";

import { useEffect, useState } from "react";
import { Check, DollarSign, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConfirmMoneyRequestModal from "../modals/confirm-money-request";
import { RequestFundsTypes } from "@/utils/types/transaction";
import transactionService from "@/services/transactionService";
import { getAccessToken } from "@/utils/constant";

// Type for money request
interface MoneyRequest {
  id: string;
  amount: number;
  recipientId: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar?: string;
  note: string;
  timestamp: Date;
}

export default function MoneyRequestList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MoneyRequest | null>(null);

  // Mock data - in a real app, this would come from your API
  const [requests, setRequests] = useState<RequestFundsTypes[]>([]);
  console.log("requests", requests);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHC",
    }).format(amount);
  };

  const getMoneyRequests = async () => {
    const token = getAccessToken();
    try {
      const res = await transactionService.moneyRequests(token);
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // Fetch money requests from the API
    getMoneyRequests();
    // Mock data for demonstration
  }, []);
  return (
    <>
      <ConfirmMoneyRequestModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedRequest={selectedRequest}
      />
      <div className="container mx-auto max-w-2xl p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Money Requests</h1>
          <p className="text-muted-foreground">People requesting money from you</p>
        </div>

        {requests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <DollarSign className="h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-2 text-center text-muted-foreground">No pending money requests</p>
            </CardContent>
          </Card>
        ) : // <div className="space-y-4">
        //   {requests.map((request) => (
        //     <Card key={request.id} className="bg-gray-700 border-0 shadow-md">
        //       <CardContent className="p-4">
        //         <div className="flex items-start justify-between">
        //           <div className="flex items-start space-x-4">
        //             <Avatar className="h-10 w-10">
        //               <AvatarFallback>{request.requesterName.substring(0, 2)}</AvatarFallback>
        //             </Avatar>
        //             <div>
        //               <h3 className="font-medium text-white">{request.requesterName}</h3>
        //               <p className="text-sm text-gray-300">{request.note}</p>
        //             </div>
        //           </div>
        //           <Badge variant="outline" className="text-base text-gray-300 font-semibold">
        //             {formatCurrency(request.amount)}
        //           </Badge>
        //         </div>

        //         <div className="mt-4 flex justify-end space-x-2">
        //           {/* <Button variant="outline" size="sm" onClick={() => handleAction(request.id, "decline")}>
        //           <X className="mr-1 h-4 w-4" />
        //           Decline
        //         </Button> */}
        //           <Button
        //             size="sm"
        //             className="cursor-pointer"
        //             variant={"secondary"}
        //             onClick={() => {
        //               setSelectedRequest(request);
        //               setIsModalOpen(true);
        //             }}
        //           >
        //             <Check className="mr-1 h-4 w-4" />
        //             Pay {formatCurrency(request.amount)}
        //           </Button>
        //         </div>
        //       </CardContent>
        //     </Card>
        //   ))}
        // </div>
        null}
      </div>
    </>
  );
}
