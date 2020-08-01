import ViewComponent from './ViewComponent';
import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';

export default class Strip extends ViewComponent{


    constructor(parentNode: HTMLElement) {
        super(parentNode, CONSTANTS.stripClassName);
    }

}