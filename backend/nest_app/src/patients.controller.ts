import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { DidDhtMethod } from '@web5/dids';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient record' })
  @ApiBody({ description: 'Patient Data', type: Object })
  async create(@Body() patientData: any) {
    const patientDid = await DidDhtMethod.create();
    return this.patientsService.createPatientRecord(patientDid.did, patientData);
  }

  @Get(':index')
  @ApiOperation({ summary: 'Read a patient record' })
  @ApiParam({ name: 'index', type: Number })
  async read(@Param('index') index: number) {
    return this.patientsService.readPatientRecord(index);
  }

  @Put(':index')
  @ApiOperation({ summary: 'Update a patient record' })
  @ApiParam({ name: 'index', type: Number })
  @ApiBody({ description: 'Updated Data', type: Object })
  async update(@Param('index') index: number, @Body() updatedData: any) {
    return this.patientsService.updatePatientRecord(index, updatedData);
  }

  @Delete(':index')
  @ApiOperation({ summary: 'Delete a patient record' })
  @ApiParam({ name: 'index', type: Number })
  async delete(@Param('index') index: number) {
    return this.patientsService.deletePatientRecord(index);
  }

  @Get()
  @ApiOperation({ summary: 'Read all patient records' })
  async readAll() {
    return this.patientsService.readAllPatientRecords();
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all patient records' })
  async deleteAll() {
    return this.patientsService.deleteAllPatientRecords();
  }
}
