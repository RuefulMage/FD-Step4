import { ModelEventName } from '../utils/types';
import { ViewEventName } from '../utils/types';

class Publisher {
  private observersCallbacks: Set<Function> = new Set<Function>();

  public attach(callback: Function): void {
    this.observersCallbacks.add(callback);
  }

  public notify(eventType: ModelEventName | ViewEventName, data: any): void {
    this.observersCallbacks.forEach((callback) => callback(eventType, data));
  }
}

export default Publisher;
