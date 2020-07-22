import { ViewComponent } from './ViewComponent';
import { constants } from '../Utils/Constants';

export class Strip extends ViewComponent{

    constructor(parentNode: JQuery<HTMLElement>) {
        super(parentNode, constants.stripClassName);
    }

    protected addHadler(): void {
        throw new Error('not implemented');
    }
}