import { ModelEventName } from '../model/types';
import { ViewEventName } from '../view/types';
declare class Publisher {
    private observersCallbacks;
    attach(callback: Function): void;
    notify(eventType: ModelEventName | ViewEventName, data: any): void;
}
export default Publisher;
