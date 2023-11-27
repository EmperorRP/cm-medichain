// NewPatientForm.js
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';

const NewPatientForm = ({ onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    bloodPressure: '',
    bloodGlucose: '',
    bloodType: '',
    allergies: '',
    diseases: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/patients', patientData);
      onSave(patientData); // Use the onSave prop here
      onClose(); // Close the modal after saving
      // Reset the form
      setPatientData({
        name: '',
        age: '',
        weight: '',
        height: '',
        bloodPressure: '',
        bloodGlucose: '',
        bloodType: '',
        allergies: '',
        diseases: ''
      });
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />} colorScheme="teal" variant="outline">
        Add Patient
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Name" name="name" onChange={handleInputChange} value={patientData.name} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Age</FormLabel>
          <Input placeholder="Age" name="age" type="number" onChange={handleInputChange} value={patientData.age} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Weight (kg)</FormLabel>
          <Input placeholder="Weight" name="weight" type="number" onChange={handleInputChange} value={patientData.weight} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Height (m)</FormLabel>
          <Input placeholder="Height" name="height" type="number" step="0.01" onChange={handleInputChange} value={patientData.height} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Blood Glucose Level (mg/dL)</FormLabel>
          <Input placeholder="Blood Glucose Level" name="bloodGlucose" onChange={handleInputChange} value={patientData.bloodGlucose} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Blood Pressure</FormLabel>
          <Input placeholder="Blood Pressure" name="bloodPressure" onChange={handleInputChange} value={patientData.bloodPressure} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Blood Type</FormLabel>
          <Input placeholder="Blood Type" name="bloodType" onChange={handleInputChange} value={patientData.bloodType} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Allergies</FormLabel>
          <Input placeholder="Allergies" name="allergies" onChange={handleInputChange} value={patientData.allergies} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Diseases</FormLabel>
          <Input placeholder="Diseases" name="diseases" onChange={handleInputChange} value={patientData.diseases} />
        </FormControl>
      </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPatientForm;
