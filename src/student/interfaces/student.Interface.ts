import { IAppointment } from "src/appointment/interface/appointment.interface"

export interface IStudent {
    id?: string,
    name: string,
    email: string,
    createdAt?: Date,
    appointments?: IAppointment[] 
}