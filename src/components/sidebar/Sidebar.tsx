import React from "react";
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { GrHomeOption } from "react-icons/gr";
import { BiTask } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import {HiOutlineLogout} from "react-icons/hi";
import {FaUserCog} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const {sideBarIsToggled} = useAppSelector(state => state.index);

  const styles: React.CSSProperties | undefined = {
    height: "95vh",
    width: sideBarIsToggled ? "70px" : "200px",
    position: "fixed",
    top: "10px",
    left: "10px",
    bottom: "10px",
    backgroundColor: "white",
    border: "1px solid #eaeaea",
    zIndex: "1",
    padding: "10px",
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
    transition: "0.3s ease-in-out",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
    willChange: "left, top, width",
    transform: "translate3d(0px, 0px, 0px)",
    transitionProperty: "left, top, width",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease-in-out",
    transitionDelay: "0s",
  };
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <GrHomeOption />,
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: <BiTask />,
    },
    {
      name: "Apply ",
      href: "/apply",
      icon: <IoIosAddCircle />,
    },
    {
        name: "Profile",
        href: "/profile",
        icon: <FaUserCog />,
    }
  ];

  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Box rounded={"md"} style={styles}>
      {!sideBarIsToggled ? (
        <Heading mt={3} color={"#1d3557"} fontSize={"25px"} as='h1'>
          <Center>
            <Link to='/'> Reminda </Link>
          </Center>
        </Heading>
      ) : (
        <Heading
          color={"#1d3557"}
          fontWeight='extrabold'
          fontSize={"25px"}
          as='h1'
        >
          <Link to='/'> RM </Link>
        </Heading>
      )}
      <Box mt={"80px"}>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Box
              bg={isActive ? "blue.500" : "transparent"}
              key={index}
              p={"10px"}
              px={sideBarIsToggled ? "20px" : ""}
              rounded={isActive ? "md" : "none"}
              color={isActive ? "white" : "#1d3557"}
              display='flex'
              mx={sideBarIsToggled ? "auto" : ""}
              mt={"30px"}
              alignItems={"center"}
              justifyContent={sideBarIsToggled ? "center" : undefined}
            >
              <Box
                display={"flex"}
                alignContent='center'
                color={"#1d3557"}
                mr={sideBarIsToggled ? "0px" : 5}
                as={Link}
                to={item.href}
              >
                {item.icon}
              </Box>
              {!sideBarIsToggled && <Link to={item.href}>{item.name}</Link>}
            </Box>
          );
        })}
      </Box>
      <Button
        bg={"red"}
        color='white'
        _hover={{ bg: "red", opacity: "0.7" }}
        display={"flex"}
        alignItems={"center"}
        mx={"auto"}
        pos='absolute'
        bottom={"50px"}
        left={sideBarIsToggled ? "10px" : undefined}
        right={sideBarIsToggled ? "10px" : undefined}
        onClick={logoutUser}
      >
        <HiOutlineLogout /> {!sideBarIsToggled && <Text ml={3}>Logout</Text>}
      </Button>
    </Box>
  );
};
