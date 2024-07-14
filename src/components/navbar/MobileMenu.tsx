"use client";
import { useEffect, useState } from "react";
import { FaHome, FaBell, FaUser } from "react-icons/fa";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegistrationModal";

const MobileMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };
  const handleSignup = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };
  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleHomeClick = () => {};

  return (
    <div className="fixed bottom-0 w-full md:hidden bg-white text-gray-700 font-semibold shadow-md">
      <ul className="flex justify-around py-4">
        <li className="flex flex-col items-center" onClick={handleHomeClick}>
          <FaHome size={24} />
          <span className="text-xs">Home</span>
        </li>
        <li className="flex flex-col items-center">
          <FaBell size={24} />
          <span className="text-xs">Notifications</span>
        </li>
        <li className="flex flex-col items-center" onClick={handleProfileClick}>
          <FaUser size={24} />
          <span className="text-xs">Profile</span>
        </li>
      </ul>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        onSwitchToRegister={handleSignup}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        onSwitchToLogin={handleLogin}
      />
    </div>
  );
};

export default MobileMenu;
