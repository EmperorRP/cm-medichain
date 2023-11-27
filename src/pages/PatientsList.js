import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  Flex,
  Avatar,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import NewPatientForm from '../components/NewPatientForm';

const calculateBMI = (weight, height) => {
  return (weight / (height * height)).toFixed(1);
};

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Function to fetch patients from the backend API
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // useEffect to call fetchPatients when the component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  const addNewPatient = async (newPatientData) => {
    try {
      // Call fetchPatients to refresh the list only after the POST request is successful
      fetchPatients();
    } catch (error) {
      console.error('Error adding new patient:', error);
    }
  };

  const deletePatient = async (index) => {
    try {
      await axios.delete(`http://localhost:3001/patients/${index}`);
      // Refresh the patient list
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };
  

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl" textAlign="center">
          Patients List
        </Heading>
        <NewPatientForm onSave={addNewPatient}/>
      </Flex>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={8} justifyContent="center">
        {patients.map((patient, index) => (
          <Box
            key={index}
            bg={cardBg}
            boxShadow="lg"
            padding={4}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
            maxWidth="300px"
          >
            <VStack spacing={2} align="stretch">
              <Avatar name={patient.name} size="xl" alignSelf="center" />
              <Text fontWeight="bold" textAlign="center">{patient.name}</Text>
              <Text fontWeight="bold">Age: <Text as="span" fontWeight="normal">{patient.age}</Text></Text>
              <Text fontWeight="bold">Weight: <Text as="span" fontWeight="normal">{patient.weight} kg</Text></Text>
              <Text fontWeight="bold">Height: <Text as="span" fontWeight="normal">{patient.height} m</Text></Text>
              <Text fontWeight="bold">BMI: <Text as="span" fontWeight="normal">{calculateBMI(patient.weight, patient.height)}</Text></Text>
              <Flex flexDirection="column" gap={2}>
                <Button as={RouterLink} to={`/patients/${index}`} variant="outline" colorScheme="blue" size="sm" leftIcon={<AddIcon />} w="full">
                    View Profile
                </Button>
                <Button
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  leftIcon={<CloseIcon />}
                  w="full"
                  onClick={() => deletePatient(index)} // Use the index here
                >
                  Remove Profile
                </Button>
              </Flex>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PatientsList;

// {
//   "name": "Alice Smith",
//   "weight": 60,
//   "height": 1.65,
//   "bloodType": "A+",
//   "bloodGlucoseLevel": "100 mg/dL",
//   "bloodPressureLevel": "120/80",
//   "diseases": ["Diabetes"],
//   "allergies": ["Penicillin"]
// }