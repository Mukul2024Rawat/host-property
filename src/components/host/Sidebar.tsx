import React from 'react';
import Link from 'next/link';
const Sidebar = () => {
  return (
    <div className="bg-red-200 w-60 p-4">
      <div className="mb-8 text-xl font-bold">air nb</div>
      <nav>
        <ul>
          <li className="mb-4">
            <Link className="text-gray-700" href="/host/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link className="text-gray-700" href="/host/listings">
              My Listings
            </Link>
          </li>
          <li>
            <Link className="text-gray-700" href="/host/add-property">
              Add Property
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;