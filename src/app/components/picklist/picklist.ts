import {
    NgModule,
    Component,
    ElementRef,
    AfterContentInit,
    AfterViewChecked,
    Input,
    Output,
    ContentChildren,
    QueryList,
    TemplateRef,
    EventEmitter,
    ViewChild,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ChangeDetectorRef,
    Renderer2,
    Inject,
    PLATFORM_ID
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule, PrimeTemplate, FilterService } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { AngleDoubleDownIcon } from 'primeng/icons/angledoubledown';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleDoubleUpIcon } from 'primeng/icons/angledoubleup';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { SearchIcon } from 'primeng/icons/search';
import { HomeIcon } from 'primeng/icons/home';

export interface PickListFilterOptions {
    filter?: (value?: any) => void;
    reset?: () => void;
}

@Component({
    selector: 'p-pickList',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true, 'p-picklist-striped': stripedRows }" cdkDropListGroup>
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls">
                <button type="button" [attr.aria-label]="upButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="sourceMoveDisabled()" (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)">
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="topButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="sourceMoveDisabled()" (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)">
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="downButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="sourceMoveDisabled()" (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)">
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="bottomButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="sourceMoveDisabled()" (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)">
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper">
                <div class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{ sourceHeader }}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false">
                    <ng-container *ngIf="sourceFilterTemplate; else builtInSourceElement">
                        <ng-container *ngTemplateOutlet="sourceFilterTemplate; context: { options: sourceFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInSourceElement>
                        <div class="p-picklist-filter">
                            <input
                                #sourceFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, SOURCE_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="sourceFilterPlaceholder"
                                [attr.aria-label]="ariaSourceFilterLabel"
                            />
                            <SearchIcon *ngIf="!sourceFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" />
                            <span class="p-picklist-filter-icon" *ngIf="sourceFilterIconTemplate">
                                <ng-template *ngTemplateOutlet="sourceFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>

                <ul #sourcelist class="p-picklist-list p-picklist-source" cdkDropList [cdkDropListData]="source" (cdkDropListDropped)="onDrop($event, SOURCE_LIST)" [ngStyle]="sourceStyle" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsSource), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsSource, onSourceSelect)"
                            (dblclick)="onSourceItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            (keydown)="onItemKeydown($event, item, selectedItemsSource, onSourceSelect)"
                            *ngIf="isItemVisible(item, SOURCE_LIST)"
                            tabindex="0"
                            role="option"
                            [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons">
                <button type="button" [attr.aria-label]="rightButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" />
                        <AngleDownIcon *ngIf="viewChanged" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="allRightButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="leftButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" />
                        <AngleUpIcon *ngIf="viewChanged" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="allLeftButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper">
                <div class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{ targetHeader }}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false">
                    <ng-container *ngIf="targetFilterTemplate; else builtInTargetElement">
                        <ng-container *ngTemplateOutlet="targetFilterTemplate; context: { options: targetFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInTargetElement>
                        <div class="p-picklist-filter">
                            <input
                                #targetFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, TARGET_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="targetFilterPlaceholder"
                                [attr.aria-label]="ariaTargetFilterLabel"
                            />
                            <SearchIcon *ngIf="!targetFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" />
                            <span class="p-picklist-filter-icon" *ngIf="targetFilterIconTemplate">
                                <ng-template *ngTemplateOutlet="targetFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul #targetlist class="p-picklist-list p-picklist-target" cdkDropList [cdkDropListData]="target" (cdkDropListDropped)="onDrop($event, TARGET_LIST)" [ngStyle]="targetStyle" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsTarget), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsTarget, onTargetSelect)"
                            (dblclick)="onTargetItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            (keydown)="onItemKeydown($event, item, selectedItemsTarget, onTargetSelect)"
                            *ngIf="isItemVisible(item, TARGET_LIST)"
                            tabindex="0"
                            role="option"
                            [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls">
                <button type="button" [attr.aria-label]="upButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="targetMoveDisabled()" (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)">
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="topButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="targetMoveDisabled()" (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)">
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="downButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="targetMoveDisabled()" (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)">
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="bottomButtonAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="targetMoveDisabled()" (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)">
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./picklist.css'],
    host: {
        class: 'p-element'
    }
})
export class PickList implements AfterViewChecked, AfterContentInit {
    @Input() source: any[];

    @Input() target: any[];

    @Input() sourceHeader: string;

    @Input() rightButtonAriaLabel: string;

    @Input() leftButtonAriaLabel: string;

