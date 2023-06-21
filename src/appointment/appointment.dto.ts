export interface IAppointment {
    id?: string,
    studentId: string,
    teacherId: string,
    dateTime: Date,
    status: string,
    createdAt?: Date,
}