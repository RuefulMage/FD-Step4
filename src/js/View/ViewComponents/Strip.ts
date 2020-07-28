import { ViewComponent } from './ViewComponent';
import { constants } from '../../Utils/Constants';

export class Strip extends ViewComponent{

    constructor(parentNode: HTMLElement) {
        super(parentNode, constants.stripClassName);
    }

    protected addHadler(): void {
        throw new Error('not implemented');
    }
}