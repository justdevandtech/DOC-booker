import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Link,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// interface IDoctors {
//   doctors: any;
// }

export const DoctorCard = ({ doctors }: any) => {
  const bgColor = useColorModeValue("white", "gray.900");
  //   const bgColor2 = useColorModeValue("gray.50", "gray.800");
  //   const bgColor3 = useColorModeValue("gray.50", "gray.800");
  //   const bgColor4 = useColorModeValue("gray.50", "gray.800");
  const Color1 = useColorModeValue("gray.700", "gray.400");

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
        <Text textAlign={"center"} color={Color1} px={3}>
          Actress, musician, songwriter and artist. PM for work inquires or{" "}
          <Link href={"#"} color={"blue.400"}>
            #tag
          </Link>{" "}
          me in your posts
        </Text>
        {/* 
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={bgColor2}
                fontWeight={"400"}
              >
                #art
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={bgColor3}
                fontWeight={"400"}
              >
                #photography
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={bgColor4}
                fontWeight={"400"}
              >
                #music
              </Badge>
            </Stack> */}

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
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

  return (
    <SimpleGrid mt={4} columns={[2, null, 3]} spacing='20px'>
      {displayDoctors}
    </SimpleGrid>
  );
};
