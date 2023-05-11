import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { ObjectUtils, ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
export const OVERLAY_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Overlay),
    multi: true
};
const showOverlayContentAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{showTransitionParams}}')]);
const hideOverlayContentAnimation = animation([animate('{{hideTransitionParams}}', style({ transform: '{{transform}}', opacity: 0 }))]);
export class Overlay {
    constructor(document, platformId, el, renderer, config, overlayService, zone) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.config = config;
        this.overlayService = overlayService;
        this.zone = zone;
        this.visibleChange = new EventEmitter();
        this.onBeforeShow = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onBeforeHide = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onAnimationStart = new EventEmitter();
        this.onAnimationDone = new EventEmitter();
        this._visible = false;
        this.modalVisible = false;
        this.isOverlayClicked = false;
        this.isOverlayContentClicked = false;
        this.transformOptions = {
            default: 'scaleY(0.8)',
            center: 'scale(0.7)',
            top: 'translate3d(0px, -100%, 0px)',
            'top-start': 'translate3d(0px, -100%, 0px)',
            'top-end': 'translate3d(0px, -100%, 0px)',
            bottom: 'translate3d(0px, 100%, 0px)',
            'bottom-start': 'translate3d(0px, 100%, 0px)',
            'bottom-end': 'translate3d(0px, 100%, 0px)',
            left: 'translate3d(-100%, 0px, 0px)',
            'left-start': 'translate3d(-100%, 0px, 0px)',
            'left-end': 'translate3d(-100%, 0px, 0px)',
            right: 'translate3d(100%, 0px, 0px)',
            'right-start': 'translate3d(100%, 0px, 0px)',
            'right-end': 'translate3d(100%, 0px, 0px)'
        };
        this.window = this.document.defaultView;
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible && !this.modalVisible) {
            this.modalVisible = true;
        }
    }
    get mode() {
        return this._mode || this.overlayOptions?.mode;
    }
    set mode(value) {
        this._mode = value;
    }
    get style() {
        return ObjectUtils.merge(this._style, this.modal ? this.overlayResponsiveOptions?.style : this.overlayOptions?.style);
    }
    set style(value) {
        this._style = value;
    }
    get styleClass() {
        return ObjectUtils.merge(this._styleClass, this.modal ? this.overlayResponsiveOptions?.styleClass : this.overlayOptions?.styleClass);
    }
    set styleClass(value) {
        this._styleClass = value;
    }
    get contentStyle() {
        return ObjectUtils.merge(this._contentStyle, this.modal ? this.overlayResponsiveOptions?.contentStyle : this.overlayOptions?.contentStyle);
    }
    set contentStyle(value) {
        this._contentStyle = value;
    }
    get contentStyleClass() {
        return ObjectUtils.merge(this._contentStyleClass, this.modal ? this.overlayResponsiveOptions?.contentStyleClass : this.overlayOptions?.contentStyleClass);
    }
    set contentStyleClass(value) {
        this._contentStyleClass = value;
    }
    get target() {
        const value = this._target || this.overlayOptions?.target;
        return value === undefined ? '@prev' : value;
    }
    set target(value) {
        this._target = value;
    }
    get appendTo() {
        return this._appendTo || this.overlayOptions?.appendTo;
    }
    set appendTo(value) {
        this._appendTo = value;
    }
    get autoZIndex() {
        const value = this._autoZIndex || this.overlayOptions?.autoZIndex;
        return value === undefined ? true : value;
    }
    set autoZIndex(value) {
        this._autoZIndex = value;
    }
    get baseZIndex() {
        const value = this._baseZIndex || this.overlayOptions?.baseZIndex;
        return value === undefined ? 0 : value;
    }
    set baseZIndex(value) {
        this._baseZIndex = value;
    }
    get showTransitionOptions() {
        const value = this._showTransitionOptions || this.overlayOptions?.showTransitionOptions;
        return value === undefined ? '.12s cubic-bezier(0, 0, 0.2, 1)' : value;
    }
    set showTransitionOptions(value) {
        this._showTransitionOptions = value;
    }
    get hideTransitionOptions() {
        const value = this._hideTransitionOptions || this.overlayOptions?.hideTransitionOptions;
        return value === undefined ? '.1s linear' : value;
    }
    set hideTransitionOptions(value) {
        this._hideTransitionOptions = value;
    }
    get listener() {
        return this._listener || this.overlayOptions?.listener;
    }
    set listener(value) {
        this._listener = value;
    }
    get responsive() {
        return this._responsive || this.overlayOptions?.responsive;
    }
    set responsive(val) {
        this._responsive = val;
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
    }
    get modal() {
        if (isPlatformBrowser(this.platformId)) {
            return this.mode === 'modal' || (this.overlayResponsiveOptions && this.window?.matchMedia(this.overlayResponsiveOptions.media?.replace('@media', '') || `(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches);
        }
    }
    get overlayMode() {
        return this.mode || (this.modal ? 'modal' : 'overlay');
    }
    get overlayOptions() {
        return { ...this.config?.overlayOptions, ...this.options }; // TODO: Improve performance
    }
    get overlayResponsiveOptions() {
        return { ...this.overlayOptions?.responsive, ...this.responsive }; // TODO: Improve performance
    }
    get overlayResponsiveDirection() {
        return this.overlayResponsiveOptions?.direction || 'center';
    }
    get overlayEl() {
        return this.overlayViewChild?.nativeElement;
    }
    get contentEl() {
        return this.contentViewChild?.nativeElement;
    }
    get targetEl() {
        return DomHandler.getTargetElement(this.target, this.el?.nativeElement);
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                // TODO: new template types may be added.
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    show(overlay, isFocus = false) {
        this.onVisibleChange(true);
        this.handleEvents('onShow', { overlay: overlay || this.overlayEl, target: this.targetEl, mode: this.overlayMode });
        isFocus && DomHandler.focus(this.targetEl);
        this.modal && DomHandler.addClass(this.document?.body, 'p-overflow-hidden');
    }
    hide(overlay, isFocus = false) {
        if (!this.visible) {
            return;
        }
        else {
            this.onVisibleChange(false);
            this.handleEvents('onHide', { overlay: overlay || this.overlayEl, target: this.targetEl, mode: this.overlayMode });
            isFocus && DomHandler.focus(this.targetEl);
            this.modal && DomHandler.removeClass(this.document?.body, 'p-overflow-hidden');
        }
    }
    alignOverlay() {
        !this.modal && DomHandler.alignOverlay(this.overlayEl, this.targetEl, this.appendTo);
    }
    onVisibleChange(visible) {
        this._visible = visible;
        this.visibleChange.emit(visible);
    }
    onOverlayClick(event) {
        this.isOverlayClicked = true;
    }
    onOverlayContentClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.targetEl
        });
        this.isOverlayContentClicked = true;
    }
    onOverlayContentAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.handleEvents('onBeforeShow', { overlay: this.overlayEl, target: this.targetEl, mode: this.overlayMode });
                if (this.autoZIndex) {
                    ZIndexUtils.set(this.overlayMode, this.overlayEl, this.baseZIndex + this.config?.zIndex[this.overlayMode]);
                }
                DomHandler.appendOverlay(this.overlayEl, this.appendTo === 'body' ? this.document.body : this.appendTo, this.appendTo);
                this.alignOverlay();
                break;
            case 'void':
                this.handleEvents('onBeforeHide', { overlay: this.overlayEl, target: this.targetEl, mode: this.overlayMode });
                this.modal && DomHandler.addClass(this.overlayEl, 'p-component-overlay-leave');
                break;
        }
        this.handleEvents('onAnimationStart', event);
    }
    onOverlayContentAnimationDone(event) {
        const container = this.overlayEl || event.element.parentElement;
        switch (event.toState) {
            case 'visible':
                this.show(container, true);
                this.bindListeners();
                break;
            case 'void':
                this.hide(container, true);
                this.unbindListeners();
                DomHandler.appendOverlay(this.overlayEl, this.targetEl, this.appendTo);
                ZIndexUtils.clear(container);
                this.modalVisible = false;
                break;
        }
        this.handleEvents('onAnimationDone', event);
    }
    handleEvents(name, params) {
        this[name].emit(params);
        this.options && this.options[name] && this.options[name](params);
        this.config?.overlayOptions && (this.config?.overlayOptions)[name] && (this.config?.overlayOptions)[name](params);
    }
    bindListeners() {
        this.bindScrollListener();
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindDocumentKeyboardListener();
    }
    unbindListeners() {
        this.unbindScrollListener();
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindDocumentKeyboardListener();
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.targetEl, (event) => {
                const valid = this.listener ? this.listener(event, { type: 'scroll', mode: this.overlayMode, valid: true }) : true;
                valid && this.hide(event, true);
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                const isTargetClicked = this.targetEl && (this.targetEl.isSameNode(event.target) || (!this.isOverlayClicked && this.targetEl.contains(event.target)));
                const isOutsideClicked = !isTargetClicked && !this.isOverlayContentClicked;
                const valid = this.listener ? this.listener(event, { type: 'outside', mode: this.overlayMode, valid: event.which !== 3 && isOutsideClicked }) : isOutsideClicked;
                valid && this.hide(event);
                this.isOverlayClicked = this.isOverlayContentClicked = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', (event) => {
                const valid = this.listener ? this.listener(event, { type: 'resize', mode: this.overlayMode, valid: !DomHandler.isTouchDevice() }) : !DomHandler.isTouchDevice();
                valid && this.hide(event, true);
            });
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    bindDocumentKeyboardListener() {
        if (this.documentKeyboardListener) {
            return;
        }
        this.zone.runOutsideAngular(() => {
            this.documentKeyboardListener = this.renderer.listen(this.window, 'keydown', (event) => {
                if (!this.overlayOptions.hideOnEscape || event.keyCode !== 27) {
                    return;
                }
                const valid = this.listener ? this.listener(event, { type: 'keydown', mode: this.overlayMode, valid: !DomHandler.isTouchDevice() }) : !DomHandler.isTouchDevice();
                if (valid) {
                    this.zone.run(() => {
                        this.hide(event, true);
                    });
                }
            });
        });
    }
    unbindDocumentKeyboardListener() {
        if (this.documentKeyboardListener) {
            this.documentKeyboardListener();
            this.documentKeyboardListener = null;
        }
    }
    ngOnDestroy() {
        this.hide(this.overlayEl, true);
        if (this.overlayEl) {
            DomHandler.appendOverlay(this.overlayEl, this.targetEl, this.appendTo);
            ZIndexUtils.clear(this.overlayEl);
        }
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        this.unbindListeners();
    }
}
Overlay.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Overlay, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
Overlay.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: Overlay, selector: "p-overlay", inputs: { visible: "visible", mode: "mode", style: "style", styleClass: "styleClass", contentStyle: "contentStyle", contentStyleClass: "contentStyleClass", target: "target", appendTo: "appendTo", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", listener: "listener", responsive: "responsive", options: "options" }, outputs: { visibleChange: "visibleChange", onBeforeShow: "onBeforeShow", onShow: "onShow", onBeforeHide: "onBeforeHide", onHide: "onHide", onAnimationStart: "onAnimationStart", onAnimationDone: "onAnimationDone" }, host: { classAttribute: "p-element" }, providers: [OVERLAY_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "overlayViewChild", first: true, predicate: ["overlay"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: `
        <div
            *ngIf="modalVisible"
            #overlay
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-overlay p-component': true,
                'p-overlay-modal p-component-overlay p-component-overlay-enter': modal,
                'p-overlay-center': modal && overlayResponsiveDirection === 'center',
                'p-overlay-top': modal && overlayResponsiveDirection === 'top',
                'p-overlay-top-start': modal && overlayResponsiveDirection === 'top-start',
                'p-overlay-top-end': modal && overlayResponsiveDirection === 'top-end',
                'p-overlay-bottom': modal && overlayResponsiveDirection === 'bottom',
                'p-overlay-bottom-start': modal && overlayResponsiveDirection === 'bottom-start',
                'p-overlay-bottom-end': modal && overlayResponsiveDirection === 'bottom-end',
                'p-overlay-left': modal && overlayResponsiveDirection === 'left',
                'p-overlay-left-start': modal && overlayResponsiveDirection === 'left-start',
                'p-overlay-left-end': modal && overlayResponsiveDirection === 'left-end',
                'p-overlay-right': modal && overlayResponsiveDirection === 'right',
                'p-overlay-right-start': modal && overlayResponsiveDirection === 'right-start',
                'p-overlay-right-end': modal && overlayResponsiveDirection === 'right-end'
            }"
            (click)="onOverlayClick($event)"
        >
            <div
                *ngIf="visible"
                #content
                [ngStyle]="contentStyle"
                [class]="contentStyleClass"
                [ngClass]="'p-overlay-content'"
                (click)="onOverlayContentClick($event)"
                [@overlayContentAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions, transform: transformOptions[modal ? overlayResponsiveDirection : 'default'] } }"
                (@overlayContentAnimation.start)="onOverlayContentAnimationStart($event)"
                (@overlayContentAnimation.done)="onOverlayContentAnimationDone($event)"
            >
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: { mode: overlayMode } }"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: [".p-overlay{position:absolute;top:0;left:0}.p-overlay-modal{display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100%;height:100%}.p-overlay-content{transform-origin:inherit}.p-overlay-modal>.p-overlay-content{z-index:1;width:90%}.p-overlay-top{align-items:flex-start}.p-overlay-top-start{align-items:flex-start;justify-content:flex-start}.p-overlay-top-end{align-items:flex-start;justify-content:flex-end}.p-overlay-bottom{align-items:flex-end}.p-overlay-bottom-start{align-items:flex-end;justify-content:flex-start}.p-overlay-bottom-end{align-items:flex-end;justify-content:flex-end}.p-overlay-left{justify-content:flex-start}.p-overlay-left-start{justify-content:flex-start;align-items:flex-start}.p-overlay-left-end{justify-content:flex-start;align-items:flex-end}.p-overlay-right{justify-content:flex-end}.p-overlay-right-start{justify-content:flex-end;align-items:flex-start}.p-overlay-right-end{justify-content:flex-end;align-items:flex-end}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [trigger('overlayContentAnimation', [transition(':enter', [useAnimation(showOverlayContentAnimation)]), transition(':leave', [useAnimation(hideOverlayContentAnimation)])])], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Overlay, decorators: [{
            type: Component,
            args: [{ selector: 'p-overlay', template: `
        <div
            *ngIf="modalVisible"
            #overlay
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-overlay p-component': true,
                'p-overlay-modal p-component-overlay p-component-overlay-enter': modal,
                'p-overlay-center': modal && overlayResponsiveDirection === 'center',
                'p-overlay-top': modal && overlayResponsiveDirection === 'top',
                'p-overlay-top-start': modal && overlayResponsiveDirection === 'top-start',
                'p-overlay-top-end': modal && overlayResponsiveDirection === 'top-end',
                'p-overlay-bottom': modal && overlayResponsiveDirection === 'bottom',
                'p-overlay-bottom-start': modal && overlayResponsiveDirection === 'bottom-start',
                'p-overlay-bottom-end': modal && overlayResponsiveDirection === 'bottom-end',
                'p-overlay-left': modal && overlayResponsiveDirection === 'left',
                'p-overlay-left-start': modal && overlayResponsiveDirection === 'left-start',
                'p-overlay-left-end': modal && overlayResponsiveDirection === 'left-end',
                'p-overlay-right': modal && overlayResponsiveDirection === 'right',
                'p-overlay-right-start': modal && overlayResponsiveDirection === 'right-start',
                'p-overlay-right-end': modal && overlayResponsiveDirection === 'right-end'
            }"
            (click)="onOverlayClick($event)"
        >
            <div
                *ngIf="visible"
                #content
                [ngStyle]="contentStyle"
                [class]="contentStyleClass"
                [ngClass]="'p-overlay-content'"
                (click)="onOverlayContentClick($event)"
                [@overlayContentAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions, transform: transformOptions[modal ? overlayResponsiveDirection : 'default'] } }"
                (@overlayContentAnimation.start)="onOverlayContentAnimationStart($event)"
                (@overlayContentAnimation.done)="onOverlayContentAnimationDone($event)"
            >
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: { mode: overlayMode } }"></ng-container>
            </div>
        </div>
    `, animations: [trigger('overlayContentAnimation', [transition(':enter', [useAnimation(showOverlayContentAnimation)]), transition(':leave', [useAnimation(hideOverlayContentAnimation)])])], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [OVERLAY_VALUE_ACCESSOR], host: {
                        class: 'p-element'
                    }, styles: [".p-overlay{position:absolute;top:0;left:0}.p-overlay-modal{display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100%;height:100%}.p-overlay-content{transform-origin:inherit}.p-overlay-modal>.p-overlay-content{z-index:1;width:90%}.p-overlay-top{align-items:flex-start}.p-overlay-top-start{align-items:flex-start;justify-content:flex-start}.p-overlay-top-end{align-items:flex-start;justify-content:flex-end}.p-overlay-bottom{align-items:flex-end}.p-overlay-bottom-start{align-items:flex-end;justify-content:flex-start}.p-overlay-bottom-end{align-items:flex-end;justify-content:flex-end}.p-overlay-left{justify-content:flex-start}.p-overlay-left-start{justify-content:flex-start;align-items:flex-start}.p-overlay-left-end{justify-content:flex-start;align-items:flex-end}.p-overlay-right{justify-content:flex-end}.p-overlay-right-start{justify-content:flex-end;align-items:flex-start}.p-overlay-right-end{justify-content:flex-end;align-items:flex-end}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }, { type: i0.NgZone }]; }, propDecorators: { visible: [{
                type: Input
            }], mode: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], contentStyle: [{
                type: Input
            }], contentStyleClass: [{
                type: Input
            }], target: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], listener: [{
                type: Input
            }], responsive: [{
                type: Input
            }], options: [{
                type: Input
            }], visibleChange: [{
                type: Output
            }], onBeforeShow: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onBeforeHide: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onAnimationStart: [{
                type: Output
            }], onAnimationDone: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], overlayViewChild: [{
                type: ViewChild,
                args: ['overlay']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }] } });
