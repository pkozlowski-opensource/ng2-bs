import {Component, Directive, Query, QueryList, View, NgIf} from 'angular2/angular2';

//TODO: why can't I query for regular elements?
@Directive({selector: 'bs-panel-heading'})
export class BsPanelHeading {}

@Directive({selector: 'bs-panel-footer'})
export class BsPanelFooter {}

@Component({
    selector: 'bs-panel',
    properties: ['panelTitle', 'type']
})
@View({
    templateUrl: 'panel/panel.html',
    directives: [NgIf]
})
export class BsPanel {
    panelTitle: string;
    type: string;
    collapsed: boolean = false;
    //TODO: why @Query isn't enough and I have to use type annotation as well?
    constructor(@Query(BsPanelHeading) private _headings: QueryList<BsPanelHeading>,
                @Query(BsPanelFooter) private _footers: QueryList<BsPanelFooter>) {
    }


    //TODO: add a `isEmpty()` helper method?
    hasHeadings(): boolean {
        return this._headings.length > 0;
    }

    hasFooters(): boolean {
        return this._footers.length > 0;
    }
}
