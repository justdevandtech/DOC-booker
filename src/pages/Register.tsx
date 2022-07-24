import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { IRegisterUser } from "../interfaces/index";
import axios from "axios";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";

export const Register = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  /******************************************************** */
  const [formData, setFormData] = useState<IRegisterUser>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  /******************************************************** */

  /******************************************************** */
  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  /******************************************************** */

  /******************************************************** */
  const submitFormData = async (e: any | IRegisterUser): Promise<void> => {
    e.preventDefault();
    //check if user filled out all fields
    if (
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirm_password === ""
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    //send data to server
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/register", formData);
      if (response.data.success) {
        setIsLoading(false);
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsLoading(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    }
  };
  /******************************************************** */

  const colorMode = useColorModeValue("white", "gray.700");
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box display={"flex"} mx='auto'>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={colorMode} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id='firstName' isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type='text'
                      name='first_name'
                      placeholder='Paul'
                      onChange={handleFormData}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id='lastName'>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type='text'
                      name='last_name'
                      placeholder='A'
                      onChange={handleFormData}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={handleFormData}
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    placeholder='Password'
                    onChange={handleFormData}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id='confirmPassword' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name='confirm_password'
                    placeholder='Confirm Password'
                    onChange={handleFormData}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={submitFormData}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href='/login' color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
