import { Check, ChevronRight, Download, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getAccessToken } from "@/utils/constant";
import transactionService from "@/services/transactionService";
import { useEffect, useState } from "react";
import { PaymentDetailsTypes } from "@/utils/types/transaction";
import { SkeletonCard } from "@/components/loading-skeleton";

export default function PaymentSuccess() {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsTypes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [params] = useSearchParams();
  const ref = params.get("reference");

  const getPaymentDetails = async () => {
    setIsLoading(true);
    setError(null);
    const token = getAccessToken();
    try {
      const res = await transactionService.verifyDeposit(ref, token);
      setPaymentDetails(res.payment);
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  // In a real app, you would get these details from your payment processor or API
  const orderDetails = {
    orderId: "ORD-12345-ABCDE",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    total: "$129.99",
    items: [
      { name: "Premium Plan Subscription", price: "$99.99" },
      { name: "One-time Setup Fee", price: "$30.00" },
    ],
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {error && <div className="text-red-500 text-center m-4">{error}</div>}
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Your payment has been processed successfully. A confirmation email has been sent to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Reference</span>
                <span className="font-medium">{paymentDetails?.reference}</span>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Date</span>
                <span>
                  {new Date(paymentDetails?.createdAt!)?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Time</span>
                <span>
                  {new Date(paymentDetails?.createdAt!)?.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Total</span>
                <span className="font-medium">GHS{paymentDetails?.amount}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            {/* <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button> */}
            <Link
              to="/dashboard"
              className="mt-2 flex w-full items-center justify-center text-sm text-gray-500 hover:text-gray-700"
            >
              Return to Home
              <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
