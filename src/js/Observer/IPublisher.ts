import IObserver from './IObserver';

export default interface IPublisher {
    attach(observer: IObserver): void;

    detach(observer: IObserver): void;

    notify(data: {}): void;
}
