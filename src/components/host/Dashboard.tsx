import React from 'react';
import Image from 'next/image';
import { bookings, dashboardStats } from '../../utils/host/dashboard/fakeData';
import profileDemo from "../../../public/profileDemo.jpg"
const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-700">Orders</h3>
          <p className="text-2xl">${dashboardStats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-700">New Request</h3>
          <p className="text-2xl">${dashboardStats.newRequestValue}</p>
          <p className="text-sm text-gray-500">{dashboardStats.newRequestDays} Days</p>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Booking</th>
              <th className="text-left">Stay Time</th>
              <th className="text-left">Payment</th>
              <th className="text-left">Order Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="py-2 flex items-center">
                  <Image src={profileDemo} alt="Profile" width={48} height={48} className="mr-2 rounded-full" /> 
                  {booking.guestName}
                </td>
                <td className="py-2">{booking.stayDuration}<br/><span className="text-xs text-gray-500">{booking.stayDates}</span></td>
                <td className="py-2">${booking.payment}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    booking.status === 'CONFIRMED' ? 'bg-green-200 text-green-800' :
                    booking.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-2">
                  {booking.status === 'PENDING' && (
                    <>
                      <button className="text-green-500 mr-2">Accept</button>
                      <button className="text-red-500">Decline</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;