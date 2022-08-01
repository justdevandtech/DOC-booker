import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const DoctorProfile = () => {
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const getPrams = useParams();
  console.log(doctor);

  //fetch doctor profile
  const fetchDoctorProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/doctor/get-doctor-by-id`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDoctor(data.data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  return <Box>DoctorProfile</Box>;
};
