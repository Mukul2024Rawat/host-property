import React from 'react';
import Image from 'next/image'
import { IoNotificationsOutline } from "react-icons/io5";
import profileDemo from "../../../public/profileDemo.jpg"
const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <div>
        <input type="text" placeholder="Search..." className="border rounded p-2" />
      </div>
      <div className="flex items-center">
        <span className='flex items-center mr-4'><IoNotificationsOutline size={24} /></span>
        <span className="mr-4">:us:</span>
        <Image src={profileDemo} alt="Profile" width={40} height={40} className="rounded-full"/>
      </div>
    </div>
  );
};
export default Header;