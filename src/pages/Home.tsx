import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { DoctorCard } from "../components/DoctorCard";
import { doctorClient } from "../api";

export const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [approvedDoctors, setApprovedDoctors] = useState<any>([]);

  //home page display all approved doctors only
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await doctorClient.get(
        "get-all-approved-doctors",
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
    </Box>
  );
};
