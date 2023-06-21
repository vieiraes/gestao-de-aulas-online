import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IStudent } from './student.dto';
import { PrismaService } from 'src/libs/database/prisma.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService) { }

    async create(newUserObj: IStudent) {
        try {
            const studentReturn = await this.prisma.student.create({
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
}