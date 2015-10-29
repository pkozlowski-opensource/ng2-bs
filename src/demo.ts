import {Component, View, bootstrap, bind, FORM_DIRECTIVES} from 'angular2/angular2';
import {NgbAlert} from './alert/alert';
import {NgbPagination} from './pagination/pagination';
import {BsPanel, BsPanelHeading, BsPanelFooter} from './panel/panel';
import {BsProgress} from './progress/progress';

@Component({
    selector: 'bs-demo-app'
})
@View({
    templateUrl: 'demo.html',
    directives: [FORM_DIRECTIVES, NgbAlert, NgbPagination, BsPanel, BsPanelHeading, BsPanelFooter, BsProgress]
})
export class BsDemoApp {
    pagination = {
      pageNo: 1,
      collection: 100,
      items: 20
    };

    progress = {
        value: 60
    };

    alertClosed() {
        console.log('Alert closed');
    }

    pageChanged(newPage: number) {
        console.log('New page:', newPage);
    }
}

bootstrap(BsDemoApp);