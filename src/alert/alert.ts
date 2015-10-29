import {Component, EventEmitter, Input, Output, NgIf} from 'angular2/angular2';

@Component({
    selector: 'bs-alert',
    directives: [NgIf],
    template: `
        <div class="alert alert-{{type || 'warning'}}" [class.alert-dismissible]="_dismissible" role="alert">
            <button *ng-if="_dismissible" type="button" class="close" aria-label="Close" (click)="close()">
                <span aria-hidden="true">&times;</span>
            </button>
            <ng-content></ng-content>
        </div>
    `
})
export class BsAlert {
    _dismissible = false;
    @Input() type: string;
    @Output() dismiss: EventEmitter = new EventEmitter();

    @Input() set dismissible(val: string | boolean) {
        this._dismissible = String(val) == "true";
    }

    close(): void {
        this.dismiss.next(null);
    }
}

//TODO: self-closing as a default handler?
//TODO: closing on timeout as an extension?