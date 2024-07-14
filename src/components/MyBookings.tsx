import { useState, useEffect } from "react";
import { fetchUserBookings } from "../api/index";
import { Booking } from "@/types/userAuthentication";

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
//Api calling to fetch the user bookings
  // useEffect(() => {
  //   fetchBookings();
  // }, []);

  // const fetchBookings = async () => {
  //   setIsLoading(true);
  //   setError("");
  //   try {
  //     const response = await fetchUserBookings();
  //     setBookings(response.data);
  //   } catch (error) {
  //     setError("Failed to fetch bookings");
  //     console.error("Failed to fetch bookings", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="mb-4">
              <div className="p-4 border border-gray-300 rounded-lg">
                <p>{booking.details}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
