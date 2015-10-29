import {Component, Input} from 'angular2/angular2';

@Component({
    selector: 'ngb-progress',
    template: `
    <div class="progress">
        <div role="progressbar" class="progress-bar {{type ? 'progress-bar-' + type : ''}}"
             [attr.aria-valuenow]="value" [attr.aria-valuemin]="minValue" [attr.aria-valuemax]="maxValue"
             [style.width.%]="percentValue">
            {{percentValue}}%
        </div>
    </div>
    `
})
export class NgbProgress {
    @Input() minValue = 0;
    @Input() maxValue = 100;
    @Input() value: number;
    @Input() type: string;

    get percentValue() {
        //TODO: rounding and boundary checks
        return 100 * this.value / (this.maxValue - this.minValue);
    }
}