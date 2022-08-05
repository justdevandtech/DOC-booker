import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { openContactDOCModal } from "../features/modal/modalSlice";
import { useAppDispatch } from '../app/hooks';

export const DoctorCard = ({ doctors }: any) => {
  const bgColor = useColorModeValue("white", "gray.900");
  const dispatch = useAppDispatch()

  const displayDoctors = doctors.map((doctor: any) => {
    return (
      <Box
        key={doctor._id}
        maxW={"100%"}
        w={"full"}
        bg={bgColor}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={4}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          name={doctor.first_name + " " + doctor.last_name}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {doctor.first_name + " " + doctor.last_name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {doctor.specialization}
        </Text>
        <Text>
          Experience: {doctor.experience} years
        </Text>
        <Text>Address: {doctor.address}</Text>
        <Text>Email: {doctor.email}</Text>
        <Text>Tel: {doctor.phone}</Text>
        <Text mt={3} textTransform='capitalize' rounded={'full'} mx={'auto'} width={'50%'} fontWeight='bold' bg={'green.200'}>{doctor.status}</Text>
        <Box>
          ${doctor.feeCharge}
        </Box>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
            isDisabled={doctor.status === "blocked"}
            onClick={() => contactDoctor(doctor._id)}
          >
            Message
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Follow
          </Button>
        </Stack>
      </Box>
    );
  });
const contactDoctor = (doctorId: string) => {
  dispatch(openContactDOCModal());
};

if (doctors?.length === 0) {
  return <Center fontSize={'50px'} fontWeight='bold' mt={5}>No doctors found</Center>;
}
  return (
    <SimpleGrid mt={4} columns={[2, null, 4]} spacing='20px'>
      {displayDoctors}
    </SimpleGrid>
  );
};