    @Input() allRightButtonAriaLabel: string;

    @Input() allLeftButtonAriaLabel: string;

    @Input() upButtonAriaLabel: string;

    @Input() downButtonAriaLabel: string;

    @Input() topButtonAriaLabel: string;

    @Input() bottomButtonAriaLabel: string;

    @Input() targetHeader: string;

    @Input() responsive: boolean;

    @Input() filterBy: string;

    @Input() filterLocale: string;

    @Input() trackBy: Function = (index: number, item: any) => item;

    @Input() sourceTrackBy: Function;

    @Input() targetTrackBy: Function;

    @Input() showSourceFilter: boolean = true;

    @Input() showTargetFilter: boolean = true;

    @Input() metaKeySelection: boolean = true;

    @Input() dragdrop: boolean = false;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() sourceStyle: any;

    @Input() targetStyle: any;

    @Input() showSourceControls: boolean = true;

    @Input() showTargetControls: boolean = true;

    @Input() sourceFilterPlaceholder: string;

    @Input() targetFilterPlaceholder: string;

    @Input() disabled: boolean = false;

    @Input() ariaSourceFilterLabel: string;

    @Input() ariaTargetFilterLabel: string;

    @Input() filterMatchMode: string = 'contains';

    @Input() get breakpoint(): string {
        return this._breakpoint;
    }

    set breakpoint(value: string) {
        if (value !== this._breakpoint) {
            this._breakpoint = value;
            if (isPlatformBrowser(this.platformId)) {
                this.destroyMedia();
                this.initMedia();
            }
        }
    }

    @Input() stripedRows: boolean;

    @Input() keepSelection: boolean = false;

    @Output() onMoveToSource: EventEmitter<any> = new EventEmitter();

    @Output() onMoveAllToSource: EventEmitter<any> = new EventEmitter();

    @Output() onMoveAllToTarget: EventEmitter<any> = new EventEmitter();

    @Output() onMoveToTarget: EventEmitter<any> = new EventEmitter();

    @Output() onSourceReorder: EventEmitter<any> = new EventEmitter();

    @Output() onTargetReorder: EventEmitter<any> = new EventEmitter();

    @Output() onSourceSelect: EventEmitter<any> = new EventEmitter();

    @Output() onTargetSelect: EventEmitter<any> = new EventEmitter();

    @Output() onSourceFilter: EventEmitter<any> = new EventEmitter();

    @Output() onTargetFilter: EventEmitter<any> = new EventEmitter();

    @ViewChild('sourcelist') listViewSourceChild: ElementRef;

    @ViewChild('targetlist') listViewTargetChild: ElementRef;

    @ViewChild('sourceFilter') sourceFilterViewChild: ElementRef;

    @ViewChild('targetFilter') targetFilterViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    _breakpoint: string = '960px';

    public itemTemplate: TemplateRef<any>;

    moveTopIconTemplate: TemplateRef<any>;

    moveUpIconTemplate: TemplateRef<any>;

    moveDownIconTemplate: TemplateRef<any>;

    moveBottomIconTemplate: TemplateRef<any>;

    moveToTargetIconTemplate: TemplateRef<any>;

    moveAllToTargetIconTemplate: TemplateRef<any>;

    moveToSourceIconTemplate: TemplateRef<any>;

    moveAllToSourceIconTemplate: TemplateRef<any>;

    targetFilterIconTemplate: TemplateRef<any>;

    sourceFilterIconTemplate: TemplateRef<any>;

    public visibleOptionsSource: any[];

    public visibleOptionsTarget: any[];

    selectedItemsSource: any[] = [];

    selectedItemsTarget: any[] = [];

    reorderedListElement: any;

    movedUp: boolean;

    movedDown: boolean;

    itemTouched: boolean;

    styleElement: any;

    id: string = UniqueComponentId();

    filterValueSource: string;

    filterValueTarget: string;

    fromListType: number;

    emptyMessageSourceTemplate: TemplateRef<any>;

    emptyFilterMessageSourceTemplate: TemplateRef<any>;

    emptyMessageTargetTemplate: TemplateRef<any>;

    emptyFilterMessageTargetTemplate: TemplateRef<any>;

    sourceHeaderTemplate: TemplateRef<any>;

    targetHeaderTemplate: TemplateRef<any>;

    sourceFilterTemplate: TemplateRef<any>;

    targetFilterTemplate: TemplateRef<any>;

    sourceFilterOptions: PickListFilterOptions;

    targetFilterOptions: PickListFilterOptions;

