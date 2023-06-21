export interface ITask {
    id: string;
    title: string;
    description: string;
    status: EnumTaskStatus;
}

export enum EnumTaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}