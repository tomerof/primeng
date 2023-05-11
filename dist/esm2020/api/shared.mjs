import { NgModule, Directive, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class Header {
}
Header.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Header, deps: [], target: i0.ɵɵFactoryTarget.Component });
Header.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: Header, selector: "p-header", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Header, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-header',
                    template: '<ng-content></ng-content>'
                }]
        }] });
export class Footer {
}
Footer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Footer, deps: [], target: i0.ɵɵFactoryTarget.Component });
Footer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: Footer, selector: "p-footer", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Footer, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-footer',
                    template: '<ng-content></ng-content>'
                }]
        }] });
export class PrimeTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
}
PrimeTemplate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PrimeTemplate, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
PrimeTemplate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.4", type: PrimeTemplate, selector: "[pTemplate]", inputs: { type: "type", name: ["pTemplate", "name"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PrimeTemplate, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pTemplate]',
                    host: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { type: [{
                type: Input
            }], name: [{
                type: Input,
                args: ['pTemplate']
            }] } });
export class SharedModule {
}
SharedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SharedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: SharedModule, declarations: [Header, Footer, PrimeTemplate], imports: [CommonModule], exports: [Header, Footer, PrimeTemplate] });
SharedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SharedModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SharedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Header, Footer, PrimeTemplate],
                    declarations: [Header, Footer, PrimeTemplate]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FwaS9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBZ0IsU0FBUyxFQUFFLEtBQUssRUFBbUYsTUFBTSxlQUFlLENBQUM7QUFDMUosT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTFDLE1BQU0sT0FBTyxNQUFNOzttR0FBTixNQUFNO3VGQUFOLE1BQU0sZ0RBRkwsMkJBQTJCOzJGQUU1QixNQUFNO2tCQUpsQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsMkJBQTJCO2lCQUN4Qzs7QUFPRCxNQUFNLE9BQU8sTUFBTTs7bUdBQU4sTUFBTTt1RkFBTixNQUFNLGdEQUZMLDJCQUEyQjsyRkFFNUIsTUFBTTtrQkFKbEIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDeEM7O0FBT0QsTUFBTSxPQUFPLGFBQWE7SUFLdEIsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO0lBRWpELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7MEdBVFEsYUFBYTs4RkFBYixhQUFhOzJGQUFiLGFBQWE7a0JBSnpCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLElBQUksRUFBRSxFQUFFO2lCQUNYO2tHQUVZLElBQUk7c0JBQVosS0FBSztnQkFFYyxJQUFJO3NCQUF2QixLQUFLO3VCQUFDLFdBQVc7O0FBY3RCLE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBN0JaLE1BQU0sRUFNTixNQUFNLEVBTU4sYUFBYSxhQWFaLFlBQVksYUF6QmIsTUFBTSxFQU1OLE1BQU0sRUFNTixhQUFhOzBHQWlCYixZQUFZLFlBSlgsWUFBWTsyRkFJYixZQUFZO2tCQUx4QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUM7b0JBQ3hDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBFdmVudEVtaXR0ZXIsIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBBZnRlckNvbnRlbnRJbml0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1oZWFkZXInLFxyXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSGVhZGVyIHt9XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1mb290ZXInLFxyXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9vdGVyIHt9XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3BUZW1wbGF0ZV0nLFxyXG4gICAgaG9zdDoge31cclxufSlcclxuZXhwb3J0IGNsYXNzIFByaW1lVGVtcGxhdGUge1xyXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgncFRlbXBsYXRlJykgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cclxuXHJcbiAgICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0hlYWRlciwgRm9vdGVyLCBQcmltZVRlbXBsYXRlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0hlYWRlciwgRm9vdGVyLCBQcmltZVRlbXBsYXRlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHt9XHJcbiJdfQ==