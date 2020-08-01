import IOrientationBehavior from './IOrientationBehavior';
import Orientation from '../../Utils/Orientation';
declare let OrientaitionBehaviorBuilder: {
    getOrientationBehaviorByOrientation(orientation: Orientation): IOrientationBehavior;
};
export default OrientaitionBehaviorBuilder;
