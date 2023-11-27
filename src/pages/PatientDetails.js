// PatientDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Flex,
    Avatar,
    Heading,
    Text,
    VStack,
    HStack,
    useColorModeValue, 
    Input, 
    Textarea, 
    Button,
    Stat,
    StatLabel,
    StatNumber,
    Stack
  } from '@chakra-ui/react';
import axios from 'axios';


const PatientDetails = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/patients/${patientId}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

  const handleReportUpload = (event) => {
    // You would handle the file upload logic here, typically involving setting up
    // FormData and sending it to your server via an API call.
  };

  const handlePrescriptionSubmit = (event) => {
    // Logic to send the prescription text to your server via an API call
  };
  // const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box p={8} boxShadow="lg" borderRadius="lg" maxW="container.md" mx="auto">
      <Stack spacing={4} align="center">
  {/* Patient details display */}
  <Avatar size="2xl" name={patient.name} />
  <Heading as="h2">{patient.name}</Heading>
  <Text fontWeight="bold">Age: <Text as="span" fontWeight="normal">{patient.age}</Text></Text>
  <Text fontWeight="bold">Weight: <Text as="span" fontWeight="normal">{patient.weight} kg</Text></Text>
  <Text fontWeight="bold">Height: <Text as="span" fontWeight="normal">{patient.height} m</Text></Text>
  <Text fontWeight="bold">Blood Pressure: <Text as="span" fontWeight="normal">{patient.bloodPressure}</Text></Text>
  <Text fontWeight="bold">Blood Glucose Level: <Text as="span" fontWeight="normal">{patient.bloodGlucose}</Text></Text>
  <Text fontWeight="bold">Blood Type: <Text as="span" fontWeight="normal">{patient.bloodType}</Text></Text>
  <Text fontWeight="bold">Allergies: <Text as="span" fontWeight="normal">{patient.allergies}</Text></Text>
  <Text fontWeight="bold">Diseases: <Text as="span" fontWeight="normal">{patient.diseases}</Text></Text>
</Stack>

      <Box>
        <Heading as="h3" size="lg" mb={4}>Report Upload</Heading>
        <Input type="file" onChange={handleReportUpload} />
        <Button mt={4} colorScheme="teal" onClick={() => {/* Logic to confirm upload */}}>
          Upload Report
        </Button>
      </Box>
      <Box mt={8}>
        <Heading as="h3" size="lg" mb={4}>Prescription Notes</Heading>
        <Textarea placeholder="Type prescription here..." />
        <Button mt={4} colorScheme="blue" onClick={handlePrescriptionSubmit}>
          Send Prescription
        </Button>
      </Box>
    </Box>
  );
};

export default PatientDetails;
