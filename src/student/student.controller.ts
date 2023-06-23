import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './student.dto';


@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }


  @Get()
  async listAllStudents(): Promise<IStudent[]> {
    const objectReturn = await this.studentService.listAllStudents()
    return objectReturn
  }


  @Post()
  async createStudent(
    @Body() dataBody: { name: string, email: string }
  ): Promise<IStudent> {
    const objectReturn = await this.studentService.create(dataBody)
    return objectReturn
  }


  @Get('/:id')
  async getStudentById(
    @Param('id') id: string): Promise<IStudent> { 
    const objectReturn = await this.studentService.getStudentById(id)
    return objectReturn
  }

}


