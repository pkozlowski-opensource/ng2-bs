import {Component, EventEmitter, Input, Output, NgFor} from 'angular2/angular2';

@Component({
  selector: 'ngb-pagination',
  directives: [NgFor],
  template: `
    <nav>
      <ul class="pagination">
        <li [class.disabled]="!hasPrevious()">
            <a aria-hidden="true" (click)="selectPage(_page-1)">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
        </li>

        <li *ng-for="#pageNumber of _pages" [class.active]="pageNumber === _page">
          <a (click)="selectPage(pageNumber)">{{pageNumber}}</a>
        </li>

        <li [class.disabled]="!hasNext()">
          <a aria-label="Next" (click)="selectPage(_page+1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  `
})
export class NgbPagination {
  _collectionSize= 0;
  _page = 0;
  _pageSize = 10;
  _pages: number[] = [];

  @Input() set page(newPage: number | string) {
    this.selectPage(parseInt(`${newPage}`, 10));
  }

  @Input() set collectionSize(newSize: number | string) {
    this._collectionSize = parseInt(`${newSize}`, 10);
    this._updatePages();
  }

  @Input() set pageSize(newSize: number | string) {
    this._pageSize = parseInt(`${newSize}`, 10);
    this._updatePages();
  }

  @Output() pageChange = new EventEmitter();

  hasPrevious(): boolean {
    return this._page > 1;
  }

  hasNext(): boolean {
    return this._page < this._pages.length;
  }

  selectPage(pageNumber: number): void {
    var prevPageNo = this._page;
    this._page = Math.max(Math.min(pageNumber, this._pages.length), 1);

    if (this._page != prevPageNo) {
      this.pageChange.next(this._page);
    }
  }

  //TODO: is lazy-re-calculating the best option here? Would immutable data structures help?
  private _updatePages(): void {
    //re-calculate new length of pages
    var pageCount = Math.ceil(this._collectionSize / this._pageSize);

    //fill-in model needed to render pages
    this._pages.length = 0;
    for (var i = 1; i <= pageCount; i++) {
      this._pages.push(i);
    }

    //make sure that the selected page is within available pages range
    this.selectPage(this._page);
  }
}