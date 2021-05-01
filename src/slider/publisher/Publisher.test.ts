import Publisher from './Publisher';

describe('publisher class', () => {
  let publisher: Publisher;

  beforeEach(() => {
    publisher = new Publisher();
  });

  describe('attach method', () => {
    test('Should add to observers list input function', () => {
      const callback = jest.fn();
      publisher.attach(callback);

      publisher.notify('edge-value-change', {});
      expect(callback.mock.calls.length).toBe(1);
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
