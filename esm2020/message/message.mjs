import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckIcon } from 'primeng/icons/check';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class UIMessage {
    constructor() {
        this.escape = true;
    }
    get icon() {
        if (this.severity && this.severity.trim()) {
            return this.severity;
        }
        else {
            return 'info';
        }
    }
}
UIMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: UIMessage, deps: [], target: i0.ɵɵFactoryTarget.Component });
UIMessage.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: UIMessage, selector: "p-message", inputs: { severity: "severity", text: "text", escape: "escape", style: "style", styleClass: "styleClass" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div
            aria-live="polite"
            class="p-inline-message p-component p-inline-message"
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-inline-message-info': severity === 'info',
                'p-inline-message-warn': severity === 'warn',
                'p-inline-message-error': severity === 'error',
                'p-inline-message-success': severity === 'success',
                'p-inline-message-icon-only': this.text == null
            }"
        >
            <CheckIcon *ngIf="icon === 'success'" [styleClass]="'p-inline-message-icon'"/>
            <InfoCircleIcon *ngIf="icon === 'info'" [styleClass]="'p-inline-message-icon'"/>
            <TimesCircleIcon *ngIf="icon === 'error'" [styleClass]="'p-inline-message-icon'"/>
            <ExclamationTriangleIcon *ngIf="icon === 'warn'" [styleClass]="'p-inline-message-icon'"/>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="p-inline-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="p-inline-message-text">{{ text }}</span>
            </ng-template>
        </div>
    `, isInline: true, styles: [".p-inline-message{display:inline-flex;align-items:center;justify-content:center;vertical-align:top}.p-inline-message-icon-only .p-inline-message-text{visibility:hidden;width:0}.p-fluid .p-inline-message{display:flex}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(function () { return CheckIcon; }), selector: "CheckIcon" }, { kind: "component", type: i0.forwardRef(function () { return InfoCircleIcon; }), selector: "InfoCircleIcon" }, { kind: "component", type: i0.forwardRef(function () { return TimesCircleIcon; }), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(function () { return ExclamationTriangleIcon; }), selector: "ExclamationTriangleIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: UIMessage, decorators: [{
            type: Component,
            args: [{ selector: 'p-message', template: `
        <div
            aria-live="polite"
            class="p-inline-message p-component p-inline-message"
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-inline-message-info': severity === 'info',
                'p-inline-message-warn': severity === 'warn',
                'p-inline-message-error': severity === 'error',
                'p-inline-message-success': severity === 'success',
                'p-inline-message-icon-only': this.text == null
            }"
        >
            <CheckIcon *ngIf="icon === 'success'" [styleClass]="'p-inline-message-icon'"/>
            <InfoCircleIcon *ngIf="icon === 'info'" [styleClass]="'p-inline-message-icon'"/>
            <TimesCircleIcon *ngIf="icon === 'error'" [styleClass]="'p-inline-message-icon'"/>
            <ExclamationTriangleIcon *ngIf="icon === 'warn'" [styleClass]="'p-inline-message-icon'"/>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="p-inline-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="p-inline-message-text">{{ text }}</span>
            </ng-template>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-inline-message{display:inline-flex;align-items:center;justify-content:center;vertical-align:top}.p-inline-message-icon-only .p-inline-message-text{visibility:hidden;width:0}.p-fluid .p-inline-message{display:flex}\n"] }]
        }], propDecorators: { severity: [{
                type: Input
            }], text: [{
                type: Input
            }], escape: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }] } });
