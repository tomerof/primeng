import { NgModule, Directive, HostListener, Input, forwardRef, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALIDATORS } from '@angular/forms';
import * as i0 from "@angular/core";
export const KEYFILTER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => KeyFilter),
    multi: true
};
const DEFAULT_MASKS = {
    pint: /[\d]/,
    int: /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
};
const KEYS = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
};
const SAFARI_KEYS = {
    63234: 37,
    63235: 39,
    63232: 38,
    63233: 40,
    63276: 33,
    63277: 34,
    63272: 46,
    63273: 36,
    63275: 35 // end
};
export class KeyFilter {
    constructor(document, platformId, el) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.ngModelChange = new EventEmitter();
        if (isPlatformBrowser(this.platformId)) {
            this.isAndroid = DomHandler.isAndroid();
        }
        else {
            this.isAndroid = false;
        }
    }
    get pattern() {
        return this._pattern;
    }
    set pattern(_pattern) {
        this._pattern = _pattern;
        this.regex = DEFAULT_MASKS[this._pattern] || this._pattern;
    }
    isNavKeyPress(e) {
        let k = e.keyCode;
        k = DomHandler.getBrowser().safari ? SAFARI_KEYS[k] || k : k;
        return (k >= 33 && k <= 40) || k == KEYS.RETURN || k == KEYS.TAB || k == KEYS.ESC;
    }
    isSpecialKey(e) {
        let k = e.keyCode || e.charCode;
        return k == 9 || k == 13 || k == 27 || k == 16 || k == 17 || (k >= 18 && k <= 20) || (DomHandler.getBrowser().opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
    }
    getKey(e) {
        let k = e.keyCode || e.charCode;
        return DomHandler.getBrowser().safari ? SAFARI_KEYS[k] || k : k;
    }
    getCharCode(e) {
        return e.charCode || e.keyCode || e.which;
    }
    findDelta(value, prevValue) {
        let delta = '';
        for (let i = 0; i < value.length; i++) {
            let str = value.substr(0, i) + value.substr(i + value.length - prevValue.length);
            if (str === prevValue)
                delta = value.substr(i, value.length - prevValue.length);
        }
        return delta;
    }
    isValidChar(c) {
        return this.regex.test(c);
    }
    isValidString(str) {
        for (let i = 0; i < str.length; i++) {
            if (!this.isValidChar(str.substr(i, 1))) {
                return false;
            }
        }
        return true;
    }
    onInput(e) {
        if (this.isAndroid && !this.pValidateOnly) {
            let val = this.el.nativeElement.value;
            let lastVal = this.lastValue || '';
            let inserted = this.findDelta(val, lastVal);
            let removed = this.findDelta(lastVal, val);
            let pasted = inserted.length > 1 || (!inserted && !removed);
            if (pasted) {
                if (!this.isValidString(val)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }
            else if (!removed) {
                if (!this.isValidChar(inserted)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }
            val = this.el.nativeElement.value;
            if (this.isValidString(val)) {
                this.lastValue = val;
            }
        }
    }
    onKeyPress(e) {
        if (this.isAndroid || this.pValidateOnly) {
            return;
        }
        let browser = DomHandler.getBrowser();
        let k = this.getKey(e);
        if (browser.mozilla && (e.ctrlKey || e.altKey)) {
            return;
        }
        else if (k == 17 || k == 18) {
            return;
        }
        let c = this.getCharCode(e);
        let cc = String.fromCharCode(c);
        let ok = true;
        if (!browser.mozilla && (this.isSpecialKey(e) || !cc)) {
            return;
        }
        ok = this.regex.test(cc);
        if (!ok) {
            e.preventDefault();
        }
    }
    onPaste(e) {
        const clipboardData = e.clipboardData || this.document.defaultView.clipboardData.getData('text');
        if (clipboardData) {
            const pastedText = clipboardData.getData('text');
            for (let char of pastedText.toString()) {
                if (!this.regex.test(char)) {
                    e.preventDefault();
                    return;
                }
            }
        }
    }
    validate(c) {
        if (this.pValidateOnly) {
            let value = this.el.nativeElement.value;
            if (value && !this.regex.test(value)) {
                return {
                    validatePattern: false
                };
            }
        }
    }
}
KeyFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: KeyFilter, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
KeyFilter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.4", type: KeyFilter, selector: "[pKeyFilter]", inputs: { pValidateOnly: "pValidateOnly", pattern: ["pKeyFilter", "pattern"] }, outputs: { ngModelChange: "ngModelChange" }, host: { listeners: { "input": "onInput($event)", "keypress": "onKeyPress($event)", "paste": "onPaste($event)" }, classAttribute: "p-element" }, providers: [KEYFILTER_VALIDATOR], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: KeyFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pKeyFilter]',
                    providers: [KEYFILTER_VALIDATOR],
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { pValidateOnly: [{
                type: Input
            }], ngModelChange: [{
                type: Output
            }], pattern: [{
                type: Input,
                args: ['pKeyFilter']
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onKeyPress: [{
                type: HostListener,
                args: ['keypress', ['$event']]
            }], onPaste: [{
                type: HostListener,
                args: ['paste', ['$event']]
            }] } });
export class KeyFilterModule {
}
KeyFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: KeyFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
KeyFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: KeyFilterModule, declarations: [KeyFilter], imports: [CommonModule], exports: [KeyFilter] });
KeyFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: KeyFilterModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: KeyFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [KeyFilter],
                    declarations: [KeyFilter]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2tleWZpbHRlci9rZXlmaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVJLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUUzRSxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBUTtJQUNwQyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN4QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRztJQUNsQixJQUFJLEVBQUUsTUFBTTtJQUNaLEdBQUcsRUFBRSxRQUFRO0lBQ2IsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsV0FBVztJQUNsQixHQUFHLEVBQUUsVUFBVTtJQUNmLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsS0FBSyxFQUFFLFNBQVM7SUFDaEIsUUFBUSxFQUFFLFlBQVk7Q0FDekIsQ0FBQztBQUVGLE1BQU0sSUFBSSxHQUFHO0lBQ1QsR0FBRyxFQUFFLENBQUM7SUFDTixNQUFNLEVBQUUsRUFBRTtJQUNWLEdBQUcsRUFBRSxFQUFFO0lBQ1AsU0FBUyxFQUFFLENBQUM7SUFDWixNQUFNLEVBQUUsRUFBRTtDQUNiLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRztJQUNoQixLQUFLLEVBQUUsRUFBRTtJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsS0FBSyxFQUFFLEVBQUU7SUFDVCxLQUFLLEVBQUUsRUFBRTtJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsS0FBSyxFQUFFLEVBQUU7SUFDVCxLQUFLLEVBQUUsRUFBRTtJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNO0NBQ25CLENBQUM7QUFTRixNQUFNLE9BQU8sU0FBUztJQWFsQixZQUFzQyxRQUFrQixFQUErQixVQUFlLEVBQVMsRUFBYztRQUF2RixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQStCLGVBQVUsR0FBVixVQUFVLENBQUs7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBVm5ILGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFXNUQsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDM0M7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBeUIsT0FBTyxDQUFDLFFBQWE7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDL0QsQ0FBQztJQUVELGFBQWEsQ0FBQyxDQUFnQjtRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2xCLENBQUMsR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0QsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxZQUFZLENBQUMsQ0FBZ0I7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRWhDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVOLENBQUM7SUFFRCxNQUFNLENBQUMsQ0FBZ0I7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE9BQU8sVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lB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QyxRQUFRLENBQUM7Z0JBOEJqQyxVQUFVO3NCQURULFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQStCcEMsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7QUErQnJDLE1BQU0sT0FBTyxlQUFlOzs0R0FBZixlQUFlOzZHQUFmLGVBQWUsaUJBeEtmLFNBQVMsYUFvS1IsWUFBWSxhQXBLYixTQUFTOzZHQXdLVCxlQUFlLFlBSmQsWUFBWTsyRkFJYixlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBjb25zdCBLRVlGSUxURVJfVkFMSURBVE9SOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gS2V5RmlsdGVyKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX01BU0tTID0ge1xyXG4gICAgcGludDogL1tcXGRdLyxcclxuICAgIGludDogL1tcXGRcXC1dLyxcclxuICAgIHBudW06IC9bXFxkXFwuXS8sXHJcbiAgICBtb25leTogL1tcXGRcXC5cXHMsXS8sXHJcbiAgICBudW06IC9bXFxkXFwtXFwuXS8sXHJcbiAgICBoZXg6IC9bMC05YS1mXS9pLFxyXG4gICAgZW1haWw6IC9bYS16MC05X1xcLlxcLUBdL2ksXHJcbiAgICBhbHBoYTogL1thLXpfXS9pLFxyXG4gICAgYWxwaGFudW06IC9bYS16MC05X10vaVxyXG59O1xyXG5cclxuY29uc3QgS0VZUyA9IHtcclxuICAgIFRBQjogOSxcclxuICAgIFJFVFVSTjogMTMsXHJcbiAgICBFU0M6IDI3LFxyXG4gICAgQkFDS1NQQUNFOiA4LFxyXG4gICAgREVMRVRFOiA0NlxyXG59O1xyXG5cclxuY29uc3QgU0FGQVJJX0tFWVMgPSB7XHJcbiAgICA2MzIzNDogMzcsIC8vIGxlZnRcclxuICAgIDYzMjM1OiAzOSwgLy8gcmlnaHRcclxuICAgIDYzMjMyOiAzOCwgLy8gdXBcclxuICAgIDYzMjMzOiA0MCwgLy8gZG93blxyXG4gICAgNjMyNzY6IDMzLCAvLyBwYWdlIHVwXHJcbiAgICA2MzI3NzogMzQsIC8vIHBhZ2UgZG93blxyXG4gICAgNjMyNzI6IDQ2LCAvLyBkZWxldGVcclxuICAgIDYzMjczOiAzNiwgLy8gaG9tZVxyXG4gICAgNjMyNzU6IDM1IC8vIGVuZFxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twS2V5RmlsdGVyXScsXHJcbiAgICBwcm92aWRlcnM6IFtLRVlGSUxURVJfVkFMSURBVE9SXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIEtleUZpbHRlciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcbiAgICBASW5wdXQoKSBwVmFsaWRhdGVPbmx5OiBib29sZWFuO1xyXG5cclxuICAgIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICByZWdleDogUmVnRXhwO1xyXG5cclxuICAgIF9wYXR0ZXJuOiBhbnk7XHJcblxyXG4gICAgaXNBbmRyb2lkOiBib29sZWFuO1xyXG5cclxuICAgIGxhc3RWYWx1ZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHVibGljIGVsOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0FuZHJvaWQgPSBEb21IYW5kbGVyLmlzQW5kcm9pZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBbmRyb2lkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXR0ZXJuKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdHRlcm47XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCdwS2V5RmlsdGVyJykgc2V0IHBhdHRlcm4oX3BhdHRlcm46IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3BhdHRlcm4gPSBfcGF0dGVybjtcclxuICAgICAgICB0aGlzLnJlZ2V4ID0gREVGQVVMVF9NQVNLU1t0aGlzLl9wYXR0ZXJuXSB8fCB0aGlzLl9wYXR0ZXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTmF2S2V5UHJlc3MoZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGxldCBrID0gZS5rZXlDb2RlO1xyXG4gICAgICAgIGsgPSBEb21IYW5kbGVyLmdldEJyb3dzZXIoKS5zYWZhcmkgPyBTQUZBUklfS0VZU1trXSB8fCBrIDogaztcclxuXHJcbiAgICAgICAgcmV0dXJuIChrID49IDMzICYmIGsgPD0gNDApIHx8IGsgPT0gS0VZUy5SRVRVUk4gfHwgayA9PSBLRVlTLlRBQiB8fCBrID09IEtFWVMuRVNDO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU3BlY2lhbEtleShlOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGsgPSBlLmtleUNvZGUgfHwgZS5jaGFyQ29kZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGsgPT0gOSB8fCBrID09IDEzIHx8IGsgPT0gMjcgfHwgayA9PSAxNiB8fCBrID09IDE3IHx8IChrID49IDE4ICYmIGsgPD0gMjApIHx8IChEb21IYW5kbGVyLmdldEJyb3dzZXIoKS5vcGVyYSAmJiAhZS5zaGlmdEtleSAmJiAoayA9PSA4IHx8IChrID49IDMzICYmIGsgPD0gMzUpIHx8IChrID49IDM2ICYmIGsgPD0gMzkpIHx8IChrID49IDQ0ICYmIGsgPD0gNDUpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0S2V5KGU6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBsZXQgayA9IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xyXG4gICAgICAgIHJldHVybiBEb21IYW5kbGVyLmdldEJyb3dzZXIoKS5zYWZhcmkgPyBTQUZBUklfS0VZU1trXSB8fCBrIDogaztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFyQ29kZShlOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZERlbHRhKHZhbHVlOiBzdHJpbmcsIHByZXZWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGRlbHRhID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IHZhbHVlLnN1YnN0cigwLCBpKSArIHZhbHVlLnN1YnN0cihpICsgdmFsdWUubGVuZ3RoIC0gcHJldlZhbHVlLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RyID09PSBwcmV2VmFsdWUpIGRlbHRhID0gdmFsdWUuc3Vic3RyKGksIHZhbHVlLmxlbmd0aCAtIHByZXZWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlbHRhO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVmFsaWRDaGFyKGM6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2V4LnRlc3QoYyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNWYWxpZFN0cmluZyhzdHI6IHN0cmluZykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkQ2hhcihzdHIuc3Vic3RyKGksIDEpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXHJcbiAgICBvbklucHV0KGU6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0FuZHJvaWQgJiYgIXRoaXMucFZhbGlkYXRlT25seSkge1xyXG4gICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgbGFzdFZhbCA9IHRoaXMubGFzdFZhbHVlIHx8ICcnO1xyXG5cclxuICAgICAgICAgICAgbGV0IGluc2VydGVkID0gdGhpcy5maW5kRGVsdGEodmFsLCBsYXN0VmFsKTtcclxuICAgICAgICAgICAgbGV0IHJlbW92ZWQgPSB0aGlzLmZpbmREZWx0YShsYXN0VmFsLCB2YWwpO1xyXG4gICAgICAgICAgICBsZXQgcGFzdGVkID0gaW5zZXJ0ZWQubGVuZ3RoID4gMSB8fCAoIWluc2VydGVkICYmICFyZW1vdmVkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkU3RyaW5nKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBsYXN0VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KGxhc3RWYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFyZW1vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZENoYXIoaW5zZXJ0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gbGFzdFZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdChsYXN0VmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU3RyaW5nKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQnXSlcclxuICAgIG9uS2V5UHJlc3MoZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQW5kcm9pZCB8fCB0aGlzLnBWYWxpZGF0ZU9ubHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJyb3dzZXIgPSBEb21IYW5kbGVyLmdldEJyb3dzZXIoKTtcclxuICAgICAgICBsZXQgayA9IHRoaXMuZ2V0S2V5KGUpO1xyXG5cclxuICAgICAgICBpZiAoYnJvd3Nlci5tb3ppbGxhICYmIChlLmN0cmxLZXkgfHwgZS5hbHRLZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKGsgPT0gMTcgfHwgayA9PSAxOCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYyA9IHRoaXMuZ2V0Q2hhckNvZGUoZSk7XHJcbiAgICAgICAgbGV0IGNjID0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcclxuICAgICAgICBsZXQgb2sgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIWJyb3dzZXIubW96aWxsYSAmJiAodGhpcy5pc1NwZWNpYWxLZXkoZSkgfHwgIWNjKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvayA9IHRoaXMucmVnZXgudGVzdChjYyk7XHJcblxyXG4gICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdwYXN0ZScsIFsnJGV2ZW50J10pXHJcbiAgICBvblBhc3RlKGUpIHtcclxuICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gZS5jbGlwYm9hcmREYXRhIHx8ICg8YW55PnRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcpLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpO1xyXG4gICAgICAgIGlmIChjbGlwYm9hcmREYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3RlZFRleHQgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2hhciBvZiBwYXN0ZWRUZXh0LnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWdleC50ZXN0KGNoYXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgICAgICBpZiAodGhpcy5wVmFsaWRhdGVPbmx5KSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLnJlZ2V4LnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUGF0dGVybjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtLZXlGaWx0ZXJdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbS2V5RmlsdGVyXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgS2V5RmlsdGVyTW9kdWxlIHt9XHJcbiJdfQ==