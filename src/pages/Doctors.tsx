import {
  Table,
  Thead,
  Tbody,
  Heading,
  Center,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Text
} from "@chakra-ui/react";
// import { useAppDispatch, useAppSelector } from '../app/hooks'
// import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const Doctors = () => {
  const [doctors, setDoctors] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/doctor/get-all-doctors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (data.success) {
        setDoctors(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  let dd = doctors?.data?.map((doctor: any) => {
    return doctor;
  });
  console.log(dd);

  if (loading) {
    return <Loading />;
  }
  return (
    <Box mt={4}>
      <Center>
        <Heading as='h1' size='lg'>
          Doctor's Data
        </Heading>
      </Center>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>All doctor's data</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {doctors?.data?.length > 0 &&
              doctors?.data?.map((doctor: any, index: number) => {
                const { _id, first_name, last_name, email, createdAt, status } = doctor;
                return (
                  <Tr key={_id}>
                    <Td display={"flex"} alignItems='center'>
                      <Text
                        fontWeight={"bold"}
                        fontSize='25px'
                        color={"#1D3557"}
                        mr={3}
                      >
                        #{index + 1}
                      </Text>
                      {first_name} {last_name}
                    </Td>
                    <Td>{email}</Td>
                    <Td>{createdAt}</Td>
                    <Td>{status}</Td>
                    <Td>
                      {status === "pending" && (
                        <Button size={"sm"} bg='#3182CE' color='white'>
                          Approve
                        </Button>
                      )}
                      {status === "approved" && (
                        <Button size={"sm"} bg='red' color='white'>
                          Block
                        </Button>
                      )}
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
