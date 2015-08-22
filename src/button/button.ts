import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'bs-button',
    properties: ['type']
})
@View({
    templateUrl: 'button/button.html'
})
export class BsButton {
    static buttonTypes = ['primary', 'success', 'info', 'warning', 'danger', 'link'];
    _type: string = BsButton.buttonTypes[2];

    set type(val) {
        this._type = BsButton.buttonTypes.indexOf(val) !== -1 ? val : BsButton.buttonTypes[2];
    }
}

//TODO: self-closing as a default handler?
