import { IAppointment } from "src/appointment/appointment.dto"

export interface IStudent {
    id?: string,
    name: string,
    email: string,
    createdAt?: Date,
    appointments?: IAppointment[] | string[]

}