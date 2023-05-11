import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Skeleton {
    constructor() {
        this.shape = 'rectangle';
        this.animation = 'wave';
        this.borderRadius = null;
        this.size = null;
        this.width = '100%';
        this.height = '1rem';
    }
    containerClass() {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape === 'circle',
            'p-skeleton-none': this.animation === 'none'
        };
    }
    containerStyle() {
        if (this.size)
            return { ...this.style, width: this.size, height: this.size, borderRadius: this.borderRadius };
        else
            return { ...this.style, width: this.width, height: this.height, borderRadius: this.borderRadius };
    }
}
Skeleton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Skeleton, deps: [], target: i0.ɵɵFactoryTarget.Component });
Skeleton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: Skeleton, selector: "p-skeleton", inputs: { styleClass: "styleClass", style: "style", shape: "shape", animation: "animation", borderRadius: "borderRadius", size: "size", width: "width", height: "height" }, host: { classAttribute: "p-element" }, ngImport: i0, template: ` <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()"></div> `, isInline: true, styles: [".p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:\"\";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translate(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translate(-100%)}to{transform:translate(100%)}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Skeleton, decorators: [{
            type: Component,
            args: [{ selector: 'p-skeleton', template: ` <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()"></div> `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:\"\";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translate(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translate(-100%)}to{transform:translate(100%)}}\n"] }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], shape: [{
                type: Input
            }], animation: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], size: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
export class SkeletonModule {
}
SkeletonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SkeletonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SkeletonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: SkeletonModule, declarations: [Skeleton], imports: [CommonModule], exports: [Skeleton] });
SkeletonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SkeletonModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SkeletonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Skeleton],
                    declarations: [Skeleton]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2tlbGV0b24vc2tlbGV0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBWS9DLE1BQU0sT0FBTyxRQUFRO0lBVnJCO1FBZWEsVUFBSyxHQUFXLFdBQVcsQ0FBQztRQUU1QixjQUFTLEdBQVcsTUFBTSxDQUFDO1FBRTNCLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRTVCLFNBQUksR0FBVyxJQUFJLENBQUM7UUFFcEIsVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUV2QixXQUFNLEdBQVcsTUFBTSxDQUFDO0tBY3BDO0lBWkcsY0FBYztRQUNWLE9BQU87WUFDSCx3QkFBd0IsRUFBRSxJQUFJO1lBQzlCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtZQUM1QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU07U0FDL0MsQ0FBQztJQUNOLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7WUFDekcsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNHLENBQUM7O3FHQTVCUSxRQUFRO3lGQUFSLFFBQVEscVFBUlAsOEZBQThGOzJGQVEvRixRQUFRO2tCQVZwQixTQUFTOytCQUNJLFlBQVksWUFDWiw4RkFBOEYsbUJBQ3ZGLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksUUFFL0I7d0JBQ0YsS0FBSyxFQUFFLFdBQVc7cUJBQ3JCOzhCQUdRLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7O0FBcUJWLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBcENkLFFBQVEsYUFnQ1AsWUFBWSxhQWhDYixRQUFROzRHQW9DUixjQUFjLFlBSmIsWUFBWTsyRkFJYixjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Atc2tlbGV0b24nLFxyXG4gICAgdGVtcGxhdGU6IGAgPGRpdiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJjb250YWluZXJTdHlsZSgpXCI+PC9kaXY+IGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9za2VsZXRvbi5jc3MnXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNrZWxldG9uIHtcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHNoYXBlOiBzdHJpbmcgPSAncmVjdGFuZ2xlJztcclxuXHJcbiAgICBASW5wdXQoKSBhbmltYXRpb246IHN0cmluZyA9ICd3YXZlJztcclxuXHJcbiAgICBASW5wdXQoKSBib3JkZXJSYWRpdXM6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgQElucHV0KCkgc2l6ZTogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBASW5wdXQoKSB3aWR0aDogc3RyaW5nID0gJzEwMCUnO1xyXG5cclxuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nID0gJzFyZW0nO1xyXG5cclxuICAgIGNvbnRhaW5lckNsYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdwLXNrZWxldG9uIHAtY29tcG9uZW50JzogdHJ1ZSxcclxuICAgICAgICAgICAgJ3Atc2tlbGV0b24tY2lyY2xlJzogdGhpcy5zaGFwZSA9PT0gJ2NpcmNsZScsXHJcbiAgICAgICAgICAgICdwLXNrZWxldG9uLW5vbmUnOiB0aGlzLmFuaW1hdGlvbiA9PT0gJ25vbmUnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb250YWluZXJTdHlsZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplKSByZXR1cm4geyAuLi50aGlzLnN0eWxlLCB3aWR0aDogdGhpcy5zaXplLCBoZWlnaHQ6IHRoaXMuc2l6ZSwgYm9yZGVyUmFkaXVzOiB0aGlzLmJvcmRlclJhZGl1cyB9O1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIHsgLi4udGhpcy5zdHlsZSwgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHQsIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXMgfTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1NrZWxldG9uXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1NrZWxldG9uXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2tlbGV0b25Nb2R1bGUge31cclxuIl19