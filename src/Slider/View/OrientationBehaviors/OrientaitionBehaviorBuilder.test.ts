import Orientation from '../../Utils/Orientation';
import OrientationBehaviorBuilder from './OrientationBehaviorBuilder';
import HorizontalOrientationBehavior from './HorizontalOrientationBehavior';
import VerticalOrientationBehavior from './VerticalOrientationBehavior';

describe('Orientaition Behavior Builder object', () => {
  describe('Get correct behavior from input orientation', () => {
    test('Should get horizontal orientation behavior, when input orientation is horizontal', () => {
      const output = OrientationBehaviorBuilder
        .getOrientationBehaviorByOrientation(Orientation.HORIZONTAL);
      expect(output).toBeInstanceOf(HorizontalOrientationBehavior);
    });
    test('Should get vertical orientation behavior, '
      + 'when input orientation is vertical', () => {
      const output = OrientationBehaviorBuilder
        .getOrientationBehaviorByOrientation(Orientation.VERTICAL);
      expect(output).toBeInstanceOf(VerticalOrientationBehavior);
    });

    test('Should throw error, when needed orientation behavior does not exists', () => {
      expect(() => {
        OrientationBehaviorBuilder.getOrientationBehaviorByOrientation('round' as Orientation);
      })
        .toThrowError();
    });
  });
});
