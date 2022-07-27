import { Box, Text, Center } from "@chakra-ui/react";
import {BsBellFill} from 'react-icons/bs';
import {  useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

export const TopNav = () => {
  const {user} = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const openNotification = () => {
   navigate('/notifications');
  }
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
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
      <Box
        right='8px'
        pos={"relative"}
        display={"flex"}
        cursor='pointer'
        onClick={openNotification}
      >
        <BsBellFill color={"blue.500"} fontSize={"25px"} />
        {user?.unseenNotification.length > 0 && (
          <Box
            zIndex={1}
            display='flex'
            justifyContent={"center"}
            alignItems='center'
            fontSize='12px'
            textAlign='center'
            py={"auto"}
            w='15px'
            h={"15px"}
            bg='red'
            rounded='full'
            color={"white"}
            right='-3px'
            pos={"absolute"}
            onClick={openNotification}
          >
            {user?.unseenNotification.length}
          </Box>
        )}
      </Box>
    </Box>
  );
};
