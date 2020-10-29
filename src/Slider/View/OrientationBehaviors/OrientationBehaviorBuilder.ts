import Orientation from '../../Utils/Orientation';
import IOrientationBehavior from './IOrientationBehavior';
import HorizontalOrientationBehavior from './HorizontalOrientationBehavior';
import VerticalOrientationBehavior from './VerticalOrientationBehavior';

const OrientationBehaviorBuilder = {
  getOrientationBehaviorByOrientation(orientation: Orientation): IOrientationBehavior {
    if (orientation === Orientation.HORIZONTAL) {
      return new HorizontalOrientationBehavior();
    } if (orientation === Orientation.VERTICAL) {
      return new VerticalOrientationBehavior();
    }
    throw new Error(' this orientation behavior does not exist');
  },
};

export default OrientationBehaviorBuilder;
