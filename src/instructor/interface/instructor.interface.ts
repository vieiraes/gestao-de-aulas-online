import { IAppointment } from "src/appointment/interface/appointment.interface"

export interface IInstructor{
    id?: string,
    name: string,
    email: string,
    createdAt?: Date,
    appointments?: IAppointment[] | any[],
    availableTimes?: any[]
}

