import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ContextMenuService {
    constructor() {
        this.activeItemKeyChange = new Subject();
        this.activeItemKeyChange$ = this.activeItemKeyChange.asObservable();
    }
    changeKey(key) {
        this.activeItemKey = key;
        this.activeItemKeyChange.next(this.activeItemKey);
    }
    reset() {
        this.activeItemKey = null;
        this.activeItemKeyChange.next(this.activeItemKey);
    }
}
ContextMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ContextMenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ContextMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ContextMenuService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ContextMenuService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dG1lbnVzZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FwaS9jb250ZXh0bWVudXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUcvQixNQUFNLE9BQU8sa0JBQWtCO0lBRC9CO1FBRVksd0JBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUVwRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7S0FhbEU7SUFURyxTQUFTLENBQUMsR0FBRztRQUNULElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7K0dBZlEsa0JBQWtCO21IQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgYWN0aXZlSXRlbUtleUNoYW5nZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgICBhY3RpdmVJdGVtS2V5Q2hhbmdlJCA9IHRoaXMuYWN0aXZlSXRlbUtleUNoYW5nZS5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBhY3RpdmVJdGVtS2V5OiBzdHJpbmc7XHJcblxyXG4gICAgY2hhbmdlS2V5KGtleSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbUtleSA9IGtleTtcclxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1LZXlDaGFuZ2UubmV4dCh0aGlzLmFjdGl2ZUl0ZW1LZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbUtleSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtS2V5Q2hhbmdlLm5leHQodGhpcy5hY3RpdmVJdGVtS2V5KTtcclxuICAgIH1cclxufVxyXG4iXX0=