import { Body, Controller, Post } from '@nestjs/common';
import { InstructorService } from './instructor.service'
import { CreateInstructorDto } from './dto/CreateInstructor.dto'
import { IInstructor } from './interface/instructor.interface';

@Controller('instructor')
export class InstructorController {
    constructor(private readonly instructorService: InstructorService) { }

    @Post()
    async createInstructor(@Body() dataBody: CreateInstructorDto): Promise<IInstructor> {
        const objectReturn = await this.instructorService.createInstructor(dataBody)
        return objectReturn
    }

}
