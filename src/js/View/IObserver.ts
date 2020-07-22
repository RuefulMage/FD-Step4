export interface IObserver {
    update(eventName: string, data?: any): void;
}