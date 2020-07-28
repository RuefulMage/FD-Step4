import { OrientaitionBehaviorBuilder } from './OrientaitionBehaviorBuilder';
import { Orientation } from '../../Utils/types';
import { HorizontalOrientationBehavior } from './HorizontalOrientationBehavior';
import { VerticalOrientationBehavior } from './VerticalOrientationBehavior';

describe('Orientaition Behavior Builder object', function(){
    describe('Get correct behavior from input orientation', function(){
        test('Should get horizontal orientation behavior, when input orientation is horizontal', function(){
            let output = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(Orientation.HORIZONTAL);
            expect(output).toBeInstanceOf(HorizontalOrientationBehavior);
        });
        test('Should get vertical orientation behavior, when input orientation is vertical', function(){
            let output = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(Orientation.VERTICAL);
            expect(output).toBeInstanceOf(VerticalOrientationBehavior);
        });

        test('Should throw error, when needed orientation behavior does not exists', function(){
            expect(() => {OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation('round' as Orientation)})
                .toThrowError();
        });
    });
});