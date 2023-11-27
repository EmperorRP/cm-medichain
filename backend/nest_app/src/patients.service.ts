import { Injectable } from '@nestjs/common';
import { Web5 } from '@web5/api';
import { DidDhtMethod } from '@web5/dids';

@Injectable()
export class PatientsService {
  private web5: any;
  private records: Array<{ id: string, recordId: string }> = [];

  constructor() {
    this.init();
  }

  async init() {
    const connection = await Web5.connect();
    this.web5 = connection.web5;
  }

  async createPatientRecord(patientDid: string, patientData: any): Promise<any> {
    const { record } = await this.web5.dwn.records.create({
      did: patientDid,
      data: JSON.stringify(patientData),
      message: { dataFormat: 'application/json' },
    });
    console.log('Created Record ID:', record.id); // Debug log
    this.records.push({ id: this.records.length.toString(), recordId: record.id });
    return { id: this.records.length - 1, recordId: record.id };
  }

  async readPatientRecord(index: number): Promise<any> {
    const recordId = this.records[index]?.recordId;
    if (!recordId) {
        throw new Error('Record ID not found for the given index.');
    }
    const response = await this.web5.dwn.records.read({
      message: { filter: { recordId } },
    });
    return response.record.data.json();
  }

  async updatePatientRecord(index: number, updatedData: any): Promise<any> {
    const recordId = this.records[index]?.recordId;
    let { record } = await this.web5.dwn.records.read({
      message: { filter: { recordId } },
    });
    const existingData = await record.data.json(); // Read existing data
    const mergedData = { ...existingData, ...updatedData }; // Merge existing data with updated data
    await record.update({ data: JSON.stringify(mergedData) }); // Update with merged data
    return mergedData; // Return the updated record
  }

  async deletePatientRecord(index: number): Promise<void> {
    const recordId = this.records[index]?.recordId;
    if (!recordId) {
      throw new Error('Record ID not found for the given index.');
    }
  
    let { record } = await this.web5.dwn.records.read({
      message: { filter: { recordId } },
    });
    await record.delete();
  
    // Remove the record from the array and re-index
    this.records.splice(index, 1);
    this.records = this.records.map((record, newIndex) => ({ ...record, id: newIndex.toString() }));
  }  

  async readAllPatientRecords(): Promise<any[]> {
    return Promise.all(this.records.map(async (record, index) => {
      try {
        return await this.readPatientRecord(index);
      } catch (error) {
        console.error(`Error reading record at index ${index}:`, error);
        return null; // or handle the error as needed
      }
    }));
  } 

  async deleteAllPatientRecords(): Promise<void> {
    await Promise.all(this.records.map(async record => {
      const recordId = record.recordId;
      let recordToDelete = await this.web5.dwn.records.read({
        message: { filter: { recordId } },
      });
      await recordToDelete.record.delete();
    }));
    this.records = []; // Clear the records array after all deletions
  }
}


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
