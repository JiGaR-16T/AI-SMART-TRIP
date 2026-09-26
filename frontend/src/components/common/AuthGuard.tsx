import React from "react";

export interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard placeholder (Part 2).
 * Real authentication arrives in later parts.
 * Currently allows seamless pass-through for development and review.
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  return <>{children}</>;
};
