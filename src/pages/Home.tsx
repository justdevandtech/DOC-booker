import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { DoctorCard } from "../components/DoctorCard";
import { appRespondClient } from "../api";
import { SendChat } from "../components/modals/chat/SendChat";

export const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [approvedDoctors, setApprovedDoctors] = useState<any>([]);

  //home page display all approved doctors only
  const fetchDoctors = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await appRespondClient.get(
        "/api/doctor/get-all-approved-doctors"
      );
      if (data.success) {
        setApprovedDoctors(data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);


  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
      <DoctorCard doctors={approvedDoctors} />
      <SendChat />
    </Box>
  );
};
