class Publisher {
  observersCallbacks: Set<Function> = new Set<Function>();

  attach(callback: Function): void {
    this.observersCallbacks.add(callback);
  };

  detach(callback: Function): void {
    this.observersCallbacks.delete(callback);
  };

  notify(eventType: string, data: any): void {
    this.observersCallbacks.forEach(callback => callback(eventType, data));
  };
}


export default Publisher;
