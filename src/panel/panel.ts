import {Component, View, NgIf} from 'angular2/angular2';

@Component({
    selector: 'bs-panel',
    properties: ['title', 'type']
})
@View({
    templateUrl: 'panel/panel.html',
    directives: [NgIf]
})
export class BsPanel {
    title: string;
    type: string;
}

//TODO: how do I know if there is some content to re-project under a given selector?
//TODO: make it collapsible
//TODO: (conditional) footer