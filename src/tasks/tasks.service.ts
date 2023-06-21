import { Injectable } from '@nestjs/common';
import { EnumTaskStatus, ITask } from './task.model';
import { v4 as uuid } from 'uuid'

@Injectable()
export class TasksService {
    private tasksArray: ITask[] = []

    getAllTasks(): ITask[] {
        return this.tasksArray
    }


    createTask(title: string, description: string): ITask {
        const newTask: ITask = {
            id: uuid(),
            title,
            description,
            status: EnumTaskStatus.OPEN
        }
        this.tasksArray.push(newTask)
        return newTask

    }

}
