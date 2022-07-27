import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../features/auth/authSlice";
import { Loading } from "./Loading";
import { toast } from 'react-hot-toast';

interface IProtectedRoutedProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  children,
}: IProtectedRoutedProps): JSX.Element => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  /******************************************************* */
  const getUser = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/api/auth/get-user-info-by-id",
        {
          token,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem("userPros", JSON.stringify(response.data.data));
      dispatch(setUser(response.data.data));
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        setIsLoading(false);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        setIsLoading(false);
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      setIsLoading(false);
      console.log(error);
    }
  }, [dispatch, navigate, token]);
  /******************************************************* */

  //admin only routes
  const adminMenuItems = useMemo(
    () => [
      {
        name: "Users",
        path: "/users",
      },
      {
        name: "Doctors",
        path: "/doctors",
      },
    ],
    []
  );

  /******************************************************* */
  useEffect(() => {
    if (!user) {
      getUser();
    }

    if (!token) {
      navigate("/login");
    }

    /********************************************************************* */
    //user should only be able to access admin routes if they are an admin
    const user_props = JSON.parse(localStorage.getItem("userPros") || "{}");
    !user_props.isAdmin &&
      adminMenuItems.map(route => {
        if (location.pathname.includes(route.path)) {
          toast.error("You do not have permission to access this page");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        return null;
      });
    /********************************************************************* */
  }, [token, navigate, user, getUser, dispatch, adminMenuItems, location]);
  /******************************************************* *********/

  if (isLoading) {
    return <Loading />;
  }
  return <>{token && children}</>;
};
