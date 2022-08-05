import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { TopNav } from "./TopNav";
import { Routes, Route } from "react-router-dom";
import { Appointment } from "../../pages/Appointment";
import { Apply } from "../../pages/Apply";
import { BiCollapse } from "react-icons/bi";
import { toggle } from "../../features/common/indexSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DoctorList } from "../../pages/DoctorList";
import { UserList } from "../../pages/UserList";
import { ProtectedRoute } from "../ProtectedRoute";
import { Notifacations } from "../../pages/Notifacations";
import { UserProfile } from '../../pages/UserProfile';
import { DoctorProfile } from "../../pages/DoctorProfile";
import { Home } from "../../pages/Home";

export const Main = () => {
  const dispatch = useAppDispatch();
  const { sideBarIsToggled } = useAppSelector(state => state.index);
  const toggleSideBar = () => {
    dispatch(toggle());
  };

  const styles: React.CSSProperties | undefined = {
    height: "100vh",
    width: sideBarIsToggled ? "calc(100vw - 70px)" : "calc(100vw - 200px)",
    marginLeft: sideBarIsToggled ? "70px" : "200px",
    marginTop: "10px",
  };
  return (
    <Box w={{base: '0px', md:'100%', sm:'100%'}} style={styles}>
      <Container maxW={"container.xl"}>
        <Box display={"flex"} alignItems='center'>
          <Box
            border={"1px"}
            cursor='pointer'
            rounded={"md"}
            mr={2}
            p={2}
            borderColor='#eaeaea'
            onClick={toggleSideBar}
          >
            <BiCollapse color='#1d3557' fontWeight={"bolder"} />
          </Box>
          <TopNav />
        </Box>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/appointments' element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          } />
          <Route
            path='/apply'
            element={
              <ProtectedRoute>
                <Apply />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/doctors'
            element={
              <ProtectedRoute>
                <DoctorList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/users'
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/notifications'
            element={
              <ProtectedRoute>
                <Notifacations />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/doctor/profile/:doctorId'
            element={
              <ProtectedRoute>
                <DoctorProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Box>
  );
};
