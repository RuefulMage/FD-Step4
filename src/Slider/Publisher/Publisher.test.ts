import Publisher from './Publisher';

describe('Publisher class', () => {
  let publisher: Publisher;

  beforeEach(() => {
    publisher = new Publisher();
  });

  describe('attach method', () => {
    test('Should add to observers list input function', () => {
      let callback = () => {alert('function')};
      publisher.attach(callback);

      expect(publisher.getObserversCallbacks()).toContain(callback);
    });
  });

  describe('getObserversCallbacks method', () => {
    test('Should return all observers functions', () => {
      let firstCallback = () => {alert('1')};
      let secondCallback = () => {alert('2')};
      let thirdCallback = () => {alert('3')};
      let fourthCallback = () => {alert('4')};

      publisher.attach(firstCallback);
      publisher.attach(secondCallback);
      publisher.attach(thirdCallback);
      publisher.attach(fourthCallback);
      let expectedResult = new Set([firstCallback, secondCallback, thirdCallback, fourthCallback]);

      expect(publisher.getObserversCallbacks()).toEqual(expectedResult);
    });
  });

  describe('detach method', () => {
    test('Should remove observerCallback from observerCallback list', () => {
      let callback = () => {alert('callback')};
      publisher.attach(callback);
      publisher.detach(callback);

      expect(publisher.getObserversCallbacks()).toEqual(new Set());
    });
  });

  describe('notify method', () => {
    test('Should call all observers methods', () => {
      let callback = jest.fn();
      publisher.attach(callback);
      publisher.notify('edge-value-change', {});

      expect(callback.mock.calls.length).toBe(1);
    });
  });

});