import React, { useEffect, useState } from 'react';
import profileService from '../services/profileService';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await profileService.getProfile();
                setProfile(data);
                setFullname(data.fullname);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedProfile = { fullname, email, phone, address };
        await profileService.updateProfile(updatedProfile);
        // Optionally, fetch the updated profile again
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>

            <form onSubmit={handleUpdate}>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Update Profile</button>

            </form>
        </div>
    );
};

export default Profile;
