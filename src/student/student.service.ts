import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/CreateStudent.dto';
import { PrismaService } from 'src/libs/database/prisma.service';
import { v4 as uuidv4 } from 'uuid'
import { IStudent } from './interfaces/student.Interface';

@Injectable()
export class StudentService {
    constructor(private prismaService: PrismaService) { }

    async createStudent(newUserObj: CreateStudentDto):Promise<IStudent> {
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
            })
            return studentReturn;
        } catch (error) {
            console.log(error);
            throw new HttpException('Erro ao criar o estudante', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getStudentById(studentId: string): Promise<IStudent> {
        try {
            const returnObject = await this.prismaService.student.findUnique({
                where: {
                    id: studentId
                },
                include:{
                    appointments:true
                }
            })
            return returnObject

        } catch (error) {
            console.log(error);
            throw new HttpException('Error to get Student', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async listAllStudents():Promise<IStudent[]> {
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