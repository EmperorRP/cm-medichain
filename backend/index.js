import { Web5 } from '@web5/api';
import { DidDhtMethod } from '@web5/dids';


// Assuming Web5.connect() has already been called and you have doctorDid
const { web5, did: doctorDid } = await Web5.connect();

// Create a new record in the patient's DWN
const createPatientRecord = async (patientDid, patientData) => {
  // Here you would typically have patientData as an argument to the function
  const { record } = await web5.dwn.records.create({
    did: patientDid,
    data: JSON.stringify(patientData), // Make sure to stringify the patient data
    message: {
      dataFormat: 'application/json', // Specify the format of your data
    },
  });
  console.log('Created Record:', record);
  console.log('Record ID: ', record.id)
  console.log("***************************")
};

// Function to read a patient record from the patient's DWN
const readPatientRecord = async (recordId) => {
  let { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });
  const data = await record.data.json(); // or .json() if the payload is JSON
  console.log('Read Record:', data);
};

// Function to update an existing patient record in the patient's DWN
const updatePatientRecord = async (recordId, updatedData) => {
  let { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });
  const updateResult = await record.update({
    data: JSON.stringify(updatedData),
  });
  console.log('Updated Record:', updateResult);
  const data = await record.data.json(); // or .json() if the payload is JSON
  console.log('Read Updated Record:', data);
};

const deletePatientRecord = async (recordId) => {
  let { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });
  const deleteResult = await record.delete();
  console.log('Deleted Record:', deleteResult);
  // const data = await record.data.json(); // or .json() if the payload is JSON
  // console.log('Record deleted', data);
};

// Example usage
const patientDid1 = await DidDhtMethod.create(); 
const patientDid = patientDid1.did;

// Sample patient data
const patientData = {
  name: 'Alice Smith',
  weight: 60,
  height: 1.65,
  bloodType: 'A+',
  bloodGlucoseLevel: '100 mg/dL',
  bloodPressureLevel: '120/80',
  diseases: ['Diabetes'],
  allergies: ['Penicillin'],
};

// Perform CRUD operations
const recordId = 'bafyreiewmbu5u6z6qvimbxekw7ypawzddg5cxzoyy6ayewdd4m2u6q3k6q'
await createPatientRecord(patientDid, patientData);
await readPatientRecord(recordId);
await updatePatientRecord(recordId, { ...patientData, weight: 65 }); // Example of updated data
await deletePatientRecord(recordId);