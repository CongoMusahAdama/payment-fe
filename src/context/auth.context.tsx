import { getAccessToken, URL } from "@/utils/constant";
import { ProfileTypes, UserResponse } from "@/utils/types/profile";
import axios from "axios";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
const API_URL = `${URL}/users/profile`;

interface AuthContextType {
  isAuthenticated: boolean;
  profile: ProfileTypes;
  setProfile: React.Dispatch<React.SetStateAction<ProfileTypes>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingProfile: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);

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
  console.log("profile", profile);

  const getProfile = async () => {
    setIsLoadingProfile(true);
    const token = getAccessToken();
    try {
      const { data } = (await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })) as { data: UserResponse };
      setProfile({
        Fullname: data.user.Fullname,
        email: data.user.email,
        phone: data.user.phone,
        address: data.user.address,
        moneyRequests: data.user.moneyRequests,
        payments: data.user.payments,
        transactions: data.user.transactions,
      } as ProfileTypes);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile, setIsAuthenticated, isLoadingProfile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
