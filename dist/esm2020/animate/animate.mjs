import { CommonModule } from '@angular/common';
import { Directive, Input, NgModule } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
export class Animate {
    constructor(host, el, renderer) {
        this.host = host;
        this.el = el;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.bindIntersectionObserver();
    }
    bindIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        this.observer = new IntersectionObserver((el) => this.isVisible(el), options);
        this.observer.observe(this.host.nativeElement);
    }
    isVisible(element) {
        const [intersectionObserverEntry] = element;
        intersectionObserverEntry.isIntersecting ? this.enter() : this.leave();
    }
    enter() {
        this.host.nativeElement.style.visibility = 'visible';
        DomHandler.addClass(this.host.nativeElement, this.enterClass);
    }
    leave() {
        DomHandler.removeClass(this.host.nativeElement, this.enterClass);
        if (this.leaveClass) {
            DomHandler.addClass(this.host.nativeElement, this.leaveClass);
        }
        const animationDuration = this.host.nativeElement.style.animationDuration || 500;
        this.timeout = setTimeout(() => {
            this.host.nativeElement.style.visibility = 'hidden';
        }, animationDuration);
    }
    unbindIntersectionObserver() {
        if (this.observer) {
            this.observer.unobserve(this.host.nativeElement);
        }
    }
    ngOnDestroy() {
        this.unbindIntersectionObserver();
        clearTimeout(this.timeout);
    }
}
Animate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Animate, deps: [{ token: i0.ElementRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
Animate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.4", type: Animate, selector: "[pAnimate]", inputs: { enterClass: "enterClass", leaveClass: "leaveClass" }, host: { properties: { "class.p-animate": "true" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Animate, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pAnimate]',
                    host: {
                        '[class.p-animate]': 'true'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { enterClass: [{
                type: Input
            }], leaveClass: [{
                type: Input
            }] } });
export class AnimateModule {
}
AnimateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AnimateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AnimateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: AnimateModule, declarations: [Animate], imports: [CommonModule], exports: [Animate] });
AnimateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AnimateModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AnimateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Animate],
                    declarations: [Animate]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9hbmltYXRlL2FuaW1hdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBaUIsU0FBUyxFQUFjLEtBQUssRUFBRSxRQUFRLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFRekMsTUFBTSxPQUFPLE9BQU87SUFTaEIsWUFBb0IsSUFBZ0IsRUFBUyxFQUFjLEVBQVMsUUFBbUI7UUFBbkUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQUcsQ0FBQztJQUUzRixlQUFlO1FBQ1gsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdCQUF3QjtRQUNwQixNQUFNLE9BQU8sR0FBRztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLEtBQUs7WUFDakIsU0FBUyxFQUFFLEdBQUc7U0FDakIsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxTQUFTLENBQUMsT0FBb0M7UUFDMUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQzVDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0UsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNyRCxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsS0FBSztRQUNELFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqRTtRQUVELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLEdBQUcsQ0FBQztRQUVqRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDeEQsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELDBCQUEwQjtRQUN0QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7O29HQTFEUSxPQUFPO3dGQUFQLE9BQU87MkZBQVAsT0FBTztrQkFObkIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsSUFBSSxFQUFFO3dCQUNGLG1CQUFtQixFQUFFLE1BQU07cUJBQzlCO2lCQUNKO2tKQUVZLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSzs7QUErRFYsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkFsRWIsT0FBTyxhQThETixZQUFZLGFBOURiLE9BQU87MkdBa0VQLGFBQWEsWUFKWixZQUFZOzJGQUliLGFBQWE7a0JBTHpCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBOZ01vZHVsZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3BBbmltYXRlXScsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5wLWFuaW1hdGVdJzogJ3RydWUnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBASW5wdXQoKSBlbnRlckNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbGVhdmVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuXHJcbiAgICB0aW1lb3V0OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmJpbmRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRJbnRlcnNlY3Rpb25PYnNlcnZlcigpIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICByb290OiBudWxsLFxyXG4gICAgICAgICAgICByb290TWFyZ2luOiAnMHB4JyxcclxuICAgICAgICAgICAgdGhyZXNob2xkOiAxLjBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbCkgPT4gdGhpcy5pc1Zpc2libGUoZWwpLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVmlzaWJsZShlbGVtZW50OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W10pIHtcclxuICAgICAgICBjb25zdCBbaW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeV0gPSBlbGVtZW50O1xyXG4gICAgICAgIGludGVyc2VjdGlvbk9ic2VydmVyRW50cnkuaXNJbnRlcnNlY3RpbmcgPyB0aGlzLmVudGVyKCkgOiB0aGlzLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCB0aGlzLmVudGVyQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYXZlKCkge1xyXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuZW50ZXJDbGFzcyk7XHJcbiAgICAgICAgaWYgKHRoaXMubGVhdmVDbGFzcykge1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCB0aGlzLmxlYXZlQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uRHVyYXRpb24gPSB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5zdHlsZS5hbmltYXRpb25EdXJhdGlvbiB8fCA1MDA7XHJcblxyXG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgfSwgYW5pbWF0aW9uRHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEludGVyc2VjdGlvbk9ic2VydmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51bmJpbmRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbQW5pbWF0ZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtBbmltYXRlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5pbWF0ZU1vZHVsZSB7fVxyXG4iXX0=