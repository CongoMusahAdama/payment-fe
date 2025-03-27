import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SkeletonCard } from "@/components/loading-skeleton";
import { useAuth } from "@/context/auth.context";
import { Dispatch, SetStateAction, useState } from "react";
import { ProfileTypes } from "@/utils/types/profile";
import { clearAuthTokens, getAccessToken } from "@/utils/constant";
import { toast } from "sonner";
import profileService from "@/services/profileService";
import authService from "@/services/authService";
type Props = {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setEditedProfile: Dispatch<SetStateAction<ProfileTypes>>;
  editedProfile: ProfileTypes;
};

const Profile = ({ setEditedProfile, setIsEditing, isEditing, editedProfile }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { profile, isLoadingProfile, setProfile, setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

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
    <>
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
    </>
  );
};

export default Profile;
