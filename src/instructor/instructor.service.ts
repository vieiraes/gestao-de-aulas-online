import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/database/prisma.service';
import { CreateInstructorDto } from './dto/CreateInstructor.dto'
import { v4 as uuidv4 } from 'uuid'
import { IInstructor } from './interface/instructor.interface'


@Injectable()
export class InstructorService {
    constructor(private prismaService: PrismaService) { }

    async createInstructor(newInstructorObj: CreateInstructorDto){
        try {
            const returnObject = await this.prismaService.instructor.create({
                data: {
                    id: uuidv4(),
                    name: newInstructorObj.name,
                    email: newInstructorObj.email,
                    createdAt: new Date().toISOString(),
                    appointments: {
                        create: []
                    },
                    availableTimes: {
                        create: []
                    }
                }
            })
            return returnObject
        } catch (error) {
            console.log(error);
            throw new HttpException('Erro ao criar instructor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // listAllInstructors() { }

    // OpenInstructorById() { }
}
