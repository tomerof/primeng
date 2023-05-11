import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class OverlayService {
    constructor() {
        this.clickSource = new Subject();
        this.clickObservable = this.clickSource.asObservable();
    }
    add(event) {
        if (event) {
            this.clickSource.next(event);
        }
    }
}
OverlayService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OverlayService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OverlayService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OverlayService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OverlayService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvYXBpL292ZXJsYXlzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJL0IsTUFBTSxPQUFPLGNBQWM7SUFEM0I7UUFFWSxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUF1QixDQUFDO1FBRXpELG9CQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQU9yRDtJQUxHLEdBQUcsQ0FBQyxLQUFLO1FBQ0wsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7OzJHQVRRLGNBQWM7K0dBQWQsY0FBYyxjQURELE1BQU07MkZBQ25CLGNBQWM7a0JBRDFCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL21lc3NhZ2UnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIE92ZXJsYXlTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgY2xpY2tTb3VyY2UgPSBuZXcgU3ViamVjdDxNZXNzYWdlIHwgTWVzc2FnZVtdPigpO1xyXG5cclxuICAgIGNsaWNrT2JzZXJ2YWJsZSA9IHRoaXMuY2xpY2tTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgYWRkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTb3VyY2UubmV4dChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==