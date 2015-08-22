import {Component, View, bootstrap, bind, formDirectives} from 'angular2/angular2';
import {BsAlert} from './alert/alert';
import {BsPagination, PaginationSettings} from './pagination/pagination';
import {BsButton} from './button/button';

@Component({
    selector: 'bs-demo-app'
})
@View({
    templateUrl: 'demo.html',
    directives: [formDirectives, BsAlert, BsPagination, BsButton]
})
export class BsDemoApp {
    pagination = {
      page: 1,
      collection: 100,
      items: 20
    };


    alertClosed() {
        console.log('Alert closed');
    }

    pageChanged(newPage) {
        this.pagination.page = newPage;
        console.log('New page:', this.pagination.page);
    }
}

bootstrap(BsDemoApp, [bind(PaginationSettings).toValue(new PaginationSettings(20))]);
