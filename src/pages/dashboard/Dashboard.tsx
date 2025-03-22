import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Camera, CreditCard, History, LogOut, Save, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import authService from "@/services/authService";
import profileService from "@/services/profileService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { clearAuthTokens, getAccessToken, URL } from "@/utils/constant";
import { set } from "date-fns";
import { ProfileTypes, UserResponse } from "@/utils/types/profile";

type TabType = "profile" | "transactions" | "send";
const API_URL = `${URL}/users/profile`;

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<ProfileTypes>({
    Fullname: "",
    email: "",
    phone: "",
    address: "",
    createdAt: "",
    updatedAt: "",
    _id: "",
    moneyRequests: [],
    payments: [],
    transactions: [],
  });

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

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleProfileChange = (field: keyof ProfileTypes, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      clearAuthTokens();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getProfile = async () => {
    const token = getAccessToken();
    setError(null);
    try {
      const { data } = (await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })) as { data: UserResponse };
      console.log("user", data);
      setProfile(data.user);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="border-b border-gray-700">
              <TabsList className="bg-gray-800 p-0 h-16 w-full flex justify-around">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none cursor-pointer flex-1 h-full"
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none cursor-pointer flex-1 h-full"
                >
                  <History className="mr-2 h-5 w-5" />
                  Transaction History
                </TabsTrigger>
                <TabsTrigger
                  value="send"
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none cursor-pointer flex-1 h-full"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Send Funds
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="profile" className="p-6">
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
                      <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Save className="mr-2 h-4 w-4 cursor-pointer" />
                        Save
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
            </TabsContent>

            <TabsContent value="transactions" className="p-6">
              <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{i % 2 === 0 ? "Payment Sent" : "Payment Received"}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`font-bold ${i % 2 === 0 ? "text-red-400" : "text-green-400"}`}>
                      {i % 2 === 0 ? "-" : "+"}${(Math.random() * 1000).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="send" className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Funds</h2>
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-gray-300">
                    Recipient
                  </Label>
                  <Input
                    id="recipient"
                    placeholder="Email or username"
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
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note" className="text-gray-300">
                    Note (Optional)
                  </Label>
                  <Textarea
                    id="note"
                    placeholder="Add a message..."
                    className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                  />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Send Payment</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
