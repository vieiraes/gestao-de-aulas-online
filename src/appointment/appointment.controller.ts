import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/CreateAppointment.dto';
import { IAppointment } from './interface/appointment.interface';


@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  async createAppointment(@Body() dataBody: CreateAppointmentDto): Promise<IAppointment> {
    const objectReturn = await this.appointmentService.createAppointment(dataBody)
    return objectReturn
  }
}