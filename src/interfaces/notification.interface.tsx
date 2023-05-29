export interface INotification {
    id: string,
    content: string,
    type: number
}

export type IRemoveNotification = ((id: string) => void) | any;
export type IPushNotification = ((type: number, content: string) => void) | any;