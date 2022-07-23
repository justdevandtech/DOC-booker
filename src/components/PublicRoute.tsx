import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface IPublicRoutedProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: IPublicRoutedProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return <>{!token && children}</>;
};