    readonly SOURCE_LIST = -1;

    readonly TARGET_LIST = 1;

    window: Window;

    media: MediaQueryList | null;

    viewChanged: boolean;

    mediaChangeListener: VoidFunction | null;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public el: ElementRef, public cd: ChangeDetectorRef, public filterService: FilterService) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        if (this.responsive) {
            this.createStyle();
            this.initMedia();
        }

        if (this.filterBy) {
            this.sourceFilterOptions = {
                filter: (value) => this.filterSource(value),
                reset: () => this.resetSourceFilter()
            };

            this.targetFilterOptions = {
                filter: (value) => this.filterTarget(value),
                reset: () => this.resetTargetFilter()
            };
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'sourceHeader':
                    this.sourceHeaderTemplate = item.template;
                    break;

                case 'targetHeader':
                    this.targetHeaderTemplate = item.template;
                    break;

                case 'sourceFilter':
                    this.sourceFilterTemplate = item.template;
                    break;

                case 'targetFilter':
                    this.targetFilterTemplate = item.template;
                    break;

                case 'emptymessagesource':
                    this.emptyMessageSourceTemplate = item.template;
                    break;

                case 'emptyfiltermessagesource':
                    this.emptyFilterMessageSourceTemplate = item.template;
                    break;

                case 'emptymessagetarget':
                    this.emptyMessageTargetTemplate = item.template;
                    break;

                case 'emptyfiltermessagetarget':
                    this.emptyFilterMessageTargetTemplate = item.template;
                    break;

                case 'moveupicon':
                    this.moveUpIconTemplate = item.template;
                    break;

                case 'movetopicon':
                    this.moveTopIconTemplate = item.template;
                    break;

                case 'movedownicon':
                    this.moveDownIconTemplate = item.template;
                    break;

                case 'movebottomicon':
                    this.moveBottomIconTemplate = item.template;
                    break;

                case 'movetotargeticon':
                    this.moveToTargetIconTemplate = item.template;
                    break;

                case 'movealltotargeticon':
                    this.moveAllToTargetIconTemplate = item.template;
                    break;

                case 'movetosourceicon':
                    this.moveToSourceIconTemplate = item.template;
                    break;

                case 'movealltosourceicon':
                    this.moveAllToSourceIconTemplate = item.template;
                    break;

                case 'targetfiltericon':
                    this.targetFilterIconTemplate = item.template;
                    break;

                case 'sourcefiltericon':
                    this.sourceFilterIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.reorderedListElement, 'li.p-highlight');
            let listItem;

            if (this.movedUp) listItem = listItems[0];
            else listItem = listItems[listItems.length - 1];

            DomHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    }

    onItemClick(event, item: any, selectedItems: any[], callback: EventEmitter<any>) {
        if (this.disabled) {
            return;
        }

        let index = this.findIndexInSelection(item, selectedItems);
        let selected = index != -1;
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;

        if (metaSelection) {
            let metaKey = event.metaKey || event.ctrlKey || event.shiftKey;

            if (selected && metaKey) {
                selectedItems.splice(index, 1);
            } else {
                if (!metaKey) {
                    selectedItems.length = 0;
                }
                selectedItems.push(item);
            }
        } else {
            if (selected) selectedItems.splice(index, 1);
            else selectedItems.push(item);
        }

        callback.emit({ originalEvent: event, items: selectedItems });

        this.itemTouched = false;
    }

    onSourceItemDblClick() {
        if (this.disabled) {
            return;
        }

        this.moveRight();
    }

    onTargetItemDblClick() {
        if (this.disabled) {
            return;
        }

        this.moveLeft();
    }

    onFilter(event: KeyboardEvent, listType: number) {
        let query = (<HTMLInputElement>event.target).value;
        if (listType === this.SOURCE_LIST) this.filterSource(query);
        else if (listType === this.TARGET_LIST) this.filterTarget(query);
    }

    filterSource(value: any = '') {
        this.filterValueSource = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(this.source, this.SOURCE_LIST);
    }

    filterTarget(value: any = '') {
        this.filterValueTarget = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(this.target, this.TARGET_LIST);
    }

    filter(data: any[], listType: number) {
        let searchFields = this.filterBy.split(',');

        if (listType === this.SOURCE_LIST) {
            this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        } else if (listType === this.TARGET_LIST) {
            this.visibleOptionsTarget = this.filterService.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    }

    isItemVisible(item: any, listType: number): boolean {
        if (listType == this.SOURCE_LIST) return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
        else return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
    }

    isEmpty(listType: number) {
        if (listType == this.SOURCE_LIST) return this.filterValueSource ? !this.visibleOptionsSource || this.visibleOptionsSource.length === 0 : !this.source || this.source.length === 0;
        else return this.filterValueTarget ? !this.visibleOptionsTarget || this.visibleOptionsTarget.length === 0 : !this.target || this.target.length === 0;
    }

    isVisibleInList(data: any[], item: any, filterValue: string): boolean {
        if (filterValue && filterValue.trim().length) {
            for (let i = 0; i < data.length; i++) {
                if (item == data[i]) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }

    onItemTouchEnd() {
        if (this.disabled) {
            return;
        }

        this.itemTouched = true;
    }

    private sortByIndexInList(items: any[], list: any) {
        return items.sort((item1, item2) => ObjectUtils.findIndexInList(item1, list) - ObjectUtils.findIndexInList(item2, list));
    }

    moveUp(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, list);

                if (selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }

    moveTop(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, list);

                if (selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
        }
    }

    moveDown(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, list);

                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }

    moveBottom(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, list);

                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST))) this.filter(list, listType);

            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
        }
    }

    moveRight() {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            for (let i = 0; i < this.selectedItemsSource.length; i++) {
                let selectedItem = this.selectedItemsSource[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.target) == -1) {
                    this.target.push(this.source.splice(ObjectUtils.findIndexInList(selectedItem, this.source), 1)[0]);

                    if (this.visibleOptionsSource) this.visibleOptionsSource.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsSource), 1);
                }
            }

            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });

            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }

            this.selectedItemsSource = [];

            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
        }
    }

    moveAllRight() {
        if (this.source) {
            let movedItems = [];

            for (let i = 0; i < this.source.length; i++) {
                if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    let removedItem = this.source.splice(i, 1)[0];
                    this.target.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }

            this.onMoveAllToTarget.emit({
                items: movedItems
            });

            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }

            this.selectedItemsSource = [];

            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }

            this.visibleOptionsSource = [];
        }
    }

    moveLeft() {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for (let i = 0; i < this.selectedItemsTarget.length; i++) {
                let selectedItem = this.selectedItemsTarget[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.source) == -1) {
                    this.source.push(this.target.splice(ObjectUtils.findIndexInList(selectedItem, this.target), 1)[0]);

                    if (this.visibleOptionsTarget) this.visibleOptionsTarget.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsTarget), 1)[0];
                }
            }

            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });

            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }

            this.selectedItemsTarget = [];

            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
        }
    }

    moveAllLeft() {
        if (this.target) {
            let movedItems = [];

            for (let i = 0; i < this.target.length; i++) {
                if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    let removedItem = this.target.splice(i, 1)[0];
                    this.source.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }

            this.onMoveAllToSource.emit({
                items: movedItems
            });

            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }

            this.selectedItemsTarget = [];

            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }

            this.visibleOptionsTarget = [];
        }
    }

    isSelected(item: any, selectedItems: any[]) {
        return this.findIndexInSelection(item, selectedItems) != -1;
    }

    findIndexInSelection(item: any, selectedItems: any[]): number {
        return ObjectUtils.findIndexInList(item, selectedItems);
    }

    onDrop(event: CdkDragDrop<string[]>, listType: number) {
        let isTransfer = event.previousContainer !== event.container;
        let dropIndexes = this.getDropIndexes(event.previousIndex, event.currentIndex, listType, isTransfer, event.item.data);

        if (listType === this.SOURCE_LIST) {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsTarget);

                if (selectedItemIndex != -1) {
                    this.selectedItemsTarget.splice(selectedItemIndex, 1);

                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }

                if (this.visibleOptionsTarget) this.visibleOptionsTarget.splice(event.previousIndex, 1);

                this.onMoveToSource.emit({ items: [event.item.data] });
            } else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onSourceReorder.emit({ items: [event.item.data] });
            }

            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
        } else {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);

                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsSource);

                if (selectedItemIndex != -1) {
                    this.selectedItemsSource.splice(selectedItemIndex, 1);

                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }

                if (this.visibleOptionsSource) this.visibleOptionsSource.splice(event.previousIndex, 1);

                this.onMoveToTarget.emit({ items: [event.item.data] });
            } else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onTargetReorder.emit({ items: [event.item.data] });
            }

            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
        }
    }

    getDropIndexes(fromIndex, toIndex, droppedList, isTransfer, data) {
        let previousIndex, currentIndex;

        if (droppedList === this.SOURCE_LIST) {
            previousIndex = isTransfer ? (this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex) : this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex;
            currentIndex = this.filterValueSource ? this.findFilteredCurrentIndex(this.visibleOptionsSource, toIndex, this.source) : toIndex;
        } else {
            previousIndex = isTransfer ? (this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex) : this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex;
            currentIndex = this.filterValueTarget ? this.findFilteredCurrentIndex(this.visibleOptionsTarget, toIndex, this.target) : toIndex;
        }

        return { previousIndex, currentIndex };
    }

    findFilteredCurrentIndex(visibleOptions, index, options) {
        if (visibleOptions.length === index) {
            let toIndex = ObjectUtils.findIndexInList(visibleOptions[index - 1], options);

            return toIndex + 1;
        } else {
            return ObjectUtils.findIndexInList(visibleOptions[index], options);
        }
    }

    resetSourceFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.sourceFilterViewChild && ((<HTMLInputElement>this.sourceFilterViewChild.nativeElement).value = '');
    }

    resetTargetFilter() {
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        this.targetFilterViewChild && ((<HTMLInputElement>this.targetFilterViewChild.nativeElement).value = '');
    }

    resetFilter() {
        this.resetSourceFilter();
        this.resetTargetFilter();
    }

    onItemKeydown(event: KeyboardEvent, item: any, selectedItems: any[], callback: EventEmitter<any>) {
        let listItem = <HTMLLIElement>event.currentTarget;

        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(listItem);
                if (nextItem) {
                    nextItem.focus();
                }

                event.preventDefault();
                break;

            //up
            case 38:
                var prevItem = this.findPrevItem(listItem);
                if (prevItem) {
                    prevItem.focus();
                }

                event.preventDefault();
                break;

            //enter
            case 13:
                this.onItemClick(event, item, selectedItems, callback);
                event.preventDefault();
                break;
        }
    }

    findNextItem(item) {
        let nextItem = item.nextElementSibling;

        if (nextItem) return !DomHandler.hasClass(nextItem, 'p-picklist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else return null;
    }

    findPrevItem(item) {
        let prevItem = item.previousElementSibling;

        if (prevItem) return !DomHandler.hasClass(prevItem, 'p-picklist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else return null;
    }

    initMedia() {
        if (isPlatformBrowser(this.platformId)) {
            this.media = this.window.matchMedia(`(max-width: ${this.breakpoint})`);
            this.viewChanged = this.media.matches;
            this.bindMediaChangeListener();
        }
    }

    destroyMedia() {
        this.unbindMediaChangeListener();
    }

    bindMediaChangeListener() {
        if (this.media && !this.mediaChangeListener) {
            this.mediaChangeListener = this.renderer.listen(this.media, 'change', (event) => {
                this.viewChanged = event.matches;
                this.cd.markForCheck();
            });
        }
    }

    unbindMediaChangeListener() {
        if (this.mediaChangeListener) {
            this.mediaChangeListener();
            this.mediaChangeListener = null;
        }
    }

    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, '');
                this.styleElement = this.renderer.createElement('style');
                this.renderer.setAttribute(this.styleElement, 'type', 'text/css');
                this.renderer.appendChild(this.document.head, this.styleElement);

                let innerHTML = `
                @media screen and (max-width: ${this.breakpoint}) {
                    .p-picklist[${this.id}] {
                        flex-direction: column;
                    }
    
                    .p-picklist[${this.id}] .p-picklist-buttons {
                        padding: var(--content-padding);
                        flex-direction: row;
                    }
    
                    .p-picklist[${this.id}] .p-picklist-buttons .p-button {
                        margin-right: var(--inline-spacing);
                        margin-bottom: 0;
                    }
    
                    .p-picklist[${this.id}] .p-picklist-buttons .p-button:last-child {
                        margin-right: 0;
                    }
                }`;

                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
            }
        }
    }

    sourceMoveDisabled() {
        if (this.disabled || !this.selectedItemsSource.length) {
            return true;
        }
    }

    targetMoveDisabled() {
        if (this.disabled || !this.selectedItemsTarget.length) {
            return true;
        }
    }

    moveRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsSource);
    }

    moveLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsTarget);
    }

    moveAllRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.source);
    }

    moveAllLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.target);
    }

    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
            ``;
        }
    }

    ngOnDestroy() {
        this.destroyStyle();
        this.destroyMedia();
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon],
    exports: [PickList, SharedModule, DragDropModule],
    declarations: [PickList]
})
export class PickListModule {}
