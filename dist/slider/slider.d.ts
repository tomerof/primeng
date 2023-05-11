import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare const SLIDER_VALUE_ACCESSOR: any;
export declare class Slider implements OnDestroy, ControlValueAccessor {
    private document;
    private platformId;
    el: ElementRef;
    renderer: Renderer2;
    private ngZone;
    cd: ChangeDetectorRef;
    animate: boolean;
    disabled: boolean;
    min: number;
    max: number;
    orientation: string;
    step: number;
    range: boolean;
    style: any;
    styleClass: string;
    ariaLabelledBy: string;
    tabindex: number;
    onChange: EventEmitter<any>;
    onSlideEnd: EventEmitter<any>;
    sliderHandle: ElementRef;
    sliderHandleStart: ElementRef;
    sliderHandleEnd: ElementRef;
    value: number;
    values: number[];
    handleValue: number;
    handleValues: number[];
    diff: number;
    offset: number;
    bottom: number;
    onModelChange: Function;
    onModelTouched: Function;
    dragging: boolean;
    dragListener: VoidFunction | null;
    mouseupListener: VoidFunction | null;
    initX: number;
    initY: number;
    barWidth: number;
    barHeight: number;
    sliderHandleClick: boolean;
    handleIndex: number;
    startHandleValue: any;
    startx: number;
    starty: number;
    constructor(document: Document, platformId: any, el: ElementRef, renderer: Renderer2, ngZone: NgZone, cd: ChangeDetectorRef);
    onMouseDown(event: any, index?: number): void;
    onTouchStart(event: any, index?: number): void;
    onTouchMove(event: any, index?: number): void;
    onTouchEnd(event: any, index?: number): void;
    onBarClick(event: any): void;
    onHandleKeydown(event: any, handleIndex?: number): void;
    spin(event: any, dir: number, handleIndex?: number): void;
    handleChange(event: Event): void;
    bindDragListeners(): void;
    unbindDragListeners(): void;
    setValueFromHandle(event: Event, handleValue: any): void;
    handleStepChange(newValue: number, oldValue: number): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    get rangeStartLeft(): string;
    get rangeStartBottom(): string;
    get rangeEndLeft(): string;
    get rangeEndBottom(): string;
    isVertical(): boolean;
    updateDomData(): void;
    calculateHandleValue(event: any): number;
    updateHandleValue(): void;
    updateDiffAndOffset(): void;
    getDiff(): number;
    getOffset(): number;
    updateValue(val: number, event?: Event): void;
    getValueFromHandle(handleValue: number): number;
    getDecimalsCount(value: number): number;
    getNormalizedValue(val: number): number;
    ngOnDestroy(): void;
    get minVal(): number;
    get maxVal(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<Slider, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Slider, "p-slider", never, { "animate": "animate"; "disabled": "disabled"; "min": "min"; "max": "max"; "orientation": "orientation"; "step": "step"; "range": "range"; "style": "style"; "styleClass": "styleClass"; "ariaLabelledBy": "ariaLabelledBy"; "tabindex": "tabindex"; }, { "onChange": "onChange"; "onSlideEnd": "onSlideEnd"; }, never, never, false, never>;
}
export declare class SliderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SliderModule, [typeof Slider], [typeof i1.CommonModule], [typeof Slider]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SliderModule>;
}
