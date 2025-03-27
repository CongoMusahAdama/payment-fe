import type React from "react";

import { useEffect, useState } from "react";
import { BoomBox, CreditCard, History, LogOut, Save, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import authService from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearAuthTokens, getAccessToken } from "@/utils/constant";
import { ProfileTypes } from "@/utils/types/profile";
import { useAuth } from "@/context/auth.context";
import { SkeletonCard } from "@/components/loading-skeleton";
import profileService from "@/services/profileService";
import TransactionHistory from "@/components/dashboard/transaction-history";
import SendFunds from "@/components/dashboard/send";
import DepositFunds from "@/components/dashboard/deposit";
import transactionService from "@/services/transactionService";
import { WithdrawFundsModal } from "@/components/dashboard/modals/withdraw-funds";
import { RequestFundsModal } from "@/components/dashboard/modals/request-funds";
import Profile from "@/components/dashboard/profile";
import MoneyRequestList from "@/components/dashboard/money-request";

type TabType = "profile" | "transactions" | "send";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [isOpenWithdrawFunds, setIsOpenWithdrawFunds] = useState(false);
  const [isOpenRequestMoney, setIsOpenRequestMoney] = useState(false);

  const { profile } = useAuth();

  const [editedProfile, setEditedProfile] = useState<ProfileTypes>({
    Fullname: profile?.Fullname || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    createdAt: profile?.createdAt || "",
    updatedAt: profile?.updatedAt || "",
    _id: profile?._id || "",
    moneyRequests: profile?.moneyRequests || [],
    payments: profile?.payments || [],
    transactions: profile?.transactions || [],
    recipientCode: profile?.recipientCode || "",
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabType);
    // If leaving profile tab while editing, cancel edits
    if (isEditing && value !== "profile") {
      setIsEditing(false);
      setEditedProfile({ ...profile });
    }
  };

  const getBalance = async () => {
    setIsLoadingBalance(true);
    try {
      const token = getAccessToken();
      const res = (await transactionService.getBalance(token)) as { balance: number };
      setBalance(res.balance);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <WithdrawFundsModal isOpen={isOpenWithdrawFunds} setIsOpen={setIsOpenWithdrawFunds} />
      <RequestFundsModal isOpen={isOpenRequestMoney} setIsOpen={setIsOpenRequestMoney} />
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center">
            <h1 className="mt-8 mb-2 text-sm">
              Balance: <span className="font-bold">GHS{isLoadingBalance ? "Loading..." : balance || 0}</span>
            </h1>
            <div className="flex gap-2">
              <Button variant={"secondary"} className="cursor-pointer" onClick={() => setIsOpenWithdrawFunds(true)}>
                Withdraw Funds
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                onClick={() => setIsOpenRequestMoney(true)}
              >
                Request Money
              </Button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="border-b border-gray-700 overflow-auto">
                <TabsList className="bg-gray-800 p-0 h-16 w-full flex justify-around">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-gray-700 text-gray-400 data-[state=active]:text-white rounded-none cursor-pointer flex-1 h-full"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="transactions"
                    className="data-[state=active]:bg-gray-700 text-gray-400 data-[state=active]:text-white rounded-none cursor-pointer flex-1 h-full"
                  >
                    <History className="mr-2 h-5 w-5" />
                    Transaction History
                  </TabsTrigger>
                  <TabsTrigger
                    value="send"
                    className="data-[state=active]:bg-gray-700 text-gray-400 data-[state=active]:text-white rounded-none cursor-pointer flex-1 h-full"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Send Funds
                  </TabsTrigger>
                  <TabsTrigger
                    value="deposit"
                    className="data-[state=active]:bg-gray-700 text-gray-400 data-[state=active]:text-white rounded-none cursor-pointer flex-1 h-full"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Deposit Funds
                  </TabsTrigger>
                  <TabsTrigger
                    value="request"
                    className="data-[state=active]:bg-gray-700 text-gray-400 data-[state=active]:text-white rounded-none cursor-pointer flex-1 h-full"
                  >
                    <BoomBox className="mr-2 h-5 w-5" />
                    Money Requests
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="p-6">
                <Profile
                  editedProfile={editedProfile}
                  isEditing={isEditing}
                  setEditedProfile={setEditedProfile}
                  setIsEditing={setIsEditing}
                />
              </TabsContent>

              <TabsContent value="transactions" className="p-6">
                <TransactionHistory />
              </TabsContent>

              <TabsContent value="send" className="p-6">
                <SendFunds />
              </TabsContent>
              <TabsContent value="deposit" className="p-6">
                <DepositFunds />
              </TabsContent>
              <TabsContent value="request" className="p-6">
                <MoneyRequestList />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
