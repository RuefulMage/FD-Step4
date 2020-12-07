import ModelEventName from '../Utils/ModelEventName';
import ViewEventName from '../Utils/ViewEventName';
declare class Publisher {
    private observersCallbacks;
    attach(callback: Function): void;
    detach(callback: Function): void;
    notify(eventType: ModelEventName | ViewEventName, data: any): void;
    getObserversCallbacks(): Set<Function>;
}
export default Publisher;
