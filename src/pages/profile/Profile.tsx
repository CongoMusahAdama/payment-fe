import React, { useEffect, useState } from "react";
import profileService from "../../services/profileService";
import { ProfileTypes } from "../../types/profile";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileTypes>({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(profile);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <form onSubmit={handleUpdate}>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={profile.fullname}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={profile.phone}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={profile.address}
          onChange={handleChange}
          required
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
