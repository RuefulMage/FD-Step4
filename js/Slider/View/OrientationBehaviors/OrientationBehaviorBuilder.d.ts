import Orientation from '../../Utils/Orientation';
import IOrientationBehavior from './IOrientationBehavior';
declare const OrientationBehaviorBuilder: {
    getOrientationBehaviorByOrientation(orientation: Orientation): IOrientationBehavior;
};
export default OrientationBehaviorBuilder;
