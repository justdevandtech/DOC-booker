import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ILoginUser } from "../interfaces/index";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /************************************************** */
  const [formData, setFormData] = useState<ILoginUser>({
    email: "",
    password: "",
    remember_me: false,
  });
  /************************************************** */
  
  /************************************************** */
  const handleFormData = (e: ILoginUser | any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      remember_me: e.target.checked,
    });
  };
  /************************************************** */
  
  /************************************************** */
  const submitFormData = async (e: any) => {
    e.preventDefault();
    //check if user filled out all fields
    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/login", formData);
      if (response.data.success) {
        setIsLoading(false);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };
  /************************************************** */

  const colorMode = useColorModeValue("white", "gray.700");
  if (isLoading) {
    return <Loading />;
  }

  /************************************ */
  return (
    <Box display={"flex"} mx='auto'>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={colorMode} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={handleFormData}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleFormData}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox onChange={handleFormData}>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={submitFormData}
                  isDisabled={formData.email === "" || formData.password === ""}
                >
                  Sign in
                </Button>
                <Link href='/register' color={"blue.400"}>
                  Don't have an account? Sign up
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
