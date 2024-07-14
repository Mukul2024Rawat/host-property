import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { fetchUserProfile, updateUserProfile } from "@/api";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import Input from "./inputs/Input";
import Image from "next/image";
import { User } from "@/types/userAuthentication";

const MyProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    profilePhoto: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetchUserProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (profilePhotoFile) {
        const formData = new FormData();
        formData.append("profilePhoto", profilePhotoFile);
        await updateUserProfile({
          ...user,
          profilePhoto: formData.get("profilePhoto") as string,
        });
      } else {
        await updateUserProfile(user);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user data", error);
    }
  };

  const handlePasswordModalToggle = () => {
    setIsPasswordModalOpen(!isPasswordModalOpen);
  };

  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhotoFile(file);
      setUser((prevUser) => ({
        ...prevUser,
        profilePhoto: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between space-x-4 mb-6 pr-20">
        <div className="relative w-20 h-20">
          <Image
            src={user.profilePhoto || "/profile.png"}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full border-2"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <button
          onClick={handleEditToggle}
          className={`ml-auto ${
            isEditing ? "bg-rose-500" : "bg-green-500"
          } text-white px-4 py-2 rounded-lg`}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <form onSubmit={handleSaveChanges}>
        <div className="grid grid-cols-2 gap-6">
          <Input
            id="name"
            label="Full Name"
            value={user.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <Input
            id="email"
            label="Email"
            value={user.email}
            onChange={handleInputChange}
            disabled
          />
          <Input
            id="phone"
            label="Phone Number"
            value={user.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {isEditing && (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full p-4 pt-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
              >
                <div className="flex items-center justify-around">
                  <svg
                    className="w-8 h-8 mr-6 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                />
              </label>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={handlePasswordModalToggle}
            className="bg-rose-500 text-white px-4 py-2 rounded-lg"
          >
            Change Password
          </button>
        </div>
        {isEditing && (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleEditToggle}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>

      {isPasswordModalOpen && (
        <ChangePasswordModal
          onClose={handlePasswordModalToggle}
          isOpen={isPasswordModalOpen}
        />
      )}
    </div>
  );
};

export default MyProfile;
