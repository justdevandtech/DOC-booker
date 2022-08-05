import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { appRespondClient } from '../api/index';

export const DoctorProfile = () => {
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);

  //fetch doctor profile
  const fetchDoctorProfile = async () => {
    try {
      setLoading(true);
      const { data } = await appRespondClient.get(
        `/api/doctor/get-doctor-by-id`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setDoctor(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Box>DoctorProfile</Box>;
};
