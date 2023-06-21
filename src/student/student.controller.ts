import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './student.dto';


@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }


  @Post()
  async createStudent(
    @Body() dataBody: { name: string, email: string }
  ): Promise<IStudent | any> {
    const objectReturn = await this.studentService.create(dataBody)
    return objectReturn
  }

}


