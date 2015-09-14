import {Component, View, bootstrap, bind, FORM_DIRECTIVES} from 'angular2/angular2';
import {BsAlert} from './alert/alert';
import {BsPagination, PaginationSettings} from './pagination/pagination';
import {BsPanel, BsPanelHeading, BsPanelFooter} from './panel/panel';
import {BsProgress} from './progress/progress';

@Component({
    selector: 'bs-demo-app'
})
@View({
    templateUrl: 'demo.html',
    directives: [FORM_DIRECTIVES, BsAlert, BsPagination, BsPanel, BsPanelHeading, BsPanelFooter, BsProgress]
})
export class BsDemoApp {
    pagination = {
      page: 1,
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
        this.pagination.page = newPage;
        console.log('New page:', this.pagination.page);
    }
}

bootstrap(BsDemoApp, [bind(PaginationSettings).toValue(new PaginationSettings(20))]);