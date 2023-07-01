export class CreateAppointmentDto {
    studentId: string;
    instructorId: string;
    status?: string;
    startTime: string;
    endTime: string
}