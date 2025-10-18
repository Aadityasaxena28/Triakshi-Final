import { updateProfile as updateProfileAPI } from "@/API/Profile";
import type { UserProfile } from "@/DataTypes/Profile";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import { Edit2, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Loader from "../General/Loader";

type ProfileProps = {
  profile?: UserProfile;
  isLoading: boolean;
  isError: boolean;
  refetchProfile: () => void;
};

const emptyProfile: UserProfile = {
  name: "",
  phone: 0,
  email: "",
  address: "",
  state: "",
  city: "",
  zipcode: "",
  image: "",
};

const Profile = ({ profile, isLoading, isError, refetchProfile }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Ensure we always have a complete object for local state
  const initial = useMemo<UserProfile>(() => ({ ...emptyProfile, ...(profile ?? {}) }), [profile]);

  const [userData, setUserData] = useState<UserProfile>(initial);
  const [editData, setEditData] = useState<UserProfile>(initial);

  // Sync local state whenever a fresh profile arrives
  useEffect(() => {
    const merged = { ...emptyProfile, ...(profile ?? {}) };
    setUserData(merged);
    setEditData(merged);
  }, [profile]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  function extractTenDigitsPhone(input?: string) {
  if (!input) return "";
  const digits = (input.match(/\d/g) || []).join("");
  // take last 10 if it looks like +91xxxxxxxxxx
  if (digits.length >= 10) return digits.slice(-10);
  return "";
}
  const handleSave = async () => {
    try {
      setSaving(true);

      // (Optional) minimal client-side validation
      if (!editData.name?.trim()) throw new Error("Name is required");
      if (!editData.phone) throw new Error("Phone is required");
      if (!editData.email?.trim()) throw new Error("Email is required");
      // Call backend
      const ok = await updateProfileAPI(editData);
      if (!ok) throw new Error("Failed to update profile");

      // Reflect locally & refresh from server (source of truth)
      setUserData(editData);
      setIsEditing(false);
      await refetchProfile();

      // UX feedback
      if (typeof window !== "undefined") {
        // replace with your toastSuccess if available
        toastSuccess("Profile updated successfully");
      }
    } catch (err: any) {
      // replace with your toastError if available
      toastError(err?.message || "Failed to update profile");
      // alert(err?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div><Loader/></div>;
  if (isError) return <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-red-600 font-semibold">
            Failed to load profile.
          </p>
        </div>
      </div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-yellow-600">My Profile</h2>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              <Edit2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-10 lg:h-10" />
              <span className="text-sm sm:text-base md:text-lg font-semibold">Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-green-500 disabled:opacity-70 disabled:cursor-not-allowed text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-green-600 transition"
            >
              <Save className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-10 lg:h-10" />
              <span className="text-sm sm:text-base md:text-lg font-semibold">
                {saving ? "Saving…" : "Save Changes"}
              </span>
            </button>
          )}
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 mb-4">
            <img
              src={userData.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Full Name */}
          <Field
            label="Full Name"
            isEditing={isEditing}
            displayValue={userData.name}
            input={
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            }
          />

          {/* Phone Number */}
          <Field
            label="Phone Number"
            isEditing={isEditing}
            displayValue={userData.phone}
            input={
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            }
          />

          {/* Email Address */}
          <Field
            label="Email Address"
            isEditing={isEditing}
            displayValue={userData.email}
            input={
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            }
          />

          {/* Address */}
          <Field
            label="Address"
            isEditing={isEditing}
            displayValue={userData.address}
            input={
              <textarea
                value={editData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            }
          />

          

          {/* City */}
          <Field
            label="City"
            isEditing={isEditing}
            displayValue={userData.city}
            input={
              <input
                type="text"
                value={editData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            }
          />

          {/* State */}
          <Field
            label="State"
            isEditing={isEditing}
            displayValue={userData.state}
            input={
              <input
                type="text"
                value={editData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            }
          />

          {/* Zip Code */}
          <Field
            label="Zip Code"
            isEditing={isEditing}
            displayValue={userData.zipcode}
            input={
              <input
                type="text"
                value={editData.zipcode}
                onChange={(e) => handleInputChange("zipcode", e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

/* --- Little helper to cut repetition --- */
function Field({
  label,
  isEditing,
  displayValue,
  input,
}: {
  label: string;
  isEditing: boolean;
  displayValue?: string | null;
  input: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      {isEditing ? (
        input
      ) : (
        <div className="px-4 py-3 bg-yellow-50 rounded-lg text-gray-800">
          {displayValue || "—"}
        </div>
      )}
    </div>
  );
}
