import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/student.dto';
import { PrismaService } from 'src/libs/database/prisma.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class StudentService {
    constructor(private prismaService: PrismaService) { }

    async createStudent(newUserObj: CreateStudentDto) {
        try {
            const studentReturn = await this.prismaService.student.create({
                data: {
                    id: uuidv4(),
                    name: newUserObj.name,
                    email: newUserObj.email,
                    createdAt: new Date().toISOString(),
                    appointments: {
                        create: []
                    }
                }
            });
            return studentReturn;
        } catch (error) {
            console.log(error);
            throw new HttpException('Erro ao criar o estudante', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getStudentById(studentId: string): Promise<CreateStudentDto> {
        try {
            const returnObject = await this.prismaService.student.findUnique({
                where: {
                    id: studentId
                }
            })
            return returnObject

        } catch (error) {
            console.log(error);
            throw new HttpException('Error to get Student', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async listAllStudents() {
        try {
            const allStudents: CreateStudentDto[] = await this.prismaService.student.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    appointments: true
                }
            }
            )
            return allStudents
        } catch (error) {
            console.log(error);
            throw new HttpException('Error to list students', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}