import type React from "react";

import { useEffect, useState } from "react";
import { CreditCard, History, LogOut, Save, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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

type TabType = "profile" | "transactions" | "send";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  const { profile, isLoadingProfile, setIsAuthenticated, setProfile } = useAuth();
  console.log("profile", profile);

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
  });

  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabType);
    // If leaving profile tab while editing, cancel edits
    if (isEditing && value !== "profile") {
      setIsEditing(false);
      setEditedProfile({ ...profile });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({ ...profile });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Check if required fields are not empty
    if (!editedProfile.Fullname || !editedProfile.email || !editedProfile.phone || !editedProfile.address) {
      toast.error("Some fields are empty");
      return;
    }
    try {
      const token = getAccessToken();
      const { user } = (await profileService.updateProfile(editedProfile, token)) as { user: ProfileTypes };
      setProfile({
        Fullname: user.Fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        moneyRequests: user.moneyRequests,
        payments: user.payments,
        transactions: user.transactions,
      } as ProfileTypes);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileChange = (field: keyof ProfileTypes, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      clearAuthTokens();
      navigate("/");
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mt-8 mb-2 text-sm">
          Balance: <span className="font-bold">GHS{isLoadingBalance ? "Loading..." : balance || 0}</span>
        </h1>
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="border-b border-gray-700">
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
              </TabsList>
            </div>

            <TabsContent value="profile" className="p-6">
              {isLoadingProfile ? (
                <SkeletonCard />
              ) : (
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center space-y-4">
                    {!isEditing ? (
                      <Button
                        onClick={handleEdit}
                        variant="outline"
                        className="text-indigo-400 border-indigo-400 hover:bg-indigo-400/10 hover:text-white cursor-pointer"
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <Save className="mr-2 h-4 w-4 cursor-pointer" />
                          {isSaving ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="text-gray-400 border-gray-600 hover:bg-gray-700 cursor-pointer"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    )}
                    <Button variant={"secondary"} onClick={logOut} size={"lg"} className="cursor-pointer">
                      <LogOut />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-300">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            required
                            value={isEditing ? editedProfile.Fullname : profile.Fullname}
                            onChange={(e) => handleProfileChange("Fullname", e.target.value)}
                            disabled={!isEditing}
                            className={`bg-gray-700 border-gray-600 text-white ${
                              isEditing ? "border-indigo-500 focus:border-indigo-400" : ""
                            }`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-300">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={isEditing ? editedProfile.email : profile.email}
                            onChange={(e) => handleProfileChange("email", e.target.value)}
                            disabled={!isEditing}
                            className={`bg-gray-700 border-gray-600 text-white ${
                              isEditing ? "border-indigo-500 focus:border-indigo-400" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-300">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            type="number"
                            required
                            value={isEditing ? editedProfile.phone : profile.phone}
                            onChange={(e) => handleProfileChange("phone", e.target.value)}
                            disabled={!isEditing}
                            className={`bg-gray-700 border-gray-600 text-white ${
                              isEditing ? "border-indigo-500 focus:border-indigo-400" : ""
                            }`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-gray-300">
                            Address
                          </Label>
                          <Input
                            id="address"
                            required
                            value={isEditing ? editedProfile.address : profile.address}
                            onChange={(e) => handleProfileChange("address", e.target.value)}
                            disabled={!isEditing}
                            className={`bg-gray-700 border-gray-600 text-white ${
                              isEditing ? "border-indigo-500 focus:border-indigo-400" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
          </Tabs>
        </div>
      </div>
    </div>
  );
}
