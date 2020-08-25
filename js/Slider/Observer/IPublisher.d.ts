import IObserver from './IObserver';
interface IPublisher {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(data: {}): void;
}
export default IPublisher;
