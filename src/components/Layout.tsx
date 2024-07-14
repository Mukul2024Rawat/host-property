import { useState } from "react";
import { useRouter } from "next/navigation";
import MyProfile from "./MyProfile";
import MyBookings from "./MyBookings";

const Layout: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"profile" | "bookings">(
    "profile"
  );

  const navigateToRoot = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex shadow-lg">
      <nav className="w-64 bg-gray-100 rounded-r-2xl p-6 shadow-md">
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-4 rounded-br-lg shadow-lg ${
              activeSection === "profile" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            My Profile
          </li>
          <li
            className={`cursor-pointer p-4 rounded-br-lg shadow-lg ${
              activeSection === "bookings" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => setActiveSection("bookings")}
          >
            My Bookings
          </li>
        </ul>
        <button
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={navigateToRoot}
        >
          Back to Home
        </button>
      </nav>
      <div className="flex-grow p-6">
        {activeSection === "profile" && <MyProfile />}
        {activeSection === "bookings" && <MyBookings />}
      </div>
    </div>
  );
};

export default Layout;
