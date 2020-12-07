import Publisher from './Publisher';

describe('Publisher class', () => {
  let publisher: Publisher;

  beforeEach(() => {
    publisher = new Publisher();
  });

  describe('attach method', () => {
    test('Should add to observers list input function', () => {
      const callback = () => { };
      publisher.attach(callback);

      expect(publisher.getObserversCallbacks()).toContain(callback);
    });
  });

  describe('getObserversCallbacks method', () => {
    test('Should return all observers functions', () => {
      const firstCallback = () => { };
      const secondCallback = () => { };
      const thirdCallback = () => { };
      const fourthCallback = () => { };

      publisher.attach(firstCallback);
      publisher.attach(secondCallback);
      publisher.attach(thirdCallback);
      publisher.attach(fourthCallback);
      const expectedResult = new Set([
        firstCallback, secondCallback, thirdCallback, fourthCallback]);

      expect(publisher.getObserversCallbacks()).toEqual(expectedResult);
    });
  });

  describe('detach method', () => {
    test('Should remove observerCallback from observerCallback list', () => {
      const callback = () => { };
      publisher.attach(callback);
      publisher.detach(callback);

      expect(publisher.getObserversCallbacks()).toEqual(new Set());
    });
  });

  describe('notify method', () => {
    test('Should call all observers methods', () => {
      const callback = jest.fn();
      publisher.attach(callback);
      publisher.notify('edge-value-change', {});

      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
