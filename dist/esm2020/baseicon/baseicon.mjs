import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
export class BaseIcon {
    constructor() {
        this.spin = false;
    }
    ngOnInit() {
        this.getAttributes();
    }
    getAttributes() {
        const isLabelEmpty = ObjectUtils.isEmpty(this.label);
        this.role = !isLabelEmpty ? 'img' : undefined;
        this.ariaLabel = !isLabelEmpty ? this.label : undefined;
        this.ariaHidden = isLabelEmpty;
    }
    getClassNames() {
        return `p-icon ${this.styleClass ? this.styleClass + ' ' : ''}${this.spin ? 'p-icon-spin' : ''}`;
    }
}
BaseIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: BaseIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
BaseIcon.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: BaseIcon, isStandalone: true, selector: "ng-component", inputs: { label: "label", spin: "spin", styleClass: "styleClass" }, host: { classAttribute: "p-element p-icon-wrapper" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: BaseIcon, decorators: [{
            type: Component,
            args: [{
                    template: ` <ng-content></ng-content> `,
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element p-icon-wrapper'
                    }
                }]
        }], propDecorators: { label: [{
                type: Input
            }], spin: [{
                type: Input
            }], styleClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWljb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvYmFzZWljb24vYmFzZWljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQTJCLE1BQU0sZUFBZSxDQUFDO0FBQ3RILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBVzVDLE1BQU0sT0FBTyxRQUFRO0lBVHJCO1FBWWEsU0FBSSxHQUFZLEtBQUssQ0FBQztLQXdCbEM7SUFkRyxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxhQUFhO1FBQ1QsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyRyxDQUFDOztxR0ExQlEsUUFBUTt5RkFBUixRQUFRLGtNQVJQLDZCQUE2QjsyRkFROUIsUUFBUTtrQkFUcEIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLDBCQUEwQjtxQkFDcEM7aUJBQ0o7OEJBRVksS0FBSztzQkFBYixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXHJcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50IHAtaWNvbi13cmFwcGVyJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZUljb24ge1xyXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzcGluOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIHJvbGU6IHN0cmluZztcclxuXHJcbiAgICBhcmlhTGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBhcmlhSGlkZGVuOiBib29sZWFuO1xyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0QXR0cmlidXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgY29uc3QgaXNMYWJlbEVtcHR5ID0gT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLmxhYmVsKTtcclxuICAgICAgICB0aGlzLnJvbGUgPSAhaXNMYWJlbEVtcHR5ID8gJ2ltZycgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5hcmlhTGFiZWwgPSAhaXNMYWJlbEVtcHR5ID8gdGhpcy5sYWJlbCA6IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmFyaWFIaWRkZW4gPSBpc0xhYmVsRW1wdHk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcclxuICAgICAgICByZXR1cm4gYHAtaWNvbiAke3RoaXMuc3R5bGVDbGFzcyA/IHRoaXMuc3R5bGVDbGFzcyArICcgJyA6ICcnfSR7dGhpcy5zcGluID8gJ3AtaWNvbi1zcGluJyA6ICcnfWA7XHJcbiAgICB9XHJcbn1cclxuIl19