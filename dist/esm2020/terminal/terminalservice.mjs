import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class TerminalService {
    constructor() {
        this.commandSource = new Subject();
        this.responseSource = new Subject();
        this.commandHandler = this.commandSource.asObservable();
        this.responseHandler = this.responseSource.asObservable();
    }
    sendCommand(command) {
        if (command) {
            this.commandSource.next(command);
        }
    }
    sendResponse(response) {
        if (response) {
            this.responseSource.next(response);
        }
    }
}
TerminalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: TerminalService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TerminalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: TerminalService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: TerminalService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWxzZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3Rlcm1pbmFsL3Rlcm1pbmFsc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRy9CLE1BQU0sT0FBTyxlQUFlO0lBRDVCO1FBRVksa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3RDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUUvQyxtQkFBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkQsb0JBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBYXhEO0lBWEcsV0FBVyxDQUFDLE9BQWU7UUFDdkIsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBZ0I7UUFDekIsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7OzRHQWpCUSxlQUFlO2dIQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGVybWluYWxTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgY29tbWFuZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuICAgIHByaXZhdGUgcmVzcG9uc2VTb3VyY2UgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gICAgY29tbWFuZEhhbmRsZXIgPSB0aGlzLmNvbW1hbmRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICByZXNwb25zZUhhbmRsZXIgPSB0aGlzLnJlc3BvbnNlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNlbmRDb21tYW5kKGNvbW1hbmQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZFNvdXJjZS5uZXh0KGNvbW1hbmQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZW5kUmVzcG9uc2UocmVzcG9uc2U6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlU291cmNlLm5leHQocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=