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
    _dismissible: boolean = false;
    type: string;
    dismiss: EventEmitter = new EventEmitter();

    set dismissible(val: string | boolean) {
        this._dismissible = String(val) == "true";
    }

    close(): void {
        this.dismiss.next(null);
    }
}

//TODO: self-closing as a default handler?
//TODO: closing on timeout as an extension?