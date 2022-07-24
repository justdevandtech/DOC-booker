import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../features/auth/authSlice";
import { Loading } from "./Loading";

interface IProtectedRoutedProps {
  children: React.ReactNode;
}

export const ProtectedRouted = ({
  children,
}: IProtectedRoutedProps): JSX.Element => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

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
      dispatch(setUser(response.data.data));
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        setIsLoading(false);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
        setIsLoading(false);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
      setIsLoading(false);
      console.log(error);
    }
  }, [dispatch, navigate, token]);
  /******************************************************* */

  /******************************************************* */
  useEffect(() => {
    if (!user) {
      getUser();
    }

    if (!token) {
      navigate("/login");
    }
  }, [token, navigate, user, getUser, dispatch]);
  /******************************************************* */

  if (isLoading) {
    return <Loading />;
  }
  return <>{token && children}</>;
};
