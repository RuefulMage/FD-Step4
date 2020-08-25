import Orientation from '../../Utils/Orientation';
import IOrientationBehavior from './IOrientationBehavior';
declare let OrientationBehaviorBuilder: {
    getOrientationBehaviorByOrientation(orientation: Orientation): IOrientationBehavior;
};
export default OrientationBehaviorBuilder;
