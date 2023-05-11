import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { PlusIcon } from 'primeng/icons/plus';
import { MinusIcon } from 'primeng/icons/minus';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
let idx = 0;
export class Fieldset {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `p-fieldset-${idx++}`;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'expandicon':
                    this.expandIconTemplate = item.template;
                    break;
                case 'collapseicon':
                    this.collapseIconTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.collapsed)
            this.expand(event);
        else
            this.collapse(event);
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        event.preventDefault();
    }
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    onToggleDone() {
        this.animating = false;
    }
}
Fieldset.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Fieldset, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Fieldset.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: Fieldset, selector: "p-fieldset", inputs: { legend: "legend", toggleable: "toggleable", collapsed: "collapsed", style: "style", styleClass: "styleClass", transitionOptions: "transitionOptions" }, outputs: { collapsedChange: "collapsedChange", onBeforeToggle: "onBeforeToggle", onAfterToggle: "onAfterToggle" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <fieldset [attr.id]="id" [ngClass]="{ 'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable, 'p-fieldset-expanded': !collapsed && toggleable }" [ngStyle]="style" [class]="styleClass">
            <legend class="p-fieldset-legend">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a tabindex="0" (click)="toggle($event)" (keydown.enter)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed" pRipple>
                        <ng-container *ngIf="collapsed">
                            <PlusIcon [styleClass]="'p-fieldset-toggler'" *ngIf="!expandIconTemplate" />
                            <span *ngIf="expandIconTemplate" class="p-fieldset-toggler">
                                <ng-container *ngTemplateOutlet="expandIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngIf="!collapsed">
                            <MinusIcon [styleClass]="'p-fieldset-toggler'" *ngIf="!collapseIconTemplate" />
                            <span *ngIf="collapseIconTemplate" class="p-fieldset-toggler">
                                <ng-container *ngTemplateOutlet="collapseIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="p-fieldset-legend-text">{{ legend }}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </ng-template>
            </legend>
            <div
                [attr.id]="id + '-content'"
                class="p-toggleable-content"
                [@fieldsetContent]="collapsed ? { value: 'hidden', params: { transitionParams: transitionOptions, height: '0' } } : { value: 'visible', params: { transitionParams: animating ? transitionOptions : '0ms', height: '*' } }"
                [attr.aria-labelledby]="id"
                [attr.aria-hidden]="collapsed"
                (@fieldsetContent.done)="onToggleDone()"
                role="region"
            >
                <div class="p-fieldset-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
        </fieldset>
    `, isInline: true, styles: [".p-fieldset-legend>a,.p-fieldset-legend>span{display:flex;align-items:center;justify-content:center}.p-fieldset-toggleable .p-fieldset-legend a{cursor:pointer;-webkit-user-select:none;user-select:none;overflow:hidden;position:relative}.p-fieldset-legend-text{line-height:1}.p-fieldset-toggleable.p-fieldset-expanded>.p-toggleable-content:not(.ng-animating){overflow:visible}.p-fieldset-toggleable .p-toggleable-content{overflow:hidden}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return MinusIcon; }), selector: "MinusIcon" }, { kind: "component", type: i0.forwardRef(function () { return PlusIcon; }), selector: "PlusIcon" }], animations: [
        trigger('fieldsetContent', [
            state('hidden', style({
                height: '0'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Fieldset, decorators: [{
            type: Component,
            args: [{ selector: 'p-fieldset', template: `
        <fieldset [attr.id]="id" [ngClass]="{ 'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable, 'p-fieldset-expanded': !collapsed && toggleable }" [ngStyle]="style" [class]="styleClass">
            <legend class="p-fieldset-legend">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a tabindex="0" (click)="toggle($event)" (keydown.enter)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed" pRipple>
                        <ng-container *ngIf="collapsed">
                            <PlusIcon [styleClass]="'p-fieldset-toggler'" *ngIf="!expandIconTemplate" />
                            <span *ngIf="expandIconTemplate" class="p-fieldset-toggler">
                                <ng-container *ngTemplateOutlet="expandIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngIf="!collapsed">
                            <MinusIcon [styleClass]="'p-fieldset-toggler'" *ngIf="!collapseIconTemplate" />
                            <span *ngIf="collapseIconTemplate" class="p-fieldset-toggler">
                                <ng-container *ngTemplateOutlet="collapseIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="p-fieldset-legend-text">{{ legend }}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </ng-template>
            </legend>
            <div
                [attr.id]="id + '-content'"
                class="p-toggleable-content"
                [@fieldsetContent]="collapsed ? { value: 'hidden', params: { transitionParams: transitionOptions, height: '0' } } : { value: 'visible', params: { transitionParams: animating ? transitionOptions : '0ms', height: '*' } }"
                [attr.aria-labelledby]="id"
                [attr.aria-hidden]="collapsed"
                (@fieldsetContent.done)="onToggleDone()"
                role="region"
            >
                <div class="p-fieldset-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
        </fieldset>
    `, animations: [
                        trigger('fieldsetContent', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-fieldset-legend>a,.p-fieldset-legend>span{display:flex;align-items:center;justify-content:center}.p-fieldset-toggleable .p-fieldset-legend a{cursor:pointer;-webkit-user-select:none;user-select:none;overflow:hidden;position:relative}.p-fieldset-legend-text{line-height:1}.p-fieldset-toggleable.p-fieldset-expanded>.p-toggleable-content:not(.ng-animating){overflow:visible}.p-fieldset-toggleable .p-toggleable-content{overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { legend: [{
                type: Input
            }], toggleable: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], collapsedChange: [{
                type: Output
            }], onBeforeToggle: [{
                type: Output
            }], onAfterToggle: [{
                type: Output
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class FieldsetModule {
}
FieldsetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: FieldsetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FieldsetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: FieldsetModule, declarations: [Fieldset], imports: [CommonModule, RippleModule, MinusIcon, PlusIcon], exports: [Fieldset, SharedModule] });
FieldsetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: FieldsetModule, imports: [CommonModule, RippleModule, MinusIcon, PlusIcon, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: FieldsetModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, MinusIcon, PlusIcon],
                    exports: [Fieldset, SharedModule],
                    declarations: [Fieldset]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZmllbGRzZXQvZmllbGRzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQStCLGVBQWUsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUNwTSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFaEQsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBdUVwQixNQUFNLE9BQU8sUUFBUTtJQStCakIsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUExQnpCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFMUIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4RCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNdkQsc0JBQWlCLEdBQVcsc0NBQXNDLENBQUM7UUFnQjVFLE9BQUUsR0FBVyxjQUFjLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFGRSxDQUFDO0lBSXRDLGtCQUFrQjtRQUNkLElB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USxDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIEFmdGVyQ29udGVudEluaXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHsgQmxvY2thYmxlVUkgfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcclxuaW1wb3J0IHsgUGx1c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3BsdXMnO1xyXG5pbXBvcnQgeyBNaW51c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL21pbnVzJztcclxuXHJcbmxldCBpZHg6IG51bWJlciA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1maWVsZHNldCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxmaWVsZHNldCBbYXR0ci5pZF09XCJpZFwiIFtuZ0NsYXNzXT1cInsgJ3AtZmllbGRzZXQgcC1jb21wb25lbnQnOiB0cnVlLCAncC1maWVsZHNldC10b2dnbGVhYmxlJzogdG9nZ2xlYWJsZSwgJ3AtZmllbGRzZXQtZXhwYW5kZWQnOiAhY29sbGFwc2VkICYmIHRvZ2dsZWFibGUgfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPGxlZ2VuZCBjbGFzcz1cInAtZmllbGRzZXQtbGVnZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidG9nZ2xlYWJsZTsgZWxzZSBsZWdlbmRDb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlKCRldmVudClcIiBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImlkICsgJy1jb250ZW50J1wiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiIWNvbGxhcHNlZFwiIHBSaXBwbGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2xsYXBzZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQbHVzSWNvbiBbc3R5bGVDbGFzc109XCIncC1maWVsZHNldC10b2dnbGVyJ1wiICpuZ0lmPVwiIWV4cGFuZEljb25UZW1wbGF0ZVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImV4cGFuZEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1maWVsZHNldC10b2dnbGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImV4cGFuZEljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb2xsYXBzZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNaW51c0ljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtZmllbGRzZXQtdG9nZ2xlcidcIiAqbmdJZj1cIiFjb2xsYXBzZUljb25UZW1wbGF0ZVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNvbGxhcHNlSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWZpZWxkc2V0LXRvZ2dsZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sbGFwc2VJY29uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsZWdlbmRDb250ZW50XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2xlZ2VuZENvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWZpZWxkc2V0LWxlZ2VuZC10ZXh0XCI+e3sgbGVnZW5kIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPC9sZWdlbmQ+XHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImlkICsgJy1jb250ZW50J1wiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtdG9nZ2xlYWJsZS1jb250ZW50XCJcclxuICAgICAgICAgICAgICAgIFtAZmllbGRzZXRDb250ZW50XT1cImNvbGxhcHNlZCA/IHsgdmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHsgdHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJzAnIH0gfSA6IHsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IGFuaW1hdGluZyA/IHRyYW5zaXRpb25PcHRpb25zIDogJzBtcycsIGhlaWdodDogJyonIH0gfVwiXHJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWRcIlxyXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiY29sbGFwc2VkXCJcclxuICAgICAgICAgICAgICAgIChAZmllbGRzZXRDb250ZW50LmRvbmUpPVwib25Ub2dnbGVEb25lKClcIlxyXG4gICAgICAgICAgICAgICAgcm9sZT1cInJlZ2lvblwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWZpZWxkc2V0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ2ZpZWxkc2V0Q29udGVudCcsIFtcclxuICAgICAgICAgICAgc3RhdGUoXHJcbiAgICAgICAgICAgICAgICAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgc3RhdGUoXHJcbiAgICAgICAgICAgICAgICAndmlzaWJsZScsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGhpZGRlbicsIFthbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpXSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoMCkpXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9maWVsZHNldC5jc3MnXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZpZWxkc2V0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQmxvY2thYmxlVUkge1xyXG4gICAgQElucHV0KCkgbGVnZW5kOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdG9nZ2xlYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBjb2xsYXBzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBAT3V0cHV0KCkgY29sbGFwc2VkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25CZWZvcmVUb2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkFmdGVyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBhbmltYXRpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGNvbGxhcHNlSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGV4cGFuZEljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICAgIGlkOiBzdHJpbmcgPSBgcC1maWVsZHNldC0ke2lkeCsrfWA7XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdleHBhbmRpY29uJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29sbGFwc2VpY29uJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25CZWZvcmVUb2dnbGUuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VkIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWQpIHRoaXMuZXhwYW5kKGV2ZW50KTtcclxuICAgICAgICBlbHNlIHRoaXMuY29sbGFwc2UoZXZlbnQpO1xyXG5cclxuICAgICAgICB0aGlzLm9uQWZ0ZXJUb2dnbGUuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VkIH0pO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwYW5kKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbGxhcHNlZENoYW5nZS5lbWl0KHRoaXMuY29sbGFwc2VkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xsYXBzZShldmVudCkge1xyXG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbGxhcHNlZENoYW5nZS5lbWl0KHRoaXMuY29sbGFwc2VkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG9nZ2xlRG9uZSgpIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmlwcGxlTW9kdWxlLCBNaW51c0ljb24sIFBsdXNJY29uXSxcclxuICAgIGV4cG9ydHM6IFtGaWVsZHNldCwgU2hhcmVkTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0ZpZWxkc2V0XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmllbGRzZXRNb2R1bGUge31cclxuIl19