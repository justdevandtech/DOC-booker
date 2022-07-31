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
} from "@chakra-ui/react";
// import { useAppDispatch, useAppSelector } from '../app/hooks'
// import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { UserActionMenu } from '../components/UserActionMenu';
import moment from "moment";

export const UserList = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/auth/get-all-users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (data.success) {
        setUsers(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  let dd = users?.data?.map((user: any) => {
    return user;
  });
  console.log(dd);

  if (loading) {
    return <Loading />;
  }
  return (
    <Box mt={4}>
      <Center>
        <Heading as='h1' size='lg'>
          Users Data
        </Heading>
      </Center>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>All user's data</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Date</Th>
              <Th>Role</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.data?.length > 0 &&
              users?.data?.map((user: any) => (
                <Tr key={user._id}>
                  <Td>
                    {user.first_name} {user.last_name}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td fontSize={'12px'}>
                    {moment(user.createdAt).format("MMMM Do YYYY, h:mm a")}
                      
                  </Td>
                  <Td>{user.isAdmin ? "Admin" : "User"}</Td>
                  <Td>{!user.isAdmin && <UserActionMenu />}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
