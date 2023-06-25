import { PrismaService } from 'src/libs/database/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { IAppointmentStatusEnum } from './interface/appointment.interface'
import { CreateAppointmentDto } from './dto/CreateAppointment.dto';


@Injectable()
export class AppointmentService {
    constructor(private prismaService: PrismaService) { }

    async createAppointment(newAppointment: CreateAppointmentDto) {
        try {
            const appointmentReturn = await this.prismaService.appointment.create({
                data: {
                    id: uuidv4(),
                    student: {
                        connect: {
                            id: newAppointment.studentId
                        }
                    },
                    instructor: {
                        connect: {
                            id: newAppointment.instructorId
                        },
                    },
                    startTime: newAppointment.startTime,
                    endTime: newAppointment.endTime,
                    status: IAppointmentStatusEnum.PENDING,
                }
            })
            return appointmentReturn
        } catch (error) {
            console.log(error);
            throw new HttpException('Erro ao criar appointment', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // async listAppointmentsByStudentId() { }
}
