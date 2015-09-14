import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'bs-progress',
    properties: ['minValue', 'maxValue', 'value', 'type']
})
@View({
    templateUrl: 'progress/progress.html'
})
export class BsProgress {
    minValue: number = 0;
    maxValue: number = 100;
    value: number;
    type: string;
    //TODO: stripped

    getPercentValue() {
        //TODO: rounding and boundary checks
        return 100 * this.value / (this.maxValue - this.minValue);
    }
}