export class MessageModule {
}
MessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: MessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: MessageModule, declarations: [UIMessage], imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon], exports: [UIMessage] });
MessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: MessageModule, imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: MessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon],
                    exports: [UIMessage],
                    declarations: [UIMessage]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9tZXNzYWdlL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7O0FBcUM1RSxNQUFNLE9BQU8sU0FBUztJQW5DdEI7UUF3Q2EsV0FBTSxHQUFZLElBQUksQ0FBQztLQWFuQztJQVBHLElBQUksSUFBSTtRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4QjthQUFNO1lBQ0gsT0FBTyxNQUFNLENBQUM7U0FDakI7SUFDTCxDQUFDOztzR0FqQlEsU0FBUzswRkFBVCxTQUFTLG9NQWpDUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXlCVCxtdEJBNkJ1QixTQUFTLDZGQUFFLGNBQWMsa0dBQUUsZUFBZSxtR0FBRSx1QkFBdUI7MkZBckJsRixTQUFTO2tCQW5DckIsU0FBUzsrQkFDSSxXQUFXLFlBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5QlQsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksUUFFL0I7d0JBQ0YsS0FBSyxFQUFFLFdBQVc7cUJBQ3JCOzhCQUdRLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSzs7QUFnQlYsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkF6QmIsU0FBUyxhQXFCUixZQUFZLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLGFBckJsRixTQUFTOzJHQXlCVCxhQUFhLFlBSlosWUFBWSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLHVCQUF1QjsyRkFJbEYsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLENBQUM7b0JBQzVGLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDcEIsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ2hlY2tJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGVjayc7XHJcbmltcG9ydCB7IEluZm9DaXJjbGVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9pbmZvY2lyY2xlJztcclxuaW1wb3J0IHsgVGltZXNDaXJjbGVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lc2NpcmNsZSc7XHJcbmltcG9ydCB7IEV4Y2xhbWF0aW9uVHJpYW5nbGVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9leGNsYW1hdGlvbnRyaWFuZ2xlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLW1lc3NhZ2UnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwicC1pbmxpbmUtbWVzc2FnZSBwLWNvbXBvbmVudCBwLWlubGluZS1tZXNzYWdlXCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxyXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXHJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcclxuICAgICAgICAgICAgICAgICdwLWlubGluZS1tZXNzYWdlLWluZm8nOiBzZXZlcml0eSA9PT0gJ2luZm8nLFxyXG4gICAgICAgICAgICAgICAgJ3AtaW5saW5lLW1lc3NhZ2Utd2Fybic6IHNldmVyaXR5ID09PSAnd2FybicsXHJcbiAgICAgICAgICAgICAgICAncC1pbmxpbmUtbWVzc2FnZS1lcnJvcic6IHNldmVyaXR5ID09PSAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ3AtaW5saW5lLW1lc3NhZ2Utc3VjY2Vzcyc6IHNldmVyaXR5ID09PSAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAncC1pbmxpbmUtbWVzc2FnZS1pY29uLW9ubHknOiB0aGlzLnRleHQgPT0gbnVsbFxyXG4gICAgICAgICAgICB9XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICAgIDxDaGVja0ljb24gKm5nSWY9XCJpY29uID09PSAnc3VjY2VzcydcIiBbc3R5bGVDbGFzc109XCIncC1pbmxpbmUtbWVzc2FnZS1pY29uJ1wiLz5cclxuICAgICAgICAgICAgPEluZm9DaXJjbGVJY29uICpuZ0lmPVwiaWNvbiA9PT0gJ2luZm8nXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtaW5saW5lLW1lc3NhZ2UtaWNvbidcIi8+XHJcbiAgICAgICAgICAgIDxUaW1lc0NpcmNsZUljb24gKm5nSWY9XCJpY29uID09PSAnZXJyb3InXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtaW5saW5lLW1lc3NhZ2UtaWNvbidcIi8+XHJcbiAgICAgICAgICAgIDxFeGNsYW1hdGlvblRyaWFuZ2xlSWNvbiAqbmdJZj1cImljb24gPT09ICd3YXJuJ1wiIFtzdHlsZUNsYXNzXT1cIidwLWlubGluZS1tZXNzYWdlLWljb24nXCIvPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWVzY2FwZTsgZWxzZSBlc2NhcGVPdXRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWVzY2FwZVwiIGNsYXNzPVwicC1pbmxpbmUtbWVzc2FnZS10ZXh0XCIgW2lubmVySFRNTF09XCJ0ZXh0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNlc2NhcGVPdXQ+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImVzY2FwZVwiIGNsYXNzPVwicC1pbmxpbmUtbWVzc2FnZS10ZXh0XCI+e3sgdGV4dCB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9tZXNzYWdlLmNzcyddLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVUlNZXNzYWdlIHtcclxuICAgIEBJbnB1dCgpIHNldmVyaXR5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdGV4dDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGVzY2FwZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgZ2V0IGljb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V2ZXJpdHkgJiYgdGhpcy5zZXZlcml0eS50cmltKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V2ZXJpdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICdpbmZvJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDaGVja0ljb24sIEluZm9DaXJjbGVJY29uLCBUaW1lc0NpcmNsZUljb24sIEV4Y2xhbWF0aW9uVHJpYW5nbGVJY29uXSxcclxuICAgIGV4cG9ydHM6IFtVSU1lc3NhZ2VdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbVUlNZXNzYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZU1vZHVsZSB7fVxyXG4iXX0=