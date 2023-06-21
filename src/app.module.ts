import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [StudentModule, AppointmentModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}