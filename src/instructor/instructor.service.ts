import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/database/prisma.service';
import { CreateInstructorDto } from './dto/CreateInstructor.dto'
import { v4 as uuidv4 } from 'uuid'
import { IInstructor } from './interface/instructor.interface'



@Injectable()
export class InstructorService {
    constructor(private prismaService: PrismaService) { }

    async createInstructor(newInstructorObj: CreateInstructorDto): Promise<IInstructor> {
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

    async listAllInstructors(): Promise<IInstructor[]> {
        try {
            const returnObject = await this.prismaService.instructor.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    appointments: true,
                    availableTimes: true

                }
            })
            return returnObject
        } catch (error) {
            console.log(error);
            throw new HttpException('Error ao consultar Instructor', HttpStatus.BAD_REQUEST);
        }
    }

    async openInstructorById(instructorId: string): Promise<IInstructor> {
        try {
            const objectReturn = await this.prismaService.instructor.findUnique({
                where: {
                    id: instructorId
                },
                include:{
                    appointments: true,
                    availableTimes: true
                }

            })
            return objectReturn
        } catch (error) {
            console.log(error);
            throw new HttpException('Error to open instructor', HttpStatus.BAD_REQUEST);
        }
    }
}
