import { ElementRef, OnInit, AfterContentInit, EventEmitter, QueryList, TemplateRef, OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FilterService, PrimeNGConfig } from 'primeng/api';
import { BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/api";
import * as i3 from "primeng/paginator";
import * as i4 from "primeng/icons/spinner";
import * as i5 from "primeng/icons/bars";
import * as i6 from "primeng/icons/thlarge";
export declare class DataView implements OnInit, AfterContentInit, OnDestroy, BlockableUI, OnChanges {
    el: ElementRef;
    cd: ChangeDetectorRef;
    filterService: FilterService;
    config: PrimeNGConfig;
    paginator: boolean;
    rows: number;
    totalRecords: number;
    pageLinks: number;
    rowsPerPageOptions: any[];
    paginatorPosition: string;
    alwaysShowPaginator: boolean;
    paginatorDropdownAppendTo: any;
    paginatorDropdownScrollHeight: string;
    currentPageReportTemplate: string;
    showCurrentPageReport: boolean;
    showJumpToPageDropdown: boolean;
    showFirstLastIcon: boolean;
    showPageLinks: boolean;
    lazy: boolean;
    emptyMessage: string;
    onLazyLoad: EventEmitter<any>;
    style: any;
    styleClass: string;
    gridStyleClass: string;
    trackBy: Function;
    filterBy: string;
    filterLocale: string;
    loading: boolean;
    loadingIcon: string;
    first: number;
    sortField: string;
    sortOrder: number;
    value: any[];
    onPage: EventEmitter<any>;
    onSort: EventEmitter<any>;
    onChangeLayout: EventEmitter<any>;
    header: any;
    footer: any;
    templates: QueryList<any>;
    _value: any[];
    listItemTemplate: TemplateRef<any>;
    gridItemTemplate: TemplateRef<any>;
    itemTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    emptyMessageTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    paginatorLeftTemplate: TemplateRef<any>;
    paginatorRightTemplate: TemplateRef<any>;
    paginatorDropdownItemTemplate: TemplateRef<any>;
    loadingIconTemplate: TemplateRef<any>;
    listIconTemplate: TemplateRef<any>;
    gridIconTemplate: TemplateRef<any>;
    filteredValue: any[];
    filterValue: string;
    initialized: boolean;
    _layout: string;
    translationSubscription: Subscription;
    get layout(): string;
    set layout(layout: string);
    constructor(el: ElementRef, cd: ChangeDetectorRef, filterService: FilterService, config: PrimeNGConfig);
    ngOnInit(): void;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    ngAfterContentInit(): void;
    updateItemTemplate(): void;
    changeLayout(layout: string): void;
    updateTotalRecords(): void;
    paginate(event: any): void;
    sort(): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    getBlockableElement(): HTMLElement;
    get emptyMessageLabel(): string;
    filter(filter: string, filterMatchMode?: string): void;
    hasFilter(): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataView, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataView, "p-dataView", never, { "paginator": "paginator"; "rows": "rows"; "totalRecords": "totalRecords"; "pageLinks": "pageLinks"; "rowsPerPageOptions": "rowsPerPageOptions"; "paginatorPosition": "paginatorPosition"; "alwaysShowPaginator": "alwaysShowPaginator"; "paginatorDropdownAppendTo": "paginatorDropdownAppendTo"; "paginatorDropdownScrollHeight": "paginatorDropdownScrollHeight"; "currentPageReportTemplate": "currentPageReportTemplate"; "showCurrentPageReport": "showCurrentPageReport"; "showJumpToPageDropdown": "showJumpToPageDropdown"; "showFirstLastIcon": "showFirstLastIcon"; "showPageLinks": "showPageLinks"; "lazy": "lazy"; "emptyMessage": "emptyMessage"; "style": "style"; "styleClass": "styleClass"; "gridStyleClass": "gridStyleClass"; "trackBy": "trackBy"; "filterBy": "filterBy"; "filterLocale": "filterLocale"; "loading": "loading"; "loadingIcon": "loadingIcon"; "first": "first"; "sortField": "sortField"; "sortOrder": "sortOrder"; "value": "value"; "layout": "layout"; }, { "onLazyLoad": "onLazyLoad"; "onPage": "onPage"; "onSort": "onSort"; "onChangeLayout": "onChangeLayout"; }, ["header", "footer", "templates"], ["p-header", "p-footer"], false, never>;
}
export declare class DataViewLayoutOptions {
    dv: DataView;
    style: any;
    styleClass: string;
    constructor(dv: DataView);
    changeLayout(event: Event, layout: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataViewLayoutOptions, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataViewLayoutOptions, "p-dataViewLayoutOptions", never, { "style": "style"; "styleClass": "styleClass"; }, {}, never, never, false, never>;
}
export declare class DataViewModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DataViewModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DataViewModule, [typeof DataView, typeof DataViewLayoutOptions], [typeof i1.CommonModule, typeof i2.SharedModule, typeof i3.PaginatorModule, typeof i4.SpinnerIcon, typeof i5.BarsIcon, typeof i6.ThLargeIcon], [typeof DataView, typeof i2.SharedModule, typeof DataViewLayoutOptions]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DataViewModule>;
}
