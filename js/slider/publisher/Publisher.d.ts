import { ModelEventName } from '../utils/types';
import { ViewEventName } from '../utils/types';
declare class Publisher {
    private observersCallbacks;
    attach(callback: Function): void;
    notify(eventType: ModelEventName | ViewEventName, data: any): void;
}
export default Publisher;
