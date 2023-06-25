import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { AppointmentModule } from './appointment/appointment.module';
import { InstructorModule } from './instructor/instructor.module';


@Module({
  imports: [StudentModule, AppointmentModule, InstructorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}