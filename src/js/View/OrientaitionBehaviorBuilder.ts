import { Orientation } from './Orientation';
import { IOrientationBehavior } from './IOrientationBehavior';
import { HorizontalOrientationBehavior } from './HorizontalOrientationBehavior';
import { VerticalOrientationBehavior } from './VerticalOrientationBehavior';

export let OrientaitionBehaviorBuilder = {
    getOrientationBehaviorByOrientation(orientation: Orientation): IOrientationBehavior{
        if( orientation === Orientation.HORIZONTAL ){
            return new HorizontalOrientationBehavior();
        } else if( orientation === Orientation.VERTICAL ){
            return new VerticalOrientationBehavior()
        } else {
            throw new Error(' this orientation does not exist');
        }
    }
}