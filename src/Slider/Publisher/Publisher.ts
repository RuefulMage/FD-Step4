import ModelEventName from '../Utils/ModelEventName';
import ViewEventName from '../Utils/ViewEventName';

class Publisher {
  private observersCallbacks: Set<Function> = new Set<Function>();

  public attach(callback: Function): void {
    this.observersCallbacks.add(callback);
  }

  public detach(callback: Function): void {
    this.observersCallbacks.delete(callback);
  }

  public notify(eventType: ModelEventName | ViewEventName, data: any): void {
    this.observersCallbacks.forEach((callback) => callback(eventType, data));
  }

  public getObserversCallbacks(): Set<Function> {
    return this.observersCallbacks;
  }
}

export default Publisher;
