import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-md">
        <p className="text-gray-600">Mobile Number:</p>
        <p className="text-lg font-semibold text-gray-900">+91 XXXXXXXXXX</p>

        <hr className="my-4" />

        <p className="text-gray-600">Name:</p>
        <p className="text-lg font-semibold text-gray-900">Your Name Here</p>

        {/* Add more profile fields below as needed */}
      </div>
    </div>
  );
};

export default ProfilePage;
