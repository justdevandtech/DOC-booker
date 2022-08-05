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
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { useEffect, useCallback, useState } from "react";
import { Loading } from "../components/Loading";
import { toast } from 'react-hot-toast';
import  moment  from 'moment';

export const DoctorList = () => {
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
  console.log(doctors.data);
  const blockDoctor = async (doctorId: string) => {
    try {
      const { data } = await axios.put(
        `/api/doctor/block-doctor`,
        { doctorId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchDoctors();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const changeDoctorStatus = useCallback(
    async (doctorId: string, status: string) => {
      try {
        setLoading(true);
        const { data } = await axios.put(
          "/api/doctor/change-doctor-status",
          { doctorId, status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data.success) {
          toast.success(data.message);
          fetchDoctors();
        }
        setLoading(false);
      } catch (error:any) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    },
    []
  );

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (doctors.data?.length === 0) {
    return (
      <Center fontSize={"50px"} fontWeight='bold' mt={5}>
        No doctors data found
      </Center>
    );
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
                const {
                  _id,
                  first_name,
                  last_name,
                  email,
                  createdAt,
                  status,
                  userId,
                } = doctor;
                console.log(userId);
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
                    <Td fontSize={"12px"}>
                      {moment(createdAt).format("MMMM Do YYYY, h:mm a")}
                    </Td>
                    <Td>{status}</Td>
                    <Td>
                      {status === "pending" || status === "blocked" ? (
                        <Button
                          size={"sm"}
                          bg='#3182CE'
                          color='white'
                          onClick={() => changeDoctorStatus(_id, "approved")}
                        >
                          Approve
                        </Button>
                      ): null}
                      {status === "approved" && (
                        <Button size={"sm"} bg='red' color='white' onClick={() => blockDoctor(_id)}>
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
