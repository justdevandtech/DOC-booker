import { Box, Text, Center } from "@chakra-ui/react";
import {BsBellFill} from 'react-icons/bs';
import {  useAppSelector } from '../../app/hooks';

export const TopNav = () => {
  const {user} = useAppSelector(state => state.auth);
  return (
    <Box
      display={"flex"}
      w={"100%"}
      h='50px'
      border='1px solid'
      borderColor={"#eaeaea"}
      bg={"white"}
      p={"10px"}
      rounded={"md"}
      pos='relative'
    >
      <Center>
        <Text>Welcome, {user?.first_name}</Text>
      </Center>
      <Box position={"absolute"} right='8px' display={"flex"} float={"right"}>
        <BsBellFill color={"blue.500"} fontSize={"25px"} />
      </Box>
    </Box>
  );
};
