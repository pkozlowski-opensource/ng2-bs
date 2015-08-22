import {Component, View, NgIf, EventEmitter} from 'angular2/angular2';

@Component({
    selector: 'bs-alert',
    properties: ['type', 'dismissible'],
    events: ['dismiss']
})
@View({
    templateUrl: 'alert/alert.html',
    directives: [NgIf]
})
export class BsAlert {
    static alertTypes = ['success', 'info', 'warning', 'danger'];
    _dismissible: boolean = false;
    _type: string = BsAlert.alertTypes[2];
    dismiss: EventEmitter = new EventEmitter();

    set type(val: string) {
        this._type = BsAlert.alertTypes.indexOf(val) !== -1 ? val : BsAlert.alertTypes[2];
    }

    set dismissible(val: string | boolean) {
        this._dismissible = String(val) == "true";
    }

    close(): void {
        this.dismiss.next(null);
    }
}

//TODO: self-closing as a default handler?