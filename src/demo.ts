import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';
import {BsAlert} from './alert/alert';
import {BsPagination} from './pagination/pagination';

@Component({
    selector: 'bs-demo-app'
})
@View({
    templateUrl: 'demo.html',
    directives: [formDirectives, BsAlert, BsPagination]
})
export class BsDemoApp {
    pagination = {
      page: 1,
      collection: 100,
      items: 10
    };


    alertClosed() {
        console.log('Alert closed');
    }

    pageChanged(newPage) {
        this.pagination.page = newPage;
        console.log('New page:', this.pagination.page);
    }
}

bootstrap(BsDemoApp);