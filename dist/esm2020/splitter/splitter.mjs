import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, ViewChild, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Splitter {
    constructor(document, platformId, renderer, cd, el) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
        this.el = el;
        this.stateStorage = 'session';
        this.stateKey = null;
        this.layout = 'horizontal';
        this.gutterSize = 4;
        this.minSizes = [];
        this.onResizeEnd = new EventEmitter();
        this.onResizeStart = new EventEmitter();
        this.nested = false;
        this.panels = [];
        this.dragging = false;
        this.size = null;
        this.gutterElement = null;
        this.startPos = null;
        this.prevPanelElement = null;
        this.nextPanelElement = null;
        this.nextPanelSize = null;
        this.prevPanelSize = null;
        this._panelSizes = [];
        this.prevPanelIndex = null;
        this.window = this.document.defaultView;
    }
    get panelSizes() {
        return this._panelSizes;
    }
    set panelSizes(val) {
        this._panelSizes = val;
        if (this.el && this.el.nativeElement && this.panels.length > 0) {
            let children = [...this.el.nativeElement.children[0].children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
            let _panelSizes = [];
            this.panels.map((panel, i) => {
                let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
                let panelSize = panelInitialSize || 100 / this.panels.length;
                _panelSizes[i] = panelSize;
                children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            });
        }
    }
    ngOnInit() {
        this.nested = this.isNested();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'panel':
                    this.panels.push(item.template);
                    break;
                default:
                    this.panels.push(item.template);
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.panels && this.panels.length) {
            let initialized = false;
            if (this.isStateful() && isPlatformBrowser(this.platformId)) {
                initialized = this.restoreState();
            }
            if (!initialized) {
                let children = [...this.el.nativeElement.children[0].children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
                let _panelSizes = [];
                this.panels.map((panel, i) => {
                    let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
                    let panelSize = panelInitialSize || 100 / this.panels.length;
                    _panelSizes[i] = panelSize;
                    children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
                });
                this._panelSizes = _panelSizes;
            }
        }
    }
    resizeStart(event, index) {
        this.gutterElement = event.currentTarget;
        this.size = this.horizontal() ? DomHandler.getWidth(this.containerViewChild.nativeElement) : DomHandler.getHeight(this.containerViewChild.nativeElement);
        this.dragging = true;
        this.startPos = this.horizontal() ? event.pageX || event.changedTouches[0].pageX : event.pageY || event.changedTouches[0].pageY;
        this.prevPanelElement = this.gutterElement.previousElementSibling;
        this.nextPanelElement = this.gutterElement.nextElementSibling;
        this.prevPanelSize = (100 * (this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true))) / this.size;
        this.nextPanelSize = (100 * (this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true))) / this.size;
        this.prevPanelIndex = index;
        DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
        DomHandler.addClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
        this.onResizeStart.emit({ originalEvent: event, sizes: this._panelSizes });
    }
    onResize(event) {
        let newPos;
        if (this.horizontal())
            newPos = (event.pageX * 100) / this.size - (this.startPos * 100) / this.size;
        else
            newPos = (event.pageY * 100) / this.size - (this.startPos * 100) / this.size;
        let newPrevPanelSize = this.prevPanelSize + newPos;
        let newNextPanelSize = this.nextPanelSize - newPos;
        if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
            this.prevPanelElement.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            this.nextPanelElement.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            this._panelSizes[this.prevPanelIndex] = newPrevPanelSize;
            this._panelSizes[this.prevPanelIndex + 1] = newNextPanelSize;
        }
    }
    resizeEnd(event) {
        if (this.isStateful()) {
            this.saveState();
        }
        this.onResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
        DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
        this.clear();
    }
    onGutterMouseDown(event, index) {
        this.resizeStart(event, index);
        this.bindMouseListeners();
    }
    onGutterTouchStart(event, index) {
        if (event.cancelable) {
            this.resizeStart(event, index);
            this.bindTouchListeners();
            event.preventDefault();
        }
    }
    onGutterTouchEnd(event) {
        this.resizeEnd(event);
        this.unbindTouchListeners();
        if (event.cancelable)
            event.preventDefault();
    }
    validateResize(newPrevPanelSize, newNextPanelSize) {
        if (this.minSizes.length >= 1 && this.minSizes[0] && this.minSizes[0] > newPrevPanelSize) {
            return false;
        }
        if (this.minSizes.length > 1 && this.minSizes[1] && this.minSizes[1] > newNextPanelSize) {
            return false;
        }
        return true;
    }
    bindMouseListeners() {
        if (!this.mouseMoveListener) {
            this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (event) => {
                this.onResize(event);
            });
        }
        if (!this.mouseUpListener) {
            this.mouseUpListener = this.renderer.listen(this.document, 'mouseup', (event) => {
                this.resizeEnd(event);
                this.unbindMouseListeners();
            });
        }
    }
    bindTouchListeners() {
        if (!this.touchMoveListener) {
            this.touchMoveListener = this.renderer.listen(this.document, 'touchmove', (event) => {
                this.onResize(event.changedTouches[0]);
            });
        }
        if (!this.touchEndListener) {
            this.touchEndListener = this.renderer.listen(this.document, 'touchend', (event) => {
                this.resizeEnd(event);
                this.unbindTouchListeners();
            });
        }
    }
    unbindMouseListeners() {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
            this.mouseMoveListener = null;
        }
        if (this.mouseUpListener) {
            this.mouseUpListener();
            this.mouseUpListener = null;
        }
    }
    unbindTouchListeners() {
        if (this.touchMoveListener) {
            this.touchMoveListener();
            this.touchMoveListener = null;
        }
        if (this.touchEndListener) {
            this.touchEndListener();
            this.touchEndListener = null;
        }
    }
    clear() {
        this.dragging = false;
        this.size = null;
        this.startPos = null;
        this.prevPanelElement = null;
        this.nextPanelElement = null;
        this.prevPanelSize = null;
        this.nextPanelSize = null;
        this.gutterElement = null;
        this.prevPanelIndex = null;
    }
    isNested() {
        if (this.el.nativeElement) {
            let parent = this.el.nativeElement.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'p-splitter')) {
                parent = parent.parentElement;
            }
            return parent !== null;
        }
        else {
            return false;
        }
    }
    isStateful() {
        return this.stateKey != null;
    }
    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage) {
                case 'local':
                    return this.window.localStorage;
                case 'session':
                    return this.window.sessionStorage;
                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        }
        else {
            throw new Error('Storage is not a available by default on the server.');
        }
    }
    saveState() {
        this.getStorage().setItem(this.stateKey, JSON.stringify(this._panelSizes));
    }
    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        if (stateString) {
            this._panelSizes = JSON.parse(stateString);
            let children = [...this.containerViewChild.nativeElement.children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
            children.forEach((child, i) => {
                child.style.flexBasis = 'calc(' + this._panelSizes[i] + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            });
            return true;
        }
        return false;
    }
    containerClass() {
        return {
            'p-splitter p-component': true,
            'p-splitter-horizontal': this.layout === 'horizontal',
            'p-splitter-vertical': this.layout === 'vertical'
        };
    }
    panelContainerClass() {
        return {
            'p-splitter-panel': true,
            'p-splitter-panel-nested': true
        };
    }
    gutterStyle() {
        if (this.horizontal())
            return { width: this.gutterSize + 'px' };
        else
            return { height: this.gutterSize + 'px' };
    }
    horizontal() {
        return this.layout === 'horizontal';
    }
}
Splitter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Splitter, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Splitter.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: Splitter, selector: "p-splitter", inputs: { styleClass: "styleClass", panelStyleClass: "panelStyleClass", style: "style", panelStyle: "panelStyle", stateStorage: "stateStorage", stateKey: "stateKey", layout: "layout", gutterSize: "gutterSize", minSizes: "minSizes", panelSizes: "panelSizes" }, outputs: { onResizeEnd: "onResizeEnd", onResizeStart: "onResizeStart" }, host: { properties: { "class.p-splitter-panel-nested": "nested" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-template ngFor let-panel let-i="index" [ngForOf]="panels">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div class="p-splitter-gutter" *ngIf="i !== panels.length - 1" [ngStyle]="gutterStyle()" (mousedown)="onGutterMouseDown($event, i)" (touchstart)="onGutterTouchStart($event, i)">
                    <div class="p-splitter-gutter-handle"></div>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: [".p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{flex-grow:1;border:0 none}.p-splitter-gutter{flex-grow:0;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:col-resize}.p-splitter-horizontal.p-splitter-resizing{cursor:col-resize;-webkit-user-select:none;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{cursor:row-resize;-webkit-user-select:none;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{width:24px;height:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Splitter, decorators: [{
            type: Component,
            args: [{ selector: 'p-splitter', template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-template ngFor let-panel let-i="index" [ngForOf]="panels">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div class="p-splitter-gutter" *ngIf="i !== panels.length - 1" [ngStyle]="gutterStyle()" (mousedown)="onGutterMouseDown($event, i)" (touchstart)="onGutterTouchStart($event, i)">
                    <div class="p-splitter-gutter-handle"></div>
                </div>
            </ng-template>
        </div>
    `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'p-element',
                        '[class.p-splitter-panel-nested]': 'nested'
                    }, styles: [".p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{flex-grow:1;border:0 none}.p-splitter-gutter{flex-grow:0;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:col-resize}.p-splitter-horizontal.p-splitter-resizing{cursor:col-resize;-webkit-user-select:none;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{cursor:row-resize;-webkit-user-select:none;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{width:24px;height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { styleClass: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], stateStorage: [{
                type: Input
            }], stateKey: [{
                type: Input
            }], layout: [{
                type: Input
            }], gutterSize: [{
                type: Input
            }], minSizes: [{
                type: Input
            }], onResizeEnd: [{
                type: Output
            }], onResizeStart: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container', { static: false }]
            }], panelSizes: [{
                type: Input
            }] } });
export class SplitterModule {
}
SplitterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SplitterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: SplitterModule, declarations: [Splitter], imports: [CommonModule], exports: [Splitter, SharedModule] });
SplitterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SplitterModule, imports: [CommonModule, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SplitterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Splitter, SharedModule],
                    declarations: [Splitter]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3BsaXR0ZXIvc3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBeUQsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoUCxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQXdCMUQsTUFBTSxPQUFPLFFBQVE7SUFpRmpCLFlBQXNDLFFBQWtCLEVBQStCLFVBQWUsRUFBVSxRQUFtQixFQUFTLEVBQXFCLEVBQVUsRUFBYztRQUFuSixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQStCLGVBQVUsR0FBVixVQUFVLENBQUs7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBeEVoTCxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUVqQyxhQUFRLEdBQVcsSUFBSSxDQUFDO1FBRXhCLFdBQU0sR0FBVyxZQUFZLENBQUM7UUFFOUIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBRXZCLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFcEQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQTBCaEUsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLFdBQU0sR0FB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LGNBQWM7NEdBQWQsY0FBYyxpQkEvVmQsUUFBUSxhQTJWUCxZQUFZLGFBM1ZiLFFBQVEsRUE0VkcsWUFBWTs0R0FHdkIsY0FBYyxZQUpiLFlBQVksRUFDRixZQUFZOzJGQUd2QixjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQztvQkFDakMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXNwbGl0dGVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCI+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcGFuZWwgbGV0LWk9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInBhbmVsc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJwYW5lbENvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwicGFuZWxTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwicGFuZWxTdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYW5lbFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1zcGxpdHRlci1ndXR0ZXJcIiAqbmdJZj1cImkgIT09IHBhbmVscy5sZW5ndGggLSAxXCIgW25nU3R5bGVdPVwiZ3V0dGVyU3R5bGUoKVwiIChtb3VzZWRvd24pPVwib25HdXR0ZXJNb3VzZURvd24oJGV2ZW50LCBpKVwiICh0b3VjaHN0YXJ0KT1cIm9uR3V0dGVyVG91Y2hTdGFydCgkZXZlbnQsIGkpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc3BsaXR0ZXItZ3V0dGVyLWhhbmRsZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vc3BsaXR0ZXIuY3NzJ10sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnLFxyXG4gICAgICAgICdbY2xhc3MucC1zcGxpdHRlci1wYW5lbC1uZXN0ZWRdJzogJ25lc3RlZCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyIHtcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdGF0ZVN0b3JhZ2U6IHN0cmluZyA9ICdzZXNzaW9uJztcclxuXHJcbiAgICBASW5wdXQoKSBzdGF0ZUtleTogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBASW5wdXQoKSBsYXlvdXQ6IHN0cmluZyA9ICdob3Jpem9udGFsJztcclxuXHJcbiAgICBASW5wdXQoKSBndXR0ZXJTaXplOiBudW1iZXIgPSA0O1xyXG5cclxuICAgIEBJbnB1dCgpIG1pblNpemVzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblJlc2l6ZUVuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUmVzaXplU3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBJbnB1dCgpIGdldCBwYW5lbFNpemVzKCk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFuZWxTaXplcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGFuZWxTaXplcyh2YWw6IG51bWJlcltdKSB7XHJcbiAgICAgICAgdGhpcy5fcGFuZWxTaXplcyA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZWwgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50ICYmIHRoaXMucGFuZWxzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gWy4uLnRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlbl0uZmlsdGVyKChjaGlsZCkgPT4gRG9tSGFuZGxlci5oYXNDbGFzcyhjaGlsZCwgJ3Atc3BsaXR0ZXItcGFuZWwnKSk7XHJcbiAgICAgICAgICAgIGxldCBfcGFuZWxTaXplcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYW5lbHMubWFwKChwYW5lbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVsSW5pdGlhbFNpemUgPSB0aGlzLnBhbmVsU2l6ZXMubGVuZ3RoIC0gMSA+PSBpID8gdGhpcy5wYW5lbFNpemVzW2ldIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGxldCBwYW5lbFNpemUgPSBwYW5lbEluaXRpYWxTaXplIHx8IDEwMCAvIHRoaXMucGFuZWxzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIF9wYW5lbFNpemVzW2ldID0gcGFuZWxTaXplO1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0uc3R5bGUuZmxleEJhc2lzID0gJ2NhbGMoJyArIHBhbmVsU2l6ZSArICclIC0gJyArICh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSArICdweCknO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdGVkID0gZmFsc2U7XHJcblxyXG4gICAgcGFuZWxzID0gW107XHJcblxyXG4gICAgZHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBtb3VzZU1vdmVMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbDtcclxuXHJcbiAgICBtb3VzZVVwTGlzdGVuZXI6IFZvaWRGdW5jdGlvbiB8IG51bGw7XHJcblxyXG4gICAgdG91Y2hNb3ZlTGlzdGVuZXI6IFZvaWRGdW5jdGlvbiB8IG51bGw7XHJcblxyXG4gICAgdG91Y2hFbmRMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbDtcclxuXHJcbiAgICBzaXplID0gbnVsbDtcclxuXHJcbiAgICBndXR0ZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBzdGFydFBvcyA9IG51bGw7XHJcblxyXG4gICAgcHJldlBhbmVsRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgbmV4dFBhbmVsRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgbmV4dFBhbmVsU2l6ZSA9IG51bGw7XHJcblxyXG4gICAgcHJldlBhbmVsU2l6ZSA9IG51bGw7XHJcblxyXG4gICAgX3BhbmVsU2l6ZXM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgcHJldlBhbmVsSW5kZXggPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgd2luZG93OiBXaW5kb3c7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgICAgICB0aGlzLndpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgV2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmVzdGVkID0gdGhpcy5pc05lc3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3BhbmVsJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVscy5wdXNoKGl0ZW0udGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVscy5wdXNoKGl0ZW0udGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhbmVscyAmJiB0aGlzLnBhbmVscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSAmJiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplZCA9IHRoaXMucmVzdG9yZVN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IFsuLi50aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5dLmZpbHRlcigoY2hpbGQpID0+IERvbUhhbmRsZXIuaGFzQ2xhc3MoY2hpbGQsICdwLXNwbGl0dGVyLXBhbmVsJykpO1xyXG4gICAgICAgICAgICAgICAgbGV0IF9wYW5lbFNpemVzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbHMubWFwKChwYW5lbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbEluaXRpYWxTaXplID0gdGhpcy5wYW5lbFNpemVzLmxlbmd0aCAtIDEgPj0gaSA/IHRoaXMucGFuZWxTaXplc1tpXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhbmVsU2l6ZSA9IHBhbmVsSW5pdGlhbFNpemUgfHwgMTAwIC8gdGhpcy5wYW5lbHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wYW5lbFNpemVzW2ldID0gcGFuZWxTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyBwYW5lbFNpemUgKyAnJSAtICcgKyAodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUgKyAncHgpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXMgPSBfcGFuZWxTaXplcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNpemVTdGFydChldmVudCwgaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmd1dHRlckVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSA6IERvbUhhbmRsZXIuZ2V0SGVpZ2h0KHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSB0aGlzLmhvcml6b250YWwoKSA/IGV2ZW50LnBhZ2VYIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIDogZXZlbnQucGFnZVkgfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICAgICAgdGhpcy5wcmV2UGFuZWxFbGVtZW50ID0gdGhpcy5ndXR0ZXJFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgdGhpcy5uZXh0UGFuZWxFbGVtZW50ID0gdGhpcy5ndXR0ZXJFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICB0aGlzLnByZXZQYW5lbFNpemUgPSAoMTAwICogKHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMucHJldlBhbmVsRWxlbWVudCwgdHJ1ZSkgOiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMucHJldlBhbmVsRWxlbWVudCwgdHJ1ZSkpKSAvIHRoaXMuc2l6ZTtcclxuICAgICAgICB0aGlzLm5leHRQYW5lbFNpemUgPSAoMTAwICogKHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSkgOiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSkpKSAvIHRoaXMuc2l6ZTtcclxuICAgICAgICB0aGlzLnByZXZQYW5lbEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmd1dHRlckVsZW1lbnQsICdwLXNwbGl0dGVyLWd1dHRlci1yZXNpemluZycpO1xyXG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3Atc3BsaXR0ZXItcmVzaXppbmcnKTtcclxuICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBzaXplczogdGhpcy5fcGFuZWxTaXplcyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZShldmVudCkge1xyXG4gICAgICAgIGxldCBuZXdQb3M7XHJcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKSBuZXdQb3MgPSAoZXZlbnQucGFnZVggKiAxMDApIC8gdGhpcy5zaXplIC0gKHRoaXMuc3RhcnRQb3MgKiAxMDApIC8gdGhpcy5zaXplO1xyXG4gICAgICAgIGVsc2UgbmV3UG9zID0gKGV2ZW50LnBhZ2VZICogMTAwKSAvIHRoaXMuc2l6ZSAtICh0aGlzLnN0YXJ0UG9zICogMTAwKSAvIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgbGV0IG5ld1ByZXZQYW5lbFNpemUgPSB0aGlzLnByZXZQYW5lbFNpemUgKyBuZXdQb3M7XHJcbiAgICAgICAgbGV0IG5ld05leHRQYW5lbFNpemUgPSB0aGlzLm5leHRQYW5lbFNpemUgLSBuZXdQb3M7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlUmVzaXplKG5ld1ByZXZQYW5lbFNpemUsIG5ld05leHRQYW5lbFNpemUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldlBhbmVsRWxlbWVudC5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgbmV3UHJldlBhbmVsU2l6ZSArICclIC0gJyArICh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSArICdweCknO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRQYW5lbEVsZW1lbnQuc3R5bGUuZmxleEJhc2lzID0gJ2NhbGMoJyArIG5ld05leHRQYW5lbFNpemUgKyAnJSAtICcgKyAodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUgKyAncHgpJztcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWxTaXplc1t0aGlzLnByZXZQYW5lbEluZGV4XSA9IG5ld1ByZXZQYW5lbFNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXNbdGhpcy5wcmV2UGFuZWxJbmRleCArIDFdID0gbmV3TmV4dFBhbmVsU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplRW5kKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uUmVzaXplRW5kLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgc2l6ZXM6IHRoaXMuX3BhbmVsU2l6ZXMgfSk7XHJcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmd1dHRlckVsZW1lbnQsICdwLXNwbGl0dGVyLWd1dHRlci1yZXNpemluZycpO1xyXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3Atc3BsaXR0ZXItcmVzaXppbmcnKTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25HdXR0ZXJNb3VzZURvd24oZXZlbnQsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5yZXNpemVTdGFydChldmVudCwgaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuYmluZE1vdXNlTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25HdXR0ZXJUb3VjaFN0YXJ0KGV2ZW50LCBpbmRleCkge1xyXG4gICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3RhcnQoZXZlbnQsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kVG91Y2hMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uR3V0dGVyVG91Y2hFbmQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZUVuZChldmVudCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmRUb3VjaExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZVJlc2l6ZShuZXdQcmV2UGFuZWxTaXplLCBuZXdOZXh0UGFuZWxTaXplKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWluU2l6ZXMubGVuZ3RoID49IDEgJiYgdGhpcy5taW5TaXplc1swXSAmJiB0aGlzLm1pblNpemVzWzBdID4gbmV3UHJldlBhbmVsU2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5taW5TaXplcy5sZW5ndGggPiAxICYmIHRoaXMubWluU2l6ZXNbMV0gJiYgdGhpcy5taW5TaXplc1sxXSA+IG5ld05leHRQYW5lbFNpemUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZE1vdXNlTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudCwgJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc2l6ZShldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm1vdXNlVXBMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlVXBMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUVuZChldmVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZE1vdXNlTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kVG91Y2hMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRvdWNoTW92ZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAndG91Y2htb3ZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVzaXplKGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMudG91Y2hFbmRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAndG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplRW5kKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kVG91Y2hMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZE1vdXNlTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tb3VzZVVwTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRUb3VjaExpc3RlbmVycygpIHtcclxuICAgICAgICBpZiAodGhpcy50b3VjaE1vdmVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoTW92ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG91Y2hFbmRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy50b3VjaEVuZExpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcmV2UGFuZWxFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5leHRQYW5lbEVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJldlBhbmVsU2l6ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZXh0UGFuZWxTaXplID0gbnVsbDtcclxuICAgICAgICB0aGlzLmd1dHRlckVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJldlBhbmVsSW5kZXggPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTmVzdGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICB3aGlsZSAocGFyZW50ICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKHBhcmVudCwgJ3Atc3BsaXR0ZXInKSkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQgIT09IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc1N0YXRlZnVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlS2V5ICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RvcmFnZSgpIHtcclxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGVTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdsb2NhbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2luZG93LmxvY2FsU3RvcmFnZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzZXNzaW9uJzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aW5kb3cuc2Vzc2lvblN0b3JhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5zdGF0ZVN0b3JhZ2UgKyAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB0aGUgc3RhdGUgc3RvcmFnZSwgc3VwcG9ydGVkIHZhbHVlcyBhcmUgXCJsb2NhbFwiIGFuZCBcInNlc3Npb25cIi4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmFnZSBpcyBub3QgYSBhdmFpbGFibGUgYnkgZGVmYXVsdCBvbiB0aGUgc2VydmVyLicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzYXZlU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdG9yYWdlKCkuc2V0SXRlbSh0aGlzLnN0YXRlS2V5LCBKU09OLnN0cmluZ2lmeSh0aGlzLl9wYW5lbFNpemVzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZVN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcclxuICAgICAgICBjb25zdCBzdGF0ZVN0cmluZyA9IHN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnN0YXRlS2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHN0YXRlU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXMgPSBKU09OLnBhcnNlKHN0YXRlU3RyaW5nKTtcclxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gWy4uLnRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5dLmZpbHRlcigoY2hpbGQpID0+IERvbUhhbmRsZXIuaGFzQ2xhc3MoY2hpbGQsICdwLXNwbGl0dGVyLXBhbmVsJykpO1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuc3R5bGUuZmxleEJhc2lzID0gJ2NhbGMoJyArIHRoaXMuX3BhbmVsU2l6ZXNbaV0gKyAnJSAtICcgKyAodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUgKyAncHgpJztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb250YWluZXJDbGFzcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAncC1zcGxpdHRlciBwLWNvbXBvbmVudCc6IHRydWUsXHJcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLWhvcml6b250YWwnOiB0aGlzLmxheW91dCA9PT0gJ2hvcml6b250YWwnLFxyXG4gICAgICAgICAgICAncC1zcGxpdHRlci12ZXJ0aWNhbCc6IHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwYW5lbENvbnRhaW5lckNsYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLXBhbmVsJzogdHJ1ZSxcclxuICAgICAgICAgICAgJ3Atc3BsaXR0ZXItcGFuZWwtbmVzdGVkJzogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ3V0dGVyU3R5bGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKSByZXR1cm4geyB3aWR0aDogdGhpcy5ndXR0ZXJTaXplICsgJ3B4JyB9O1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIHsgaGVpZ2h0OiB0aGlzLmd1dHRlclNpemUgKyAncHgnIH07XHJcbiAgICB9XHJcblxyXG4gICAgaG9yaXpvbnRhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJztcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1NwbGl0dGVyLCBTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbU3BsaXR0ZXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGxpdHRlck1vZHVsZSB7fVxyXG4iXX0=