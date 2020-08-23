import OrientationBehaviorBuilder from './OrientationBehaviorBuilder';
import HorizontalOrientationBehavior from './HorizontalOrientationBehavior';
import VerticalOrientationBehavior from './VerticalOrientationBehavior';
import Orientation from '../../Utils/Orientation';

describe('Orientaition Behavior Builder object', function(){
    describe('Get correct behavior from input orientation', function(){
        test('Should get horizontal orientation behavior, when input orientation is horizontal', function(){
            let output = OrientationBehaviorBuilder.getOrientationBehaviorByOrientation(Orientation.HORIZONTAL);
            expect(output).toBeInstanceOf(HorizontalOrientationBehavior);
        });
        test('Should get vertical orientation behavior, when input orientation is vertical', function(){
            let output = OrientationBehaviorBuilder.getOrientationBehaviorByOrientation(Orientation.VERTICAL);
            expect(output).toBeInstanceOf(VerticalOrientationBehavior);
        });

        test('Should throw error, when needed orientation behavior does not exists', function(){
            expect(() => {OrientationBehaviorBuilder.getOrientationBehaviorByOrientation('round' as Orientation)})
                .toThrowError();
        });
    });
});