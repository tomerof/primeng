import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, Output, EventEmitter, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
import { PlusIcon } from 'primeng/icons/plus';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/button";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
import * as i5 from "@angular/router";
export class SpeedDial {
    constructor(platformId, el, cd, document, renderer) {
        this.platformId = platformId;
        this.el = el;
        this.cd = cd;
        this.document = document;
        this.renderer = renderer;
        this.model = null;
        this.direction = 'up';
        this.transitionDelay = 30;
        this.type = 'linear';
        this.radius = 0;
        this.mask = false;
        this.disabled = false;
        this.hideOnClickOutside = true;
        this.rotateAnimation = true;
        this.onVisibleChange = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.isItemClicked = false;
        this._visible = false;
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible) {
            this.bindDocumentClickListener();
        }
        else {
            this.unbindDocumentClickListener();
        }
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.type !== 'linear') {
                const button = DomHandler.findSingle(this.container.nativeElement, '.p-speeddial-button');
                const firstItem = DomHandler.findSingle(this.list.nativeElement, '.p-speeddial-item');
                if (button && firstItem) {
                    const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                    const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
                    this.list.nativeElement.style.setProperty('--item-diff-x', `${wDiff / 2}px`);
                    this.list.nativeElement.style.setProperty('--item-diff-y', `${hDiff / 2}px`);
                }
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'button':
                    this.buttonTemplate = item.template;
                    break;
            }
        });
    }
    show() {
        this.onVisibleChange.emit(true);
        this.visibleChange.emit(true);
        this._visible = true;
        this.onShow.emit();
        this.bindDocumentClickListener();
        this.cd.markForCheck();
    }
    hide() {
        this.onVisibleChange.emit(false);
        this.visibleChange.emit(false);
        this._visible = false;
        this.onHide.emit();
        this.unbindDocumentClickListener();
        this.cd.markForCheck();
    }
    onButtonClick(event) {
        this.visible ? this.hide() : this.show();
        this.onClick.emit(event);
        this.isItemClicked = true;
    }
    onItemClick(e, item) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }
        this.hide();
        this.isItemClicked = true;
    }
    calculatePointStyle(index) {
        const type = this.type;
        if (type !== 'linear') {
            const length = this.model.length;
            const radius = this.radius || length * 20;
            if (type === 'circle') {
                const step = (2 * Math.PI) / length;
                return {
                    left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
                    top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`
                };
            }
            else if (type === 'semi-circle') {
                const direction = this.direction;
                const step = Math.PI / (length - 1);
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up') {
                    return { left: x, bottom: y };
                }
                else if (direction === 'down') {
                    return { left: x, top: y };
                }
                else if (direction === 'left') {
                    return { right: y, top: x };
                }
                else if (direction === 'right') {
                    return { left: y, top: x };
                }
            }
            else if (type === 'quarter-circle') {
                const direction = this.direction;
                const step = Math.PI / (2 * (length - 1));
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up-left') {
                    return { right: x, bottom: y };
                }
                else if (direction === 'up-right') {
                    return { left: x, bottom: y };
                }
                else if (direction === 'down-left') {
                    return { right: y, top: x };
                }
                else if (direction === 'down-right') {
                    return { left: y, top: x };
                }
            }
        }
        return {};
    }
    calculateTransitionDelay(index) {
        const length = this.model.length;
        return (this.visible ? index : length - index - 1) * this.transitionDelay;
    }
    containerClass() {
        return {
            ['p-speeddial p-component' + ` p-speeddial-${this.type}`]: true,
            [`p-speeddial-direction-${this.direction}`]: this.type !== 'circle',
            'p-speeddial-opened': this.visible,
            'p-disabled': this.disabled
        };
    }
    buttonClass() {
        return {
            'p-speeddial-button p-button-rounded': true,
            'p-speeddial-rotate': this.rotateAnimation && !this.hideIcon,
            [this.buttonClassName]: true
        };
    }
    get buttonIconClass() {
        return (!this.visible && this.showIcon) || !this.hideIcon ? this.showIcon : this.hideIcon;
    }
    getItemStyle(index) {
        const transitionDelay = this.calculateTransitionDelay(index);
        const pointStyle = this.calculatePointStyle(index);
        return {
            transitionDelay: `${transitionDelay}ms`,
            ...pointStyle
        };
    }
    isClickableRouterLink(item) {
        return item.routerLink && !this.disabled && !item.disabled;
    }
    isOutsideClicked(event) {
        return this.container && !(this.container.nativeElement.isSameNode(event.target) || this.container.nativeElement.contains(event.target) || this.isItemClicked);
    }
    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener && this.hideOnClickOutside) {
                this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    if (this.visible && this.isOutsideClicked(event)) {
                        this.hide();
                    }
                    this.isItemClicked = false;
                });
            }
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
}
SpeedDial.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SpeedDial, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
SpeedDial.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: SpeedDial, selector: "p-speedDial", inputs: { id: "id", model: "model", visible: "visible", style: "style", className: "className", direction: "direction", transitionDelay: "transitionDelay", type: "type", radius: "radius", mask: "mask", disabled: "disabled", hideOnClickOutside: "hideOnClickOutside", buttonStyle: "buttonStyle", buttonClassName: "buttonClassName", maskStyle: "maskStyle", maskClassName: "maskClassName", showIcon: "showIcon", hideIcon: "hideIcon", rotateAnimation: "rotateAnimation" }, outputs: { onVisibleChange: "onVisibleChange", visibleChange: "visibleChange", onClick: "onClick", onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }, { propertyName: "list", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <div #container [attr.id]="id" [ngClass]="containerClass()" [class]="className" [ngStyle]="style">
            <button pRipple pButton class="p-button-icon-only" [style]="buttonStyle" [icon]="buttonIconClass" [ngClass]="buttonClass()" (click)="onButtonClick($event)">
                <PlusIcon *ngIf="!showIcon && !buttonTemplate"/>
                <ng-container *ngIf="buttonTemplate">
                    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
                </ng-container>
            </button>
            <ul #list class="p-speeddial-list" role="menu">
                <li *ngFor="let item of model; let i = index" [ngStyle]="getItemStyle(i)" class="p-speeddial-item" pTooltip [tooltipOptions]="item.tooltipOptions" [ngClass]="{ 'p-hidden': item.visible === false }">
                    <a
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        pRipple
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        class="p-speeddial-action"
                        [ngClass]="{ 'p-disabled': item.disabled }"
                        role="menuitem"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        (click)="onItemClick($event, item)"
                        (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target"
                        [attr.id]="item.id"
                        [attr.tabindex]="item.disabled || readonly || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                    >
                        <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            [attr.href]="item.url || null"
                            class="p-speeddial-action"
                            role="menuitem"
                            pRipple
                            (click)="onItemClick($event, item)"
                            [ngClass]="{ 'p-disabled': item.disabled }"
                            (keydown.enter)="onItemClick($event, item, i)"
                            [attr.target]="item.target"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        >
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [ngClass]="{ 'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible }" [class]="maskClassName" [ngStyle]="maskStyle"></div>
    `, isInline: true, styles: [".p-speeddial{position:absolute;display:flex;z-index:1}.p-speeddial-list{margin:0;padding:0;list-style:none;display:flex;align-items:center;justify-content:center;transition:top 0s linear .2s;pointer-events:none}.p-speeddial-item{transform:scale(0);opacity:0;transition:transform .2s cubic-bezier(.4,0,.2,1) 0ms,opacity .8s;will-change:transform}.p-speeddial-action{display:flex;align-items:center;justify-content:center;border-radius:50%;position:relative;overflow:hidden;cursor:pointer}.p-speeddial-circle .p-speeddial-item,.p-speeddial-semi-circle .p-speeddial-item,.p-speeddial-quarter-circle .p-speeddial-item{position:absolute}.p-speeddial-rotate{transition:transform .25s cubic-bezier(.4,0,.2,1) 0ms;will-change:transform}.p-speeddial-mask{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;transition:opacity .25s cubic-bezier(.25,.8,.25,1)}.p-speeddial-mask-visible{pointer-events:none;opacity:1;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.p-speeddial-opened .p-speeddial-list{pointer-events:auto}.p-speeddial-opened .p-speeddial-item{transform:scale(1);opacity:1}.p-speeddial-opened .p-speeddial-rotate{transform:rotate(45deg)}.p-speeddial-direction-up{align-items:center;flex-direction:column-reverse}.p-speeddial-direction-up .p-speeddial-list{flex-direction:column-reverse}.p-speeddial-direction-down{align-items:center;flex-direction:column}.p-speeddial-direction-down .p-speeddial-list{flex-direction:column}.p-speeddial-direction-left{justify-content:center;flex-direction:row-reverse}.p-speeddial-direction-left .p-speeddial-list{flex-direction:row-reverse}.p-speeddial-direction-right{justify-content:center;flex-direction:row}.p-speeddial-direction-right .p-speeddial-list{flex-direction:row}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.ButtonDirective; }), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Ripple; }), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(function () { return i4.Tooltip; }), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "directive", type: i0.forwardRef(function () { return i5.RouterLink; }), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i0.forwardRef(function () { return PlusIcon; }), selector: "PlusIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SpeedDial, decorators: [{
            type: Component,
            args: [{ selector: 'p-speedDial', template: `
        <div #container [attr.id]="id" [ngClass]="containerClass()" [class]="className" [ngStyle]="style">
            <button pRipple pButton class="p-button-icon-only" [style]="buttonStyle" [icon]="buttonIconClass" [ngClass]="buttonClass()" (click)="onButtonClick($event)">
                <PlusIcon *ngIf="!showIcon && !buttonTemplate"/>
                <ng-container *ngIf="buttonTemplate">
                    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
                </ng-container>
            </button>
            <ul #list class="p-speeddial-list" role="menu">
                <li *ngFor="let item of model; let i = index" [ngStyle]="getItemStyle(i)" class="p-speeddial-item" pTooltip [tooltipOptions]="item.tooltipOptions" [ngClass]="{ 'p-hidden': item.visible === false }">
                    <a
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        pRipple
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        class="p-speeddial-action"
                        [ngClass]="{ 'p-disabled': item.disabled }"
                        role="menuitem"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        (click)="onItemClick($event, item)"
                        (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target"
                        [attr.id]="item.id"
                        [attr.tabindex]="item.disabled || readonly || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                    >
                        <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            [attr.href]="item.url || null"
                            class="p-speeddial-action"
                            role="menuitem"
                            pRipple
                            (click)="onItemClick($event, item)"
                            [ngClass]="{ 'p-disabled': item.disabled }"
                            (keydown.enter)="onItemClick($event, item, i)"
                            [attr.target]="item.target"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        >
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [ngClass]="{ 'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible }" [class]="maskClassName" [ngStyle]="maskStyle"></div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-speeddial{position:absolute;display:flex;z-index:1}.p-speeddial-list{margin:0;padding:0;list-style:none;display:flex;align-items:center;justify-content:center;transition:top 0s linear .2s;pointer-events:none}.p-speeddial-item{transform:scale(0);opacity:0;transition:transform .2s cubic-bezier(.4,0,.2,1) 0ms,opacity .8s;will-change:transform}.p-speeddial-action{display:flex;align-items:center;justify-content:center;border-radius:50%;position:relative;overflow:hidden;cursor:pointer}.p-speeddial-circle .p-speeddial-item,.p-speeddial-semi-circle .p-speeddial-item,.p-speeddial-quarter-circle .p-speeddial-item{position:absolute}.p-speeddial-rotate{transition:transform .25s cubic-bezier(.4,0,.2,1) 0ms;will-change:transform}.p-speeddial-mask{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;transition:opacity .25s cubic-bezier(.25,.8,.25,1)}.p-speeddial-mask-visible{pointer-events:none;opacity:1;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.p-speeddial-opened .p-speeddial-list{pointer-events:auto}.p-speeddial-opened .p-speeddial-item{transform:scale(1);opacity:1}.p-speeddial-opened .p-speeddial-rotate{transform:rotate(45deg)}.p-speeddial-direction-up{align-items:center;flex-direction:column-reverse}.p-speeddial-direction-up .p-speeddial-list{flex-direction:column-reverse}.p-speeddial-direction-down{align-items:center;flex-direction:column}.p-speeddial-direction-down .p-speeddial-list{flex-direction:column}.p-speeddial-direction-left{justify-content:center;flex-direction:row-reverse}.p-speeddial-direction-left .p-speeddial-list{flex-direction:row-reverse}.p-speeddial-direction-right{justify-content:center;flex-direction:row}.p-speeddial-direction-right .p-speeddial-list{flex-direction:row}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2 }]; }, propDecorators: { id: [{
                type: Input
            }], model: [{
                type: Input
            }], visible: [{
                type: Input
            }], style: [{
                type: Input
            }], className: [{
                type: Input
            }], direction: [{
                type: Input
            }], transitionDelay: [{
                type: Input
            }], type: [{
                type: Input
            }], radius: [{
                type: Input
            }], mask: [{
                type: Input
            }], disabled: [{
                type: Input
            }], hideOnClickOutside: [{
                type: Input
            }], buttonStyle: [{
                type: Input
            }], buttonClassName: [{
                type: Input
            }], maskStyle: [{
                type: Input
            }], maskClassName: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], hideIcon: [{
                type: Input
            }], rotateAnimation: [{
                type: Input
            }], onVisibleChange: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], onClick: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], container: [{
                type: ViewChild,
                args: ['container']
            }], list: [{
                type: ViewChild,
                args: ['list']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class SpeedDialModule {
}
SpeedDialModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SpeedDialModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SpeedDialModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: SpeedDialModule, declarations: [SpeedDial], imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule, PlusIcon], exports: [SpeedDial, SharedModule, ButtonModule, TooltipModule, RouterModule] });
SpeedDialModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SpeedDialModule, imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule, PlusIcon, SharedModule, ButtonModule, TooltipModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SpeedDialModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule, PlusIcon],
                    exports: [SpeedDial, SharedModule, ButtonModule, TooltipModule, RouterModule],
                    declarations: [SpeedDial]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWRkaWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NwZWVkZGlhbC9zcGVlZGRpYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFFBQVEsRUFDUixTQUFTLEVBQ1QsS0FBSyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFHakIsZUFBZSxFQUVmLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUdULE1BQU0sRUFFTixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBWSxNQUFNLGFBQWEsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7QUFpRTlDLE1BQU0sT0FBTyxTQUFTO0lBMEVsQixZQUF5QyxVQUFlLEVBQVUsRUFBYyxFQUFTLEVBQXFCLEVBQTRCLFFBQWtCLEVBQVUsUUFBbUI7UUFBaEosZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXZFaEwsVUFBSyxHQUFVLElBQUksQ0FB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ZW50IjpbImltcG9ydCB7XHJcbiAgICBOZ01vZHVsZSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgICBUZW1wbGF0ZVJlZixcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgICBRdWVyeUxpc3QsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICBJbmplY3QsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcclxuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xyXG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcclxuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUGx1c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3BsdXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Atc3BlZWREaWFsJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFthdHRyLmlkXT1cImlkXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJjbGFzc05hbWVcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHBSaXBwbGUgcEJ1dHRvbiBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiIFtzdHlsZV09XCJidXR0b25TdHlsZVwiIFtpY29uXT1cImJ1dHRvbkljb25DbGFzc1wiIFtuZ0NsYXNzXT1cImJ1dHRvbkNsYXNzKClcIiAoY2xpY2spPVwib25CdXR0b25DbGljaygkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICA8UGx1c0ljb24gKm5nSWY9XCIhc2hvd0ljb24gJiYgIWJ1dHRvblRlbXBsYXRlXCIvPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvblRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1dHRvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDx1bCAjbGlzdCBjbGFzcz1cInAtc3BlZWRkaWFsLWxpc3RcIiByb2xlPVwibWVudVwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1vZGVsOyBsZXQgaSA9IGluZGV4XCIgW25nU3R5bGVdPVwiZ2V0SXRlbVN0eWxlKGkpXCIgY2xhc3M9XCJwLXNwZWVkZGlhbC1pdGVtXCIgcFRvb2x0aXAgW3Rvb2x0aXBPcHRpb25zXT1cIml0ZW0udG9vbHRpcE9wdGlvbnNcIiBbbmdDbGFzc109XCJ7ICdwLWhpZGRlbic6IGl0ZW0udmlzaWJsZSA9PT0gZmFsc2UgfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaXNDbGlja2FibGVSb3V0ZXJMaW5rKGl0ZW0pOyBlbHNlIGVsc2VCbG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtc3BlZWRkaWFsLWFjdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpdGVtLmRpc2FibGVkIH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaXRlbS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucyB8fCB7IGV4YWN0OiBmYWxzZSB9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJvbkl0ZW1DbGljaygkZXZlbnQsIGl0ZW0sIGkpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgfHwgcmVhZG9ubHkgfHwgIXZpc2libGUgPyBudWxsIDogaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5mcmFnbWVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cIml0ZW0ucXVlcnlQYXJhbXNIYW5kbGluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiaXRlbS5za2lwTG9jYXRpb25DaGFuZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVwbGFjZVVybF09XCJpdGVtLnJlcGxhY2VVcmxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtc3BlZWRkaWFsLWFjdGlvbi1pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJpdGVtLnVybCB8fCBudWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zcGVlZGRpYWwtYWN0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWRpc2FibGVkJzogaXRlbS5kaXNhYmxlZCB9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgaSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIml0ZW0uaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCB8fCAoaSAhPT0gYWN0aXZlSW5kZXggJiYgcmVhZG9ubHkpIHx8ICF2aXNpYmxlID8gbnVsbCA6IGl0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJzAnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXNwZWVkZGlhbC1hY3Rpb24taWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cIm1hc2sgJiYgdmlzaWJsZVwiIFtuZ0NsYXNzXT1cInsgJ3Atc3BlZWRkaWFsLW1hc2snOiB0cnVlLCAncC1zcGVlZGRpYWwtbWFzay12aXNpYmxlJzogdmlzaWJsZSB9XCIgW2NsYXNzXT1cIm1hc2tDbGFzc05hbWVcIiBbbmdTdHlsZV09XCJtYXNrU3R5bGVcIj48L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9zcGVlZGRpYWwuY3NzJ10sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGVlZERpYWwgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBtb2RlbDogYW55W10gPSBudWxsO1xyXG5cclxuICAgIEBJbnB1dCgpIGdldCB2aXNpYmxlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XHJcbiAgICB9XHJcbiAgICBzZXQgdmlzaWJsZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGNsYXNzTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogc3RyaW5nID0gJ3VwJztcclxuXHJcbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uRGVsYXk6IG51bWJlciA9IDMwO1xyXG5cclxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICdsaW5lYXInO1xyXG5cclxuICAgIEBJbnB1dCgpIHJhZGl1czogbnVtYmVyID0gMDtcclxuXHJcbiAgICBASW5wdXQoKSBtYXNrOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBoaWRlT25DbGlja091dHNpZGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGJ1dHRvblN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgYnV0dG9uQ2xhc3NOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbWFza1N0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgbWFza0NsYXNzTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dJY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgaGlkZUljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSByb3RhdGVBbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2xpc3QnKSBsaXN0OiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcclxuXHJcbiAgICBidXR0b25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBpc0l0ZW1DbGlja2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX3Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ2xpbmVhcicpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnLnAtc3BlZWRkaWFsLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMubGlzdC5uYXRpdmVFbGVtZW50LCAnLnAtc3BlZWRkaWFsLWl0ZW0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYnV0dG9uICYmIGZpcnN0SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdEaWZmID0gTWF0aC5hYnMoYnV0dG9uLm9mZnNldFdpZHRoIC0gZmlyc3RJdGVtLm9mZnNldFdpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoRGlmZiA9IE1hdGguYWJzKGJ1dHRvbi5vZmZzZXRIZWlnaHQgLSBmaXJzdEl0ZW0ub2Zmc2V0SGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1pdGVtLWRpZmYteCcsIGAke3dEaWZmIC8gMn1weGApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWl0ZW0tZGlmZi15JywgYCR7aERpZmYgLyAyfXB4YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYnV0dG9uJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5vblZpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcclxuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMub25WaXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCgpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1dHRvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcclxuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdChldmVudCk7XHJcbiAgICAgICAgdGhpcy5pc0l0ZW1DbGlja2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkl0ZW1DbGljayhlLCBpdGVtKSB7XHJcbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xyXG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoeyBvcmlnaW5hbEV2ZW50OiBlLCBpdGVtIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNJdGVtQ2xpY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlUG9pbnRTdHlsZShpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLnR5cGU7XHJcblxyXG4gICAgICAgIGlmICh0eXBlICE9PSAnbGluZWFyJykge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLm1vZGVsLmxlbmd0aDtcclxuICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gdGhpcy5yYWRpdXMgfHwgbGVuZ3RoICogMjA7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NpcmNsZScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSAoMiAqIE1hdGguUEkpIC8gbGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogYGNhbGMoJHtyYWRpdXMgKiBNYXRoLmNvcyhzdGVwICogaW5kZXgpfXB4ICsgdmFyKC0taXRlbS1kaWZmLXgsIDBweCkpYCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IGBjYWxjKCR7cmFkaXVzICogTWF0aC5zaW4oc3RlcCAqIGluZGV4KX1weCArIHZhcigtLWl0ZW0tZGlmZi15LCAwcHgpKWBcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NlbWktY2lyY2xlJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwID0gTWF0aC5QSSAvIChsZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBgY2FsYygke3JhZGl1cyAqIE1hdGguY29zKHN0ZXAgKiBpbmRleCl9cHggKyB2YXIoLS1pdGVtLWRpZmYteCwgMHB4KSlgO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IGBjYWxjKCR7cmFkaXVzICogTWF0aC5zaW4oc3RlcCAqIGluZGV4KX1weCArIHZhcigtLWl0ZW0tZGlmZi15LCAwcHgpKWA7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogeCwgYm90dG9tOiB5IH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogeCwgdG9wOiB5IH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcmlnaHQ6IHksIHRvcDogeCB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBsZWZ0OiB5LCB0b3A6IHggfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAncXVhcnRlci1jaXJjbGUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSBNYXRoLlBJIC8gKDIgKiAobGVuZ3RoIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IGBjYWxjKCR7cmFkaXVzICogTWF0aC5jb3Moc3RlcCAqIGluZGV4KX1weCArIHZhcigtLWl0ZW0tZGlmZi14LCAwcHgpKWA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gYGNhbGMoJHtyYWRpdXMgKiBNYXRoLnNpbihzdGVwICogaW5kZXgpfXB4ICsgdmFyKC0taXRlbS1kaWZmLXksIDBweCkpYDtcclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd1cC1sZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJpZ2h0OiB4LCBib3R0b206IHkgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndXAtcmlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogeCwgYm90dG9tOiB5IH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24tbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByaWdodDogeSwgdG9wOiB4IH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24tcmlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogeSwgdG9wOiB4IH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVUcmFuc2l0aW9uRGVsYXkoaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLm1vZGVsLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnZpc2libGUgPyBpbmRleCA6IGxlbmd0aCAtIGluZGV4IC0gMSkgKiB0aGlzLnRyYW5zaXRpb25EZWxheTtcclxuICAgIH1cclxuXHJcbiAgICBjb250YWluZXJDbGFzcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbJ3Atc3BlZWRkaWFsIHAtY29tcG9uZW50JyArIGAgcC1zcGVlZGRpYWwtJHt0aGlzLnR5cGV9YF06IHRydWUsXHJcbiAgICAgICAgICAgIFtgcC1zcGVlZGRpYWwtZGlyZWN0aW9uLSR7dGhpcy5kaXJlY3Rpb259YF06IHRoaXMudHlwZSAhPT0gJ2NpcmNsZScsXHJcbiAgICAgICAgICAgICdwLXNwZWVkZGlhbC1vcGVuZWQnOiB0aGlzLnZpc2libGUsXHJcbiAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYnV0dG9uQ2xhc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3Atc3BlZWRkaWFsLWJ1dHRvbiBwLWJ1dHRvbi1yb3VuZGVkJzogdHJ1ZSxcclxuICAgICAgICAgICAgJ3Atc3BlZWRkaWFsLXJvdGF0ZSc6IHRoaXMucm90YXRlQW5pbWF0aW9uICYmICF0aGlzLmhpZGVJY29uLFxyXG4gICAgICAgICAgICBbdGhpcy5idXR0b25DbGFzc05hbWVdOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYnV0dG9uSWNvbkNsYXNzKCkge1xyXG4gICAgICAgIHJldHVybiAoIXRoaXMudmlzaWJsZSAmJiB0aGlzLnNob3dJY29uKSB8fCAhdGhpcy5oaWRlSWNvbiA/IHRoaXMuc2hvd0ljb24gOiB0aGlzLmhpZGVJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1TdHlsZShpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25EZWxheSA9IHRoaXMuY2FsY3VsYXRlVHJhbnNpdGlvbkRlbGF5KGluZGV4KTtcclxuICAgICAgICBjb25zdCBwb2ludFN0eWxlID0gdGhpcy5jYWxjdWxhdGVQb2ludFN0eWxlKGluZGV4KTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uRGVsYXk6IGAke3RyYW5zaXRpb25EZWxheX1tc2AsXHJcbiAgICAgICAgICAgIC4uLnBvaW50U3R5bGVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtOiBNZW51SXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnJvdXRlckxpbmsgJiYgIXRoaXMuZGlzYWJsZWQgJiYgIWl0ZW0uZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPdXRzaWRlQ2xpY2tlZChldmVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lciAmJiAhKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShldmVudC50YXJnZXQpIHx8IHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLmlzSXRlbUNsaWNrZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciAmJiB0aGlzLmhpZGVPbkNsaWNrT3V0c2lkZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlICYmIHRoaXMuaXNPdXRzaWRlQ2xpY2tlZChldmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSXRlbUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQnV0dG9uTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFJvdXRlck1vZHVsZSwgUGx1c0ljb25dLFxyXG4gICAgZXhwb3J0czogW1NwZWVkRGlhbCwgU2hhcmVkTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFJvdXRlck1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtTcGVlZERpYWxdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGVlZERpYWxNb2R1bGUge31cclxuIl19