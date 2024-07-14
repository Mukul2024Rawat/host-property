import { FormEvent } from "react";

export interface SetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
export interface User {
  name: string;
  email: string;
  phone: string;
  profilePhoto: string;
}

export interface UserMenuProps {
    isAuthenticated: boolean;
    onLogin: () => void;
    onSignup: () => void;
    onRent: () => void;
  }
  
export interface Booking {
  id: number;
  details: string;
}
