"use client";
import Container from "../Container";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegistrationModal";
import Logo from "./Logo";
import Search from "./Search";
import SectionBar from "./SectionBar";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const handleLogin = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const handleSignup = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const handleRent = () => {
    // Rent logic here
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  return (
    <div className="fixed w-full bg-black z-10 shadow-sm flex flex-col">
      <div className="py-4 hidden md:block">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <SectionBar />
            <UserMenu
              isAuthenticated={isAuthenticated}
              onLogin={handleLogin}
              onSignup={handleSignup}
              onRent={handleRent}
            />
          </div>
        </Container>
      </div>
      <div className="searchModel flex justify-center py-1">
        <Search />
      </div>
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

export default NavBar;
