import { Box, FormControl, FormLabel, Input, SimpleGrid, Button } from "@chakra-ui/react";
import { useState } from 'react';
import axios  from 'axios';
import toast from 'react-hot-toast';
import { Loading } from '../components/Loading';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

export const Apply = ():JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  /******************************************************** */
  const [applyFormData, setApplyFormData] = useState({
    userId: user?.userId,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    feeCharge: "",
    specialization: "",
    fromTime: "",
    toTime: "",
  });
  /******************************************************** */

  /******************************************************** */
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    experience,
    feeCharge,
    specialization,
    fromTime,
    toTime,
  } = applyFormData;
  /******************************************************** */

  /******************************************************** */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setApplyFormData({
      ...applyFormData,
      [e.target.name]: e.target.value,
    });
  };
  /******************************************************** */

  /******************************************************** */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("/api/doctor/apply", applyFormData);
      if (response.data.success) {
        setIsLoading(false);
        toast.success("Application submitted successfully");
        //empty form
        setApplyFormData({
          userId: null,
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          address: "",
          experience: "",
          feeCharge: "",
          specialization: "",
          fromTime: "",
          toTime: "",
        });
        navigate("/");
      } else {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };
  /******************************************************** */

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box p={4} rounded='md' mt={4} border='1px' borderColor={"#eaeaea"}>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={[1, 1, 3]} spacing={4}>
          <FormControl id='first_name' isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type='text'
              name='first_name'
              value={first_name}
              placeholder='Paul'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='last_name' isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type='text'
              name='last_name'
              value={last_name}
              placeholder='Smith'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='Email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type='text'
              name='email'
              value={email}
              placeholder='paul@gmail.com'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='Phone' isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type='tel'
              name='phone'
              value={phone}
              placeholder='paul@gmail.com'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='address' isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              type='text'
              name='address'
              value={address}
              placeholder='some street Lagos, Nigeria'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='experience' isRequired>
            <FormLabel>Experience</FormLabel>
            <Input
              type='text'
              name='experience'
              value={experience}
              placeholder='6 years'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='specializes' isRequired>
            <FormLabel>Specializes</FormLabel>
            <Input
              type='text'
              name='specialization'
              value={specialization}
              placeholder='Web Developement'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='feeCharge' isRequired>
            <FormLabel>Fee Charge</FormLabel>
            <Input
              type='text'
              name='feeCharge'
              value={feeCharge}
              placeholder='How much do you charge?'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='from' isRequired>
            <FormLabel>From</FormLabel>
            <Input
              type='datetime-local'
              name='fromTime'
              value={fromTime}
              min='2022-06-07T00:00'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='to' isRequired>
            <FormLabel>To</FormLabel>
            <Input
              type='datetime-local'
              value={toTime}
              min='2022-06-07T00:00'
              name='toTime'
              onChange={handleChange}
            />
          </FormControl>
        </SimpleGrid>
        <Button type='submit' display={"flex"} mt={4}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
