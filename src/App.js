import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Navbar from './components/Navbar';
import PatientsList from './pages/PatientsList';
import PatientDetails from './pages/PatientDetails';
// import { Web5 } from '@web5/api';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Router>
        <Routes>
          <Route path="patientslist" element={<PatientsList/>}/>
          <Route path="patients/:patientId" element={<PatientDetails/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
