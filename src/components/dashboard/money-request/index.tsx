"use client";

import { useState } from "react";
import { Check, Clock, DollarSign, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConfirmMoneyRequestModal from "../modals/confirm-money-request";

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
  const [requests, setRequests] = useState<MoneyRequest[]>([
    {
      id: "req-001",
      amount: 25.5,
      recipientId: "current-user-id",
      requesterId: "user-123",
      requesterName: "Alex Johnson",
      requesterAvatar: "/placeholder.svg?height=40&width=40",
      note: "Lunch at Cafe Milano yesterday",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "req-002",
      amount: 120.0,
      recipientId: "current-user-id",
      requesterId: "user-456",
      requesterName: "Sam Taylor",
      requesterAvatar: "/placeholder.svg?height=40&width=40",
      note: "Concert tickets for next weekend",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "req-003",
      amount: 8.75,
      recipientId: "current-user-id",
      requesterId: "user-789",
      requesterName: "Jamie Rivera",
      requesterAvatar: "/placeholder.svg?height=40&width=40",
      note: "Coffee and pastry this morning",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
  ]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHC",
    }).format(amount);
  };

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
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="bg-gray-700 border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={request.requesterAvatar} alt={request.requesterName} />
                        <AvatarFallback>{request.requesterName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-white">{request.requesterName}</h3>
                        <p className="text-sm text-gray-300">{request.note}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-base text-gray-300 font-semibold">
                      {formatCurrency(request.amount)}
                    </Badge>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    {/* <Button variant="outline" size="sm" onClick={() => handleAction(request.id, "decline")}>
                    <X className="mr-1 h-4 w-4" />
                    Decline
                  </Button> */}
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      variant={"secondary"}
                      onClick={() => {
                        setSelectedRequest(request);
                        setIsModalOpen(true);
                      }}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Pay {formatCurrency(request.amount)}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
