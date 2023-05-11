import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI, Header } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/icons/chevronright";
import * as i3 from "primeng/icons/chevrondown";
import * as i4 from "primeng/api";
export declare class AccordionTab implements AfterContentInit, OnDestroy {
    changeDetector: ChangeDetectorRef;
    header: string;
    headerStyle: any;
    tabStyle: any;
    contentStyle: any;
    tabStyleClass: string;
    headerStyleClass: string;
    contentStyleClass: string;
    disabled: boolean;
    cache: boolean;
    selectedChange: EventEmitter<any>;
    transitionOptions: string;
    iconPos: string;
    headerFacet: QueryList<Header>;
    templates: QueryList<any>;
    private _selected;
    get selected(): any;
    set selected(val: any);
    get iconClass(): "p-accordion-toggle-icon-end" | "p-accordion-toggle-icon";
    contentTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    id: string;
    loaded: boolean;
    iconTemplate: TemplateRef<any>;
    accordion: Accordion;
    constructor(accordion: any, changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    toggle(event: any): boolean;
    findTabIndex(): number;
    get hasHeaderFacet(): boolean;
    onKeydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionTab, "p-accordionTab", never, { "header": "header"; "headerStyle": "headerStyle"; "tabStyle": "tabStyle"; "contentStyle": "contentStyle"; "tabStyleClass": "tabStyleClass"; "headerStyleClass": "headerStyleClass"; "contentStyleClass": "contentStyleClass"; "disabled": "disabled"; "cache": "cache"; "transitionOptions": "transitionOptions"; "iconPos": "iconPos"; "selected": "selected"; }, { "selectedChange": "selectedChange"; }, ["headerFacet", "templates"], ["p-header", "*"], false, never>;
}
export declare class Accordion implements BlockableUI, AfterContentInit, OnDestroy {
    el: ElementRef;
    changeDetector: ChangeDetectorRef;
    multiple: boolean;
    onClose: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    style: any;
    styleClass: string;
    expandIcon: string;
    collapseIcon: string;
    activeIndexChange: EventEmitter<any>;
    tabList: QueryList<AccordionTab>;
    tabListSubscription: Subscription;
    private _activeIndex;
    preventActiveIndexPropagation: boolean;
    tabs: AccordionTab[];
    constructor(el: ElementRef, changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    initTabs(): any;
    getBlockableElement(): HTMLElement;
    get activeIndex(): any;
    set activeIndex(val: any);
    updateSelectionState(): void;
    updateActiveIndex(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Accordion, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Accordion, "p-accordion", never, { "multiple": "multiple"; "style": "style"; "styleClass": "styleClass"; "expandIcon": "expandIcon"; "collapseIcon": "collapseIcon"; "activeIndex": "activeIndex"; }, { "onClose": "onClose"; "onOpen": "onOpen"; "activeIndexChange": "activeIndexChange"; }, ["tabList"], ["*"], false, never>;
}
export declare class AccordionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AccordionModule, [typeof Accordion, typeof AccordionTab], [typeof i1.CommonModule, typeof i2.ChevronRightIcon, typeof i3.ChevronDownIcon], [typeof Accordion, typeof AccordionTab, typeof i4.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AccordionModule>;
}
