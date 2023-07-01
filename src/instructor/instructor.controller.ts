import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get()
    async listAllInstructors(): Promise<IInstructor[]> {
        const objectReturn = await this.instructorService.listAllInstructors()
        return objectReturn
    }


    @Get('/:id')
    async openInstructorById(@Param('id') id: string): Promise<IInstructor> {
        const objectReturn = await this.instructorService.openInstructorById(id)
        return objectReturn
    }
}

