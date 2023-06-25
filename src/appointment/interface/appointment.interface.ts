export interface IAppointment {
    id?: string,
    student: string,
    instructor: string,
    startTime: Date,
    endTime: Date,
    status?: IAppointmentStatusEnum,
    createdAt?: Date,
}

export enum IAppointmentStatusEnum {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELED = 'CANCELED',
    REJECTED = 'REJECTED'
}