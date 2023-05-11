import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit, QueryList, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/inputtext";
import * as i3 from "primeng/autofocus";
import * as i4 from "primeng/icons/times";
import * as i5 from "primeng/api";
export declare const INPUTMASK_VALUE_ACCESSOR: any;
export declare class InputMask implements OnInit, ControlValueAccessor {
    private document;
    private platformId;
    el: ElementRef;
    cd: ChangeDetectorRef;
    type: string;
    slotChar: string;
    autoClear: boolean;
    showClear: boolean;
    style: any;
    inputId: string;
    styleClass: string;
    placeholder: string;
    size: number;
    maxlength: number;
    tabindex: string;
    title: string;
    ariaLabel: string;
    ariaRequired: boolean;
    disabled: boolean;
    readonly: boolean;
    unmask: boolean;
    name: string;
    required: boolean;
    characterPattern: string;
    autoFocus: boolean;
    autocomplete: string;
    keepBuffer: boolean;
    inputViewChild: ElementRef;
    onComplete: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onInput: EventEmitter<any>;
    onKeydown: EventEmitter<any>;
    onClear: EventEmitter<any>;
    templates: QueryList<any>;
    clearIconTemplate: TemplateRef<any>;
    value: any;
    _mask: string;
    onModelChange: Function;
    onModelTouched: Function;
    input: HTMLInputElement;
    filled: boolean;
    defs: any;
    tests: any[];
    partialPosition: any;
    firstNonMaskPos: number;
    lastRequiredNonMaskPos: any;
    len: number;
    oldVal: string;
    buffer: any;
    defaultBuffer: string;
    focusText: string;
    caretTimeoutId: any;
    androidChrome: boolean;
    focused: boolean;
    constructor(document: Document, platformId: any, el: ElementRef, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    get mask(): string;
    set mask(val: string);
    initMask(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    caret(first?: number, last?: number): {
        begin: any;
        end: any;
    };
    isCompleted(): boolean;
    getPlaceholder(i: number): string;
    seekNext(pos: any): any;
    seekPrev(pos: any): any;
    shiftL(begin: number, end: number): void;
    shiftR(pos: any): void;
    handleAndroidInput(e: any): void;
    onInputBlur(e: any): void;
    onInputKeydown(e: any): void;
    onKeyPress(e: any): void;
    clearBuffer(start: any, end: any): void;
    writeBuffer(): void;
    checkVal(allow?: boolean): any;
    onInputFocus(event: any): void;
    onInputChange(event: any): void;
    handleInputChange(event: any): void;
    getUnmaskedValue(): string;
    updateModel(e: any): void;
    updateFilledState(): void;
    focus(): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputMask, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputMask, "p-inputMask", never, { "type": "type"; "slotChar": "slotChar"; "autoClear": "autoClear"; "showClear": "showClear"; "style": "style"; "inputId": "inputId"; "styleClass": "styleClass"; "placeholder": "placeholder"; "size": "size"; "maxlength": "maxlength"; "tabindex": "tabindex"; "title": "title"; "ariaLabel": "ariaLabel"; "ariaRequired": "ariaRequired"; "disabled": "disabled"; "readonly": "readonly"; "unmask": "unmask"; "name": "name"; "required": "required"; "characterPattern": "characterPattern"; "autoFocus": "autoFocus"; "autocomplete": "autocomplete"; "keepBuffer": "keepBuffer"; "mask": "mask"; }, { "onComplete": "onComplete"; "onFocus": "onFocus"; "onBlur": "onBlur"; "onInput": "onInput"; "onKeydown": "onKeydown"; "onClear": "onClear"; }, ["templates"], never, false, never>;
}
export declare class InputMaskModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<InputMaskModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<InputMaskModule, [typeof InputMask], [typeof i1.CommonModule, typeof i2.InputTextModule, typeof i3.AutoFocusModule, typeof i4.TimesIcon], [typeof InputMask, typeof i5.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<InputMaskModule>;
}
