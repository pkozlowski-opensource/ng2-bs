import {Component, View, Optional, NgFor, EventEmitter} from 'angular2/angular2';

export class PaginationSettings {
  constructor(public defaultPageSize: number = 10) {}
}

@Component({
  selector: 'bs-pagination',
  properties: ['pageNo', 'collectionSize', 'pageSize'],
  events: ['pageChange']
})
@View({
  templateUrl: 'pagination/pagination.html',
  directives: [NgFor]
})
export class BsPagination {
  pageChange = new EventEmitter();
  _settings: PaginationSettings;
  _collectionSize: number = 0;
  _pageNo: number = 0;
  _pageSize: number;
  _pages = [];

  constructor(@Optional() _settings: PaginationSettings) {
    this._settings = _settings ? _settings : new PaginationSettings();
    this._pageSize = this._settings.defaultPageSize;
  }

  set pageNo(newPageNo) {
    this.selectPage(parseInt(newPageNo, 10));
  }

  set collectionSize(newSize) {
    this._collectionSize = parseInt(newSize, 10);
    this._updatePages();
  }

  set pageSize(newSize) {
    newSize = parseInt(newSize, 10);
    this._pageSize = newSize > 0 ? newSize : this._settings.defaultPageSize;
    this._updatePages();
  }

  hasPrevious() {
    return this._pageNo > 1;
  }

  hasNext() {
    return this._pageNo < this._pages.length;
  }

  selectPage(pageNumber) {
    var prevPageNo = this._pageNo;
    this._pageNo = Math.max(Math.min(pageNumber, this._pages.length), 1);

    if (this._pageNo != prevPageNo) {
      this.pageChange.next(this._pageNo);
    }
  }

  //TODO: is lazy-re-calculating the best option here? Would immutable data structures help?
  _updatePages() {
    //re-calculate new length of pages
    var pageCount = Math.ceil(this._collectionSize / this._pageSize);

    //fill-in model needed to render pages
    this._pages.length = 0;
    for (var i = 1; i <= pageCount; i++) {
      this._pages.push(i);
    }

    //make sure that the selected page is within available pages range
    this.selectPage(this._pageNo);
  }
}