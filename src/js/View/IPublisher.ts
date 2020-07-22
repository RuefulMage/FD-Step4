import { IObserver } from './IObserver';

export interface IPublisher {
    attach(observer: IObserver ): void;

    detach(observer: IObserver ): void;

    notify( data: {} ): void;
}