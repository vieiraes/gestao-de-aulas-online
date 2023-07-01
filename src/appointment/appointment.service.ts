import { PrismaService } from 'src/libs/database/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { IAppointment, IAppointmentStatusEnum } from './interface/appointment.interface'
import { CreateAppointmentDto } from './dto/CreateAppointment.dto';
import { IInstructor } from 'src/instructor/interface/instructor.interface';
import { IStudent } from 'src/student/interfaces/student.Interface';


@Injectable()
export class AppointmentService {
    constructor(private prismaService: PrismaService) { }

    async createAppointment(newAppointmentObj: CreateAppointmentDto): Promise<IAppointment> {
        try {
            //TODO: fazer validacoes
            const studentReturn: IStudent | null = await this.prismaService.student.findUnique({
                where: {
                    id: newAppointmentObj.studentId
                }
            })
            const instructorReturn: IInstructor | null = await this.prismaService.instructor.findUnique({
                where: {
                    id: newAppointmentObj.instructorId
                }
            })

            if (studentReturn && instructorReturn) {
                // verificar a retirada do ANY
                const appointmentCreated: IAppointment | any = await this.prismaService.appointment.create({
                    data: {
                        id: uuidv4(),
                        student: {
                            connect: {
                                id: studentReturn ? studentReturn.id as string | any : undefined
                            }
                        },
                        instructor: {
                            connect: {
                                id: instructorReturn ? instructorReturn.id as string | any : undefined
                            },
                        },
                        startTime: newAppointmentObj.startTime,
                        endTime: newAppointmentObj.endTime,
                        createdAt: new Date().toISOString(),
                        status: IAppointmentStatusEnum.PENDING
                    }
                })
                return appointmentCreated
            }
        } catch (error) {
            console.log(error);
            throw new HttpException('Erro ao criar appointment', HttpStatus.BAD_REQUEST);
        }
    }
}