export class OverlayModule {
}
OverlayModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OverlayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OverlayModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: OverlayModule, declarations: [Overlay], imports: [CommonModule, SharedModule], exports: [Overlay, SharedModule] });
OverlayModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OverlayModule, imports: [CommonModule, SharedModule, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OverlayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule],
                    exports: [Overlay, SharedModule],
                    declarations: [Overlay]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQWtCLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ILE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUUsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBR1IsTUFBTSxFQUNOLFdBQVcsRUFJWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBa0UsYUFBYSxFQUE0QixZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEosT0FBTyxFQUFFLDZCQUE2QixFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUV6RCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBUTtJQUN2QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3RDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGLE1BQU0sMkJBQTJCLEdBQUcsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENB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dHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgdXNlQW5pbWF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbnRlbnRDaGlsZHJlbixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBmb3J3YXJkUmVmLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBOZ01vZHVsZSxcclxuICAgIE5nWm9uZSxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE91dHB1dCxcclxuICAgIFBMQVRGT1JNX0lELFxyXG4gICAgUXVlcnlMaXN0LFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgVGVtcGxhdGVSZWYsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT3ZlcmxheU1vZGVUeXBlLCBPdmVybGF5T3B0aW9ucywgT3ZlcmxheVNlcnZpY2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFJlc3BvbnNpdmVPdmVybGF5T3B0aW9ucywgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciwgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFpJbmRleFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XHJcblxyXG5leHBvcnQgY29uc3QgT1ZFUkxBWV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPdmVybGF5KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBzaG93T3ZlcmxheUNvbnRlbnRBbmltYXRpb24gPSBhbmltYXRpb24oW3N0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXSk7XHJcblxyXG5jb25zdCBoaWRlT3ZlcmxheUNvbnRlbnRBbmltYXRpb24gPSBhbmltYXRpb24oW2FuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSkpXSk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1vdmVybGF5JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAqbmdJZj1cIm1vZGFsVmlzaWJsZVwiXHJcbiAgICAgICAgICAgICNvdmVybGF5XHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcclxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7XHJcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5IHAtY29tcG9uZW50JzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktbW9kYWwgcC1jb21wb25lbnQtb3ZlcmxheSBwLWNvbXBvbmVudC1vdmVybGF5LWVudGVyJzogbW9kYWwsXHJcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5LWNlbnRlcic6IG1vZGFsICYmIG92ZXJsYXlSZXNwb25zaXZlRGlyZWN0aW9uID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktdG9wJzogbW9kYWwgJiYgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gPT09ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgJ3Atb3ZlcmxheS10b3Atc3RhcnQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ3RvcC1zdGFydCcsXHJcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5LXRvcC1lbmQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ3RvcC1lbmQnLFxyXG4gICAgICAgICAgICAgICAgJ3Atb3ZlcmxheS1ib3R0b20nOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ2JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5LWJvdHRvbS1zdGFydCc6IG1vZGFsICYmIG92ZXJsYXlSZXNwb25zaXZlRGlyZWN0aW9uID09PSAnYm90dG9tLXN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktYm90dG9tLWVuZCc6IG1vZGFsICYmIG92ZXJsYXlSZXNwb25zaXZlRGlyZWN0aW9uID09PSAnYm90dG9tLWVuZCcsXHJcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5LWxlZnQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3Atb3ZlcmxheS1sZWZ0LXN0YXJ0JzogbW9kYWwgJiYgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gPT09ICdsZWZ0LXN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktbGVmdC1lbmQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ2xlZnQtZW5kJyxcclxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktcmlnaHQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktcmlnaHQtc3RhcnQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ3JpZ2h0LXN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktcmlnaHQtZW5kJzogbW9kYWwgJiYgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gPT09ICdyaWdodC1lbmQnXHJcbiAgICAgICAgICAgIH1cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25PdmVybGF5Q2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAqbmdJZj1cInZpc2libGVcIlxyXG4gICAgICAgICAgICAgICAgI2NvbnRlbnRcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImNvbnRlbnRTdHlsZVwiXHJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwiY29udGVudFN0eWxlQ2xhc3NcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3Atb3ZlcmxheS1jb250ZW50J1wiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25PdmVybGF5Q29udGVudENsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgW0BvdmVybGF5Q29udGVudEFuaW1hdGlvbl09XCJ7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyBzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zLCB0cmFuc2Zvcm06IHRyYW5zZm9ybU9wdGlvbnNbbW9kYWwgPyBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA6ICdkZWZhdWx0J10gfSB9XCJcclxuICAgICAgICAgICAgICAgIChAb3ZlcmxheUNvbnRlbnRBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5Q29udGVudEFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgKEBvdmVybGF5Q29udGVudEFuaW1hdGlvbi5kb25lKT1cIm9uT3ZlcmxheUNvbnRlbnRBbmltYXRpb25Eb25lKCRldmVudClcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogeyBtb2RlOiBvdmVybGF5TW9kZSB9IH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW3RyaWdnZXIoJ292ZXJsYXlDb250ZW50QW5pbWF0aW9uJywgW3RyYW5zaXRpb24oJzplbnRlcicsIFt1c2VBbmltYXRpb24oc2hvd092ZXJsYXlDb250ZW50QW5pbWF0aW9uKV0pLCB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbdXNlQW5pbWF0aW9uKGhpZGVPdmVybGF5Q29udGVudEFuaW1hdGlvbildKV0pXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICAgIHByb3ZpZGVyczogW09WRVJMQVlfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vb3ZlcmxheS5jc3MnXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIE92ZXJsYXkgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgQElucHV0KCkgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XHJcbiAgICB9XHJcbiAgICBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUgJiYgIXRoaXMubW9kYWxWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kYWxWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IG1vZGUoKTogT3ZlcmxheU1vZGVUeXBlIHwgc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZSB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5tb2RlO1xyXG4gICAgfVxyXG4gICAgc2V0IG1vZGUodmFsdWU6IE92ZXJsYXlNb2RlVHlwZSB8IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgc3R5bGUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5fc3R5bGUsIHRoaXMubW9kYWwgPyB0aGlzLm92ZXJsYXlSZXNwb25zaXZlT3B0aW9ucz8uc3R5bGUgOiB0aGlzLm92ZXJsYXlPcHRpb25zPy5zdHlsZSk7XHJcbiAgICB9XHJcbiAgICBzZXQgc3R5bGUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3N0eWxlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHN0eWxlQ2xhc3MoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5fc3R5bGVDbGFzcywgdGhpcy5tb2RhbCA/IHRoaXMub3ZlcmxheVJlc3BvbnNpdmVPcHRpb25zPy5zdHlsZUNsYXNzIDogdGhpcy5vdmVybGF5T3B0aW9ucz8uc3R5bGVDbGFzcyk7XHJcbiAgICB9XHJcbiAgICBzZXQgc3R5bGVDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fc3R5bGVDbGFzcyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBjb250ZW50U3R5bGUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5fY29udGVudFN0eWxlLCB0aGlzLm1vZGFsID8gdGhpcy5vdmVybGF5UmVzcG9uc2l2ZU9wdGlvbnM/LmNvbnRlbnRTdHlsZSA6IHRoaXMub3ZlcmxheU9wdGlvbnM/LmNvbnRlbnRTdHlsZSk7XHJcbiAgICB9XHJcbiAgICBzZXQgY29udGVudFN0eWxlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb250ZW50U3R5bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgY29udGVudFN0eWxlQ2xhc3MoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5fY29udGVudFN0eWxlQ2xhc3MsIHRoaXMubW9kYWwgPyB0aGlzLm92ZXJsYXlSZXNwb25zaXZlT3B0aW9ucz8uY29udGVudFN0eWxlQ2xhc3MgOiB0aGlzLm92ZXJsYXlPcHRpb25zPy5jb250ZW50U3R5bGVDbGFzcyk7XHJcbiAgICB9XHJcbiAgICBzZXQgY29udGVudFN0eWxlQ2xhc3ModmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnRTdHlsZUNsYXNzID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHRhcmdldCgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fdGFyZ2V0IHx8IHRoaXMub3ZlcmxheU9wdGlvbnM/LnRhcmdldDtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/ICdAcHJldicgOiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCB0YXJnZXQodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBhcHBlbmRUbygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBlbmRUbyB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5hcHBlbmRUbztcclxuICAgIH1cclxuICAgIHNldCBhcHBlbmRUbyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fYXBwZW5kVG8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgYXV0b1pJbmRleCgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2F1dG9aSW5kZXggfHwgdGhpcy5vdmVybGF5T3B0aW9ucz8uYXV0b1pJbmRleDtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBhdXRvWkluZGV4KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fYXV0b1pJbmRleCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBiYXNlWkluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9iYXNlWkluZGV4IHx8IHRoaXMub3ZlcmxheU9wdGlvbnM/LmJhc2VaSW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyAwIDogdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgYmFzZVpJbmRleCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmFzZVpJbmRleCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBzaG93VHJhbnNpdGlvbk9wdGlvbnMoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3Nob3dUcmFuc2l0aW9uT3B0aW9ucyB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5zaG93VHJhbnNpdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyAnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScgOiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBzaG93VHJhbnNpdGlvbk9wdGlvbnModmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3Nob3dUcmFuc2l0aW9uT3B0aW9ucyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBoaWRlVHJhbnNpdGlvbk9wdGlvbnMoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2hpZGVUcmFuc2l0aW9uT3B0aW9ucyB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5oaWRlVHJhbnNpdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyAnLjFzIGxpbmVhcicgOiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBoaWRlVHJhbnNpdGlvbk9wdGlvbnModmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2hpZGVUcmFuc2l0aW9uT3B0aW9ucyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBsaXN0ZW5lcigpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lciB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5saXN0ZW5lcjtcclxuICAgIH1cclxuICAgIHNldCBsaXN0ZW5lcih2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgcmVzcG9uc2l2ZSgpOiBSZXNwb25zaXZlT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zaXZlIHx8IHRoaXMub3ZlcmxheU9wdGlvbnM/LnJlc3BvbnNpdmU7XHJcbiAgICB9XHJcbiAgICBzZXQgcmVzcG9uc2l2ZSh2YWw6IFJlc3BvbnNpdmVPdmVybGF5T3B0aW9ucyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3Jlc3BvbnNpdmUgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IG9wdGlvbnMoKTogT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gICAgfVxyXG4gICAgc2V0IG9wdGlvbnModmFsOiBPdmVybGF5T3B0aW9ucyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkJlZm9yZVNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkJlZm9yZUhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkFuaW1hdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25BbmltYXRpb25Eb25lOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT4gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnb3ZlcmxheScpIG92ZXJsYXlWaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIF92aXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX21vZGU6IE92ZXJsYXlNb2RlVHlwZSB8IHN0cmluZztcclxuXHJcbiAgICBfc3R5bGU6IGFueTtcclxuXHJcbiAgICBfc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIF9jb250ZW50U3R5bGU6IGFueTtcclxuXHJcbiAgICBfY29udGVudFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBfdGFyZ2V0OiBhbnk7XHJcblxyXG4gICAgX2FwcGVuZFRvOiAnYm9keScgfCBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBfYXV0b1pJbmRleDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBfYmFzZVpJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIF9zaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBfaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgX2xpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgX3Jlc3BvbnNpdmU6IFJlc3BvbnNpdmVPdmVybGF5T3B0aW9ucyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBfb3B0aW9uczogT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgbW9kYWxWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgaXNPdmVybGF5Q2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGlzT3ZlcmxheUNvbnRlbnRDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgc2Nyb2xsSGFuZGxlcjogYW55O1xyXG5cclxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGRvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHdpbmRvdzogV2luZG93IHwgbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgdHJhbnNmb3JtT3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgIGRlZmF1bHQ6ICdzY2FsZVkoMC44KScsXHJcbiAgICAgICAgY2VudGVyOiAnc2NhbGUoMC43KScsXHJcbiAgICAgICAgdG9wOiAndHJhbnNsYXRlM2QoMHB4LCAtMTAwJSwgMHB4KScsXHJcbiAgICAgICAgJ3RvcC1zdGFydCc6ICd0cmFuc2xhdGUzZCgwcHgsIC0xMDAlLCAwcHgpJyxcclxuICAgICAgICAndG9wLWVuZCc6ICd0cmFuc2xhdGUzZCgwcHgsIC0xMDAlLCAwcHgpJyxcclxuICAgICAgICBib3R0b206ICd0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweCknLFxyXG4gICAgICAgICdib3R0b20tc3RhcnQnOiAndHJhbnNsYXRlM2QoMHB4LCAxMDAlLCAwcHgpJyxcclxuICAgICAgICAnYm90dG9tLWVuZCc6ICd0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweCknLFxyXG4gICAgICAgIGxlZnQ6ICd0cmFuc2xhdGUzZCgtMTAwJSwgMHB4LCAwcHgpJyxcclxuICAgICAgICAnbGVmdC1zdGFydCc6ICd0cmFuc2xhdGUzZCgtMTAwJSwgMHB4LCAwcHgpJyxcclxuICAgICAgICAnbGVmdC1lbmQnOiAndHJhbnNsYXRlM2QoLTEwMCUsIDBweCwgMHB4KScsXHJcbiAgICAgICAgcmlnaHQ6ICd0cmFuc2xhdGUzZCgxMDAlLCAwcHgsIDBweCknLFxyXG4gICAgICAgICdyaWdodC1zdGFydCc6ICd0cmFuc2xhdGUzZCgxMDAlLCAwcHgsIDBweCknLFxyXG4gICAgICAgICdyaWdodC1lbmQnOiAndHJhbnNsYXRlM2QoMTAwJSwgMHB4LCAwcHgpJ1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXQgbW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gJ21vZGFsJyB8fCAodGhpcy5vdmVybGF5UmVzcG9uc2l2ZU9wdGlvbnMgJiYgdGhpcy53aW5kb3c/Lm1hdGNoTWVkaWEodGhpcy5vdmVybGF5UmVzcG9uc2l2ZU9wdGlvbnMubWVkaWE/LnJlcGxhY2UoJ0BtZWRpYScsICcnKSB8fCBgKG1heC13aWR0aDogJHt0aGlzLm92ZXJsYXlSZXNwb25zaXZlT3B0aW9ucy5icmVha3BvaW50fSlgKS5tYXRjaGVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG92ZXJsYXlNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGUgfHwgKHRoaXMubW9kYWwgPyAnbW9kYWwnIDogJ292ZXJsYXknKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3ZlcmxheU9wdGlvbnMoKTogT3ZlcmxheU9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7IC4uLnRoaXMuY29uZmlnPy5vdmVybGF5T3B0aW9ucywgLi4udGhpcy5vcHRpb25zIH07IC8vIFRPRE86IEltcHJvdmUgcGVyZm9ybWFuY2VcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3ZlcmxheVJlc3BvbnNpdmVPcHRpb25zKCk6IFJlc3BvbnNpdmVPdmVybGF5T3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4udGhpcy5vdmVybGF5T3B0aW9ucz8ucmVzcG9uc2l2ZSwgLi4udGhpcy5yZXNwb25zaXZlIH07IC8vIFRPRE86IEltcHJvdmUgcGVyZm9ybWFuY2VcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlc3BvbnNpdmVPcHRpb25zPy5kaXJlY3Rpb24gfHwgJ2NlbnRlcic7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG92ZXJsYXlFbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb250ZW50RWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGFyZ2V0RWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuZ2V0VGFyZ2V0RWxlbWVudCh0aGlzLnRhcmdldCwgdGhpcy5lbD8ubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXHJcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXHJcbiAgICAgICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBQcmltZU5HQ29uZmlnLFxyXG4gICAgICAgIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldztcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogbmV3IHRlbXBsYXRlIHR5cGVzIG1heSBiZSBhZGRlZC5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhvdmVybGF5PzogSFRNTEVsZW1lbnQsIGlzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMub25WaXNpYmxlQ2hhbmdlKHRydWUpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRzKCdvblNob3cnLCB7IG92ZXJsYXk6IG92ZXJsYXkgfHwgdGhpcy5vdmVybGF5RWwsIHRhcmdldDogdGhpcy50YXJnZXRFbCwgbW9kZTogdGhpcy5vdmVybGF5TW9kZSB9KTtcclxuXHJcbiAgICAgICAgaXNGb2N1cyAmJiBEb21IYW5kbGVyLmZvY3VzKHRoaXMudGFyZ2V0RWwpO1xyXG4gICAgICAgIHRoaXMubW9kYWwgJiYgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50Py5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKG92ZXJsYXk/OiBIVE1MRWxlbWVudCwgaXNGb2N1czogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25WaXNpYmxlQ2hhbmdlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoJ29uSGlkZScsIHsgb3ZlcmxheTogb3ZlcmxheSB8fCB0aGlzLm92ZXJsYXlFbCwgdGFyZ2V0OiB0aGlzLnRhcmdldEVsLCBtb2RlOiB0aGlzLm92ZXJsYXlNb2RlIH0pO1xyXG4gICAgICAgICAgICBpc0ZvY3VzICYmIERvbUhhbmRsZXIuZm9jdXModGhpcy50YXJnZXRFbCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kYWwgJiYgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50Py5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWxpZ25PdmVybGF5KCkge1xyXG4gICAgICAgICF0aGlzLm1vZGFsICYmIERvbUhhbmRsZXIuYWxpZ25PdmVybGF5KHRoaXMub3ZlcmxheUVsLCB0aGlzLnRhcmdldEVsLCB0aGlzLmFwcGVuZFRvKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZpc2libGVDaGFuZ2UodmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3ZlcmxheUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc092ZXJsYXlDbGlja2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk92ZXJsYXlDb250ZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLm92ZXJsYXlTZXJ2aWNlLmFkZCh7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0RWxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pc092ZXJsYXlDb250ZW50Q2xpY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25PdmVybGF5Q29udGVudEFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXZlbnRzKCdvbkJlZm9yZVNob3cnLCB7IG92ZXJsYXk6IHRoaXMub3ZlcmxheUVsLCB0YXJnZXQ6IHRoaXMudGFyZ2V0RWwsIG1vZGU6IHRoaXMub3ZlcmxheU1vZGUgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLnNldCh0aGlzLm92ZXJsYXlNb2RlLCB0aGlzLm92ZXJsYXlFbCwgdGhpcy5iYXNlWkluZGV4ICsgdGhpcy5jb25maWc/LnpJbmRleFt0aGlzLm92ZXJsYXlNb2RlXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRPdmVybGF5KHRoaXMub3ZlcmxheUVsLCB0aGlzLmFwcGVuZFRvID09PSAnYm9keScgPyB0aGlzLmRvY3VtZW50LmJvZHkgOiB0aGlzLmFwcGVuZFRvLCB0aGlzLmFwcGVuZFRvKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXZlbnRzKCdvbkJlZm9yZUhpZGUnLCB7IG92ZXJsYXk6IHRoaXMub3ZlcmxheUVsLCB0YXJnZXQ6IHRoaXMudGFyZ2V0RWwsIG1vZGU6IHRoaXMub3ZlcmxheU1vZGUgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbCAmJiBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMub3ZlcmxheUVsLCAncC1jb21wb25lbnQtb3ZlcmxheS1sZWF2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoJ29uQW5pbWF0aW9uU3RhcnQnLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25PdmVybGF5Q29udGVudEFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5vdmVybGF5RWwgfHwgZXZlbnQuZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coY29udGFpbmVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoY29udGFpbmVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRPdmVybGF5KHRoaXMub3ZlcmxheUVsLCB0aGlzLnRhcmdldEVsLCB0aGlzLmFwcGVuZFRvKTtcclxuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoJ29uQW5pbWF0aW9uRG9uZScsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudHMobmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xyXG4gICAgICAgICh0aGlzIGFzIGFueSlbbmFtZV0uZW1pdChwYXJhbXMpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyAmJiAodGhpcy5vcHRpb25zIGFzIGFueSlbbmFtZV0gJiYgKHRoaXMub3B0aW9ucyBhcyBhbnkpW25hbWVdKHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5jb25maWc/Lm92ZXJsYXlPcHRpb25zICYmICh0aGlzLmNvbmZpZz8ub3ZlcmxheU9wdGlvbnMgYXMgYW55KVtuYW1lXSAmJiAodGhpcy5jb25maWc/Lm92ZXJsYXlPcHRpb25zIGFzIGFueSlbbmFtZV0ocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsSGFuZGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBuZXcgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIodGhpcy50YXJnZXRFbCwgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy5saXN0ZW5lciA/IHRoaXMubGlzdGVuZXIoZXZlbnQsIHsgdHlwZTogJ3Njcm9sbCcsIG1vZGU6IHRoaXMub3ZlcmxheU1vZGUsIHZhbGlkOiB0cnVlIH0pIDogdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWxpZCAmJiB0aGlzLmhpZGUoZXZlbnQsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVGFyZ2V0Q2xpY2tlZCA9IHRoaXMudGFyZ2V0RWwgJiYgKHRoaXMudGFyZ2V0RWwuaXNTYW1lTm9kZShldmVudC50YXJnZXQpIHx8ICghdGhpcy5pc092ZXJsYXlDbGlja2VkICYmIHRoaXMudGFyZ2V0RWwuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNPdXRzaWRlQ2xpY2tlZCA9ICFpc1RhcmdldENsaWNrZWQgJiYgIXRoaXMuaXNPdmVybGF5Q29udGVudENsaWNrZWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMubGlzdGVuZXIgPyB0aGlzLmxpc3RlbmVyKGV2ZW50LCB7IHR5cGU6ICdvdXRzaWRlJywgbW9kZTogdGhpcy5vdmVybGF5TW9kZSwgdmFsaWQ6IGV2ZW50LndoaWNoICE9PSAzICYmIGlzT3V0c2lkZUNsaWNrZWQgfSkgOiBpc091dHNpZGVDbGlja2VkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbGlkICYmIHRoaXMuaGlkZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3ZlcmxheUNsaWNrZWQgPSB0aGlzLmlzT3ZlcmxheUNvbnRlbnRDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy53aW5kb3csICdyZXNpemUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy5saXN0ZW5lciA/IHRoaXMubGlzdGVuZXIoZXZlbnQsIHsgdHlwZTogJ3Jlc2l6ZScsIG1vZGU6IHRoaXMub3ZlcmxheU1vZGUsIHZhbGlkOiAhRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCkgfSkgOiAhRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsaWQgJiYgdGhpcy5oaWRlKGV2ZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEtleWJvYXJkTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWJvYXJkTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLndpbmRvdywgJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5T3B0aW9ucy5oaWRlT25Fc2NhcGUgfHwgZXZlbnQua2V5Q29kZSAhPT0gMjcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLmxpc3RlbmVyID8gdGhpcy5saXN0ZW5lcihldmVudCwgeyB0eXBlOiAna2V5ZG93bicsIG1vZGU6IHRoaXMub3ZlcmxheU1vZGUsIHZhbGlkOiAhRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCkgfSkgOiAhRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShldmVudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEtleWJvYXJkTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWJvYXJkTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWJvYXJkTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmhpZGUodGhpcy5vdmVybGF5RWwsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5RWwpIHtcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRPdmVybGF5KHRoaXMub3ZlcmxheUVsLCB0aGlzLnRhcmdldEVsLCB0aGlzLmFwcGVuZFRvKTtcclxuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5RWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51bmJpbmRMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbT3ZlcmxheSwgU2hhcmVkTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW092ZXJsYXldXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPdmVybGF5TW9kdWxlIHt9XHJcbiJdfQ==