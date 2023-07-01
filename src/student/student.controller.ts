import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './interfaces/student.Interface'
import { CreateStudentDto } from './dto/CreateStudent.dto'

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }


  @Get()
  async listAllStudents(): Promise<IStudent[]> {
    const objectReturn = await this.studentService.listAllStudents()
    return objectReturn
  }


  @Post()
  async createStudent(@Body() dataBody: CreateStudentDto): Promise<IStudent> {
    const objectReturn = await this.studentService.createStudent(dataBody)
    return objectReturn
  }


  @Get('/:id')
  async getStudentById(@Param('id') id: string): Promise<IStudent> {
    const objectReturn = await this.studentService.getStudentById(id)
    return objectReturn
  }

}