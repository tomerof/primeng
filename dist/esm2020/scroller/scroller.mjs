import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { SpinnerIcon } from 'primeng/icons/spinner';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Scroller {
    constructor(document, platformId, renderer, cd, zone) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.onLazyLoad = new EventEmitter();
        this.onScroll = new EventEmitter();
        this.onScrollIndexChange = new EventEmitter();
        this._tabindex = 0;
        this._itemSize = 0;
        this._orientation = 'vertical';
        this._step = 0;
        this._delay = 0;
        this._resizeDelay = 10;
        this._appendOnly = false;
        this._inline = false;
        this._lazy = false;
        this._disabled = false;
        this._loaderDisabled = false;
        this._showSpacer = true;
        this._showLoader = false;
        this._autoSize = false;
        this.d_loading = false;
        this.first = 0;
        this.last = 0;
        this.page = 0;
        this.isRangeChanged = false;
        this.numItemsInViewport = 0;
        this.lastScrollPos = 0;
        this.lazyLoadState = {};
        this.loaderArr = [];
        this.spacerStyle = {};
        this.contentStyle = {};
        this.initialized = false;
    }
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
    }
    get style() {
        return this._style;
    }
    set style(val) {
        this._style = val;
    }
    get styleClass() {
        return this._styleClass;
    }
    set styleClass(val) {
        this._styleClass = val;
    }
    get tabindex() {
        return this._tabindex;
    }
    set tabindex(val) {
        this._tabindex = val;
    }
    get items() {
        return this._items;
    }
    set items(val) {
        this._items = val;
    }
    get itemSize() {
        return this._itemSize;
    }
    set itemSize(val) {
        this._itemSize = val;
    }
    get scrollHeight() {
        return this._scrollHeight;
    }
    set scrollHeight(val) {
        this._scrollHeight = val;
    }
    get scrollWidth() {
        return this._scrollWidth;
    }
    set scrollWidth(val) {
        this._scrollWidth = val;
    }
    get orientation() {
        return this._orientation;
    }
    set orientation(val) {
        this._orientation = val;
    }
    get step() {
        return this._step;
    }
    set step(val) {
        this._step = val;
    }
    get delay() {
        return this._delay;
    }
    set delay(val) {
        this._delay = val;
    }
    get resizeDelay() {
        return this._resizeDelay;
    }
    set resizeDelay(val) {
        this._resizeDelay = val;
    }
    get appendOnly() {
        return this._appendOnly;
    }
    set appendOnly(val) {
        this._appendOnly = val;
    }
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = val;
    }
    get lazy() {
        return this._lazy;
    }
    set lazy(val) {
        this._lazy = val;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
    }
    get loaderDisabled() {
        return this._loaderDisabled;
    }
    set loaderDisabled(val) {
        this._loaderDisabled = val;
    }
    get columns() {
        return this._columns;
    }
    set columns(val) {
        this._columns = val;
    }
    get showSpacer() {
        return this._showSpacer;
    }
    set showSpacer(val) {
        this._showSpacer = val;
    }
    get showLoader() {
        return this._showLoader;
    }
    set showLoader(val) {
        this._showLoader = val;
    }
    get numToleratedItems() {
        return this._numToleratedItems;
    }
    set numToleratedItems(val) {
        this._numToleratedItems = val;
    }
    get loading() {
        return this._loading;
    }
    set loading(val) {
        this._loading = val;
    }
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(val) {
        this._autoSize = val;
    }
    get trackBy() {
        return this._trackBy;
    }
    set trackBy(val) {
        this._trackBy = val;
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        if (val && typeof val === 'object') {
            Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
        }
    }
    get vertical() {
        return this._orientation === 'vertical';
    }
    get horizontal() {
        return this._orientation === 'horizontal';
    }
    get both() {
        return this._orientation === 'both';
    }
    get loadedItems() {
        if (this._items && !this.d_loading) {
            if (this.both)
                return this._items.slice(this._appendOnly ? 0 : this.first.rows, this.last.rows).map((item) => (this._columns ? item : item.slice(this._appendOnly ? 0 : this.first.cols, this.last.cols)));
            else if (this.horizontal && this._columns)
                return this._items;
            else
                return this._items.slice(this._appendOnly ? 0 : this.first, this.last);
        }
        return [];
    }
    get loadedRows() {
        return this.d_loading ? (this._loaderDisabled ? this.loaderArr : []) : this.loadedItems;
    }
    get loadedColumns() {
        if (this._columns && (this.both || this.horizontal)) {
            return this.d_loading && this._loaderDisabled ? (this.both ? this.loaderArr[0] : this.loaderArr) : this._columns.slice(this.both ? this.first.cols : this.first, this.both ? this.last.cols : this.last);
        }
        return this._columns;
    }
    get isPageChanged() {
        return this._step ? this.page !== this.getPageByFirst() : true;
    }
    ngOnInit() {
        this.setInitialState();
    }
    ngOnChanges(simpleChanges) {
        let isLoadingChanged = false;
        if (simpleChanges.loading) {
            const { previousValue, currentValue } = simpleChanges.loading;
            if (this.lazy && previousValue !== currentValue && currentValue !== this.d_loading) {
                this.d_loading = currentValue;
                isLoadingChanged = true;
            }
        }
        if (simpleChanges.orientation) {
            this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        }
        if (simpleChanges.numToleratedItems) {
            const { previousValue, currentValue } = simpleChanges.numToleratedItems;
            if (previousValue !== currentValue && currentValue !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue;
            }
        }
        if (simpleChanges.options) {
            const { previousValue, currentValue } = simpleChanges.options;
            if (this.lazy && previousValue?.loading !== currentValue?.loading && currentValue?.loading !== this.d_loading) {
                this.d_loading = currentValue.loading;
                isLoadingChanged = true;
            }
            if (previousValue?.numToleratedItems !== currentValue?.numToleratedItems && currentValue?.numToleratedItems !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue.numToleratedItems;
            }
        }
        if (this.initialized) {
            const isChanged = !isLoadingChanged && (simpleChanges.items?.previousValue?.length !== simpleChanges.items?.currentValue?.length || simpleChanges.itemSize || simpleChanges.scrollHeight || simpleChanges.scrollWidth);
            if (isChanged) {
                this.init();
                this.calculateAutoSize();
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'loadericon':
                    this.loaderIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this.viewInit();
        });
    }
    ngAfterViewChecked() {
        if (!this.initialized) {
            this.viewInit();
        }
    }
    ngOnDestroy() {
        this.unbindResizeListener();
        this.contentEl = null;
        this.initialized = false;
    }
    viewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
                this.setInitialState();
                this.setContentEl(this.contentEl);
                this.init();
                this.defaultWidth = DomHandler.getWidth(this.elementViewChild.nativeElement);
                this.defaultHeight = DomHandler.getHeight(this.elementViewChild.nativeElement);
                this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
                this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
                this.initialized = true;
            }
        }
    }
    init() {
        if (!this._disabled) {
            this.setSize();
            this.calculateOptions();
            this.setSpacerSize();
            this.bindResizeListener();
            this.cd.detectChanges();
        }
    }
    setContentEl(el) {
        this.contentEl = el || this.contentViewChild?.nativeElement || DomHandler.findSingle(this.elementViewChild?.nativeElement, '.p-scroller-content');
    }
    setInitialState() {
        this.first = this.both ? { rows: 0, cols: 0 } : 0;
        this.last = this.both ? { rows: 0, cols: 0 } : 0;
        this.numItemsInViewport = this.both ? { rows: 0, cols: 0 } : 0;
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.d_loading = this._loading || false;
        this.d_numToleratedItems = this._numToleratedItems;
        this.loaderArr = [];
        this.spacerStyle = {};
        this.contentStyle = {};
    }
    getElementRef() {
        return this.elementViewChild;
    }
    getPageByFirst() {
        return Math.floor((this.first + this.d_numToleratedItems * 4) / (this._step || 1));
    }
    scrollTo(options) {
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.elementViewChild?.nativeElement?.scrollTo(options);
    }
    scrollToIndex(index, behavior = 'auto') {
        const { numToleratedItems } = this.calculateNumItems();
        const contentPos = this.getContentPosition();
        const calculateFirst = (_index = 0, _numT) => (_index <= _numT ? 0 : _index);
        const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
        const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
        let newFirst = 0;
        if (this.both) {
            newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
            scrollTo(calculateCoord(newFirst.cols, this._itemSize[1], contentPos.left), calculateCoord(newFirst.rows, this._itemSize[0], contentPos.top));
        }
        else {
            newFirst = calculateFirst(index, numToleratedItems);
            this.horizontal ? scrollTo(calculateCoord(newFirst, this._itemSize, contentPos.left), 0) : scrollTo(0, calculateCoord(newFirst, this._itemSize, contentPos.top));
        }
        this.isRangeChanged = this.first !== newFirst;
        this.first = newFirst;
    }
    scrollInView(index, to, behavior = 'auto') {
        if (to) {
            const { first, viewport } = this.getRenderedRange();
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            const isToStart = to === 'to-start';
            const isToEnd = to === 'to-end';
            if (isToStart) {
                if (this.both) {
                    if (viewport.first.rows - first.rows > index[0]) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows - 1) * this._itemSize[0]);
                    }
                    else if (viewport.first.cols - first.cols > index[1]) {
                        scrollTo((viewport.first.cols - 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.first - first > index) {
                        const pos = (viewport.first - 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
            else if (isToEnd) {
                if (this.both) {
                    if (viewport.last.rows - first.rows <= index[0] + 1) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows + 1) * this._itemSize[0]);
                    }
                    else if (viewport.last.cols - first.cols <= index[1] + 1) {
                        scrollTo((viewport.first.cols + 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.last - first <= index + 1) {
                        const pos = (viewport.first + 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
        }
        else {
            this.scrollToIndex(index, behavior);
        }
    }
    getRenderedRange() {
        const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));
        let firstInViewport = this.first;
        let lastInViewport = 0;
        if (this.elementViewChild?.nativeElement) {
            const { scrollTop, scrollLeft } = this.elementViewChild.nativeElement;
            if (this.both) {
                firstInViewport = { rows: calculateFirstInViewport(scrollTop, this._itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this._itemSize[1]) };
                lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
            }
            else {
                const scrollPos = this.horizontal ? scrollLeft : scrollTop;
                firstInViewport = calculateFirstInViewport(scrollPos, this._itemSize);
                lastInViewport = firstInViewport + this.numItemsInViewport;
            }
        }
        return {
            first: this.first,
            last: this.last,
            viewport: {
                first: firstInViewport,
                last: lastInViewport
            }
        };
    }
    calculateNumItems() {
        const contentPos = this.getContentPosition();
        const contentWidth = this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetWidth - contentPos.left : 0;
        const contentHeight = this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetHeight - contentPos.top : 0;
        const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
        const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
        const numItemsInViewport = this.both
            ? { rows: calculateNumItemsInViewport(contentHeight, this._itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, this._itemSize[1]) }
            : calculateNumItemsInViewport(this.horizontal ? contentWidth : contentHeight, this._itemSize);
        const numToleratedItems = this.d_numToleratedItems || (this.both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
        return { numItemsInViewport, numToleratedItems };
    }
    calculateOptions() {
        const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
        const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
        const first = this.first;
        const last = this.both
            ? { rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true) }
            : calculateLast(this.first, numItemsInViewport, numToleratedItems);
        this.last = last;
        this.numItemsInViewport = numItemsInViewport;
        this.d_numToleratedItems = numToleratedItems;
        if (this.showLoader) {
            this.loaderArr = this.both ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
        }
        if (this._lazy) {
            Promise.resolve().then(() => {
                this.lazyLoadState = {
                    first: this._step ? (this.both ? { rows: 0, cols: first.cols } : 0) : first,
                    last: Math.min(this._step ? this._step : this.last, this.items.length)
                };
                this.handleEvents('onLazyLoad', this.lazyLoadState);
            });
        }
    }
    calculateAutoSize() {
        if (this._autoSize && !this.d_loading) {
            Promise.resolve().then(() => {
                if (this.contentEl) {
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = 'auto';
                    this.contentEl.style.position = 'relative';
                    this.elementViewChild.nativeElement.style.contain = 'none';
                    const [contentWidth, contentHeight] = [DomHandler.getWidth(this.contentEl), DomHandler.getHeight(this.contentEl)];
                    contentWidth !== this.defaultContentWidth && (this.elementViewChild.nativeElement.style.width = '');
                    contentHeight !== this.defaultContentHeight && (this.elementViewChild.nativeElement.style.height = '');
                    const [width, height] = [DomHandler.getWidth(this.elementViewChild.nativeElement), DomHandler.getHeight(this.elementViewChild.nativeElement)];
                    (this.both || this.horizontal) && (this.elementViewChild.nativeElement.style.width = width < this.defaultWidth ? width + 'px' : this._scrollWidth || this.defaultWidth + 'px');
                    (this.both || this.vertical) && (this.elementViewChild.nativeElement.style.height = height < this.defaultHeight ? height + 'px' : this._scrollHeight || this.defaultHeight + 'px');
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = '';
                    this.contentEl.style.position = '';
                    this.elementViewChild.nativeElement.style.contain = '';
                }
            });
        }
    }
    getLast(last = 0, isCols = false) {
        return this._items ? Math.min(isCols ? (this._columns || this._items[0]).length : this._items.length, last) : 0;
    }
    getContentPosition() {
        if (this.contentEl) {
            const style = getComputedStyle(this.contentEl);
            const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
            const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
            const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
            const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
            return { left, right, top, bottom, x: left + right, y: top + bottom };
        }
        return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    }
    setSize() {
        if (this.elementViewChild?.nativeElement) {
            const parentElement = this.elementViewChild.nativeElement.parentElement.parentElement;
            const width = this._scrollWidth || `${this.elementViewChild.nativeElement.offsetWidth || parentElement.offsetWidth}px`;
            const height = this._scrollHeight || `${this.elementViewChild.nativeElement.offsetHeight || parentElement.offsetHeight}px`;
            const setProp = (_name, _value) => (this.elementViewChild.nativeElement.style[_name] = _value);
            if (this.both || this.horizontal) {
                setProp('height', height);
                setProp('width', width);
            }
            else {
                setProp('height', height);
            }
        }
    }
    setSpacerSize() {
        if (this._items) {
            const contentPos = this.getContentPosition();
            const setProp = (_name, _value, _size, _cpos = 0) => (this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: (_value || []).length * _size + _cpos + 'px' } });
            if (this.both) {
                setProp('height', this._items, this._itemSize[0], contentPos.y);
                setProp('width', this._columns || this._items[1], this._itemSize[1], contentPos.x);
            }
            else {
                this.horizontal ? setProp('width', this._columns || this._items, this._itemSize, contentPos.x) : setProp('height', this._items, this._itemSize, contentPos.y);
            }
        }
    }
    setContentPosition(pos) {
        if (this.contentEl && !this._appendOnly) {
            const first = pos ? pos.first : this.first;
            const calculateTranslateVal = (_first, _size) => _first * _size;
            const setTransform = (_x = 0, _y = 0) => (this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } });
            if (this.both) {
                setTransform(calculateTranslateVal(first.cols, this._itemSize[1]), calculateTranslateVal(first.rows, this._itemSize[0]));
            }
            else {
                const translateVal = calculateTranslateVal(first, this._itemSize);
                this.horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
            }
        }
    }
    onScrollPositionChange(event) {
        const target = event.target;
        const contentPos = this.getContentPosition();
        const calculateScrollPos = (_pos, _cpos) => (_pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0);
        const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
        const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
        };
        const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            if (_currentIndex <= _numT)
                return 0;
            else
                return Math.max(0, _isScrollDownOrRight ? (_currentIndex < _triggerIndex ? _first : _currentIndex - _numT) : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
        };
        const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
            let lastValue = _first + _num + 2 * _numT;
            if (_currentIndex >= _numT) {
                lastValue += _numT + 1;
            }
            return this.getLast(lastValue, _isCols);
        };
        const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
        const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
        let newFirst = this.both ? { rows: 0, cols: 0 } : 0;
        let newLast = this.last;
        let isRangeChanged = false;
        let newScrollPos = this.lastScrollPos;
        if (this.both) {
            const isScrollDown = this.lastScrollPos.top <= scrollTop;
            const isScrollRight = this.lastScrollPos.left <= scrollLeft;
            if (!this._appendOnly || (this._appendOnly && (isScrollDown || isScrollRight))) {
                const currentIndex = { rows: calculateCurrentIndex(scrollTop, this._itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this._itemSize[1]) };
                const triggerIndex = {
                    rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newFirst = {
                    rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newLast = {
                    rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
                    cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
                };
                isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
                newScrollPos = { top: scrollTop, left: scrollLeft };
            }
        }
        else {
            const scrollPos = this.horizontal ? scrollLeft : scrollTop;
            const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
            if (!this._appendOnly || (this._appendOnly && isScrollDownOrRight)) {
                const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize);
                const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
                isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
                newScrollPos = scrollPos;
            }
        }
        return {
            first: newFirst,
            last: newLast,
            isRangeChanged,
            scrollPos: newScrollPos
        };
    }
    onScrollChange(event) {
        const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
        if (isRangeChanged) {
            const newState = { first, last };
            this.setContentPosition(newState);
            this.first = first;
            this.last = last;
            this.lastScrollPos = scrollPos;
            this.handleEvents('onScrollIndexChange', newState);
            if (this._lazy && this.isPageChanged) {
                const lazyLoadState = {
                    first: this._step ? Math.min(this.getPageByFirst() * this._step, this.items.length - this._step) : first,
                    last: Math.min(this._step ? (this.getPageByFirst() + 1) * this._step : last, this.items.length)
                };
                const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
                isLazyStateChanged && this.handleEvents('onLazyLoad', lazyLoadState);
                this.lazyLoadState = lazyLoadState;
            }
        }
    }
    onContainerScroll(event) {
        this.handleEvents('onScroll', { originalEvent: event });
        if (this._delay && this.isPageChanged) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            if (!this.d_loading && this.showLoader) {
                const { isRangeChanged } = this.onScrollPositionChange(event);
                const changed = isRangeChanged || (this._step ? this.isPageChanged : false);
                if (changed) {
                    this.d_loading = true;
                    this.cd.detectChanges();
                }
            }
            this.scrollTimeout = setTimeout(() => {
                this.onScrollChange(event);
                if (this.d_loading && this.showLoader && (!this._lazy || this._loading === undefined)) {
                    this.d_loading = false;
                    this.page = this.getPageByFirst();
                    this.cd.detectChanges();
                }
            }, this._delay);
        }
        else {
            !this.d_loading && this.onScrollChange(event);
        }
    }
    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.windowResizeListener) {
                this.zone.runOutsideAngular(() => {
                    const window = this.document.defaultView;
                    const event = DomHandler.isTouchDevice() ? 'orientationchange' : 'resize';
                    this.windowResizeListener = this.renderer.listen(window, event, this.onWindowResize.bind(this));
                });
            }
        }
    }
    unbindResizeListener() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }
    }
    onWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(() => {
            if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
                const [width, height] = [DomHandler.getWidth(this.elementViewChild.nativeElement), DomHandler.getHeight(this.elementViewChild.nativeElement)];
                const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
                const reinit = this.both ? isDiffWidth || isDiffHeight : this.horizontal ? isDiffWidth : this.vertical ? isDiffHeight : false;
                reinit &&
                    this.zone.run(() => {
                        this.d_numToleratedItems = this._numToleratedItems;
                        this.defaultWidth = width;
                        this.defaultHeight = height;
                        this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
                        this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
                        this.init();
                    });
            }
        }, this._resizeDelay);
    }
    handleEvents(name, params) {
        return this.options && this.options[name] ? this.options[name](params) : this[name].emit(params);
    }
    getContentOptions() {
        return {
            contentStyleClass: `p-scroller-content ${this.d_loading ? 'p-scroller-loading' : ''}`,
            items: this.loadedItems,
            getItemOptions: (index) => this.getOptions(index),
            loading: this.d_loading,
            getLoaderOptions: (index, options) => this.getLoaderOptions(index, options),
            itemSize: this._itemSize,
            rows: this.loadedRows,
            columns: this.loadedColumns,
            spacerStyle: this.spacerStyle,
            contentStyle: this.contentStyle,
            vertical: this.vertical,
            horizontal: this.horizontal,
            both: this.both
        };
    }
    getOptions(renderedIndex) {
        const count = (this._items || []).length;
        const index = this.both ? this.first.rows + renderedIndex : this.first + renderedIndex;
        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0
        };
    }
    getLoaderOptions(index, extOptions) {
        const count = this.loaderArr.length;
        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            ...extOptions
        };
    }
}
Scroller.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Scroller, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
Scroller.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: Scroller, selector: "p-scroller", inputs: { id: "id", style: "style", styleClass: "styleClass", tabindex: "tabindex", items: "items", itemSize: "itemSize", scrollHeight: "scrollHeight", scrollWidth: "scrollWidth", orientation: "orientation", step: "step", delay: "delay", resizeDelay: "resizeDelay", appendOnly: "appendOnly", inline: "inline", lazy: "lazy", disabled: "disabled", loaderDisabled: "loaderDisabled", columns: "columns", showSpacer: "showSpacer", showLoader: "showLoader", numToleratedItems: "numToleratedItems", loading: "loading", autoSize: "autoSize", trackBy: "trackBy", options: "options" }, outputs: { onLazyLoad: "onLazyLoad", onScroll: "onScroll", onScrollIndexChange: "onScrollIndexChange" }, host: { classAttribute: "p-scroller-viewport p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "elementViewChild", first: true, predicate: ["element"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon'"/>
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `, isInline: true, styles: ["p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(function () { return SpinnerIcon; }), selector: "SpinnerIcon" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: Scroller, decorators: [{
            type: Component,
            args: [{ selector: 'p-scroller', template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon'"/>
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `, changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-scroller-viewport p-element'
                    }, styles: ["p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { id: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], items: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], scrollWidth: [{
                type: Input
            }], orientation: [{
                type: Input
            }], step: [{
                type: Input
            }], delay: [{
                type: Input
            }], resizeDelay: [{
                type: Input
            }], appendOnly: [{
                type: Input
            }], inline: [{
                type: Input
            }], lazy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loaderDisabled: [{
                type: Input
            }], columns: [{
                type: Input
            }], showSpacer: [{
                type: Input
            }], showLoader: [{
                type: Input
            }], numToleratedItems: [{
                type: Input
            }], loading: [{
                type: Input
            }], autoSize: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], options: [{
                type: Input
            }], elementViewChild: [{
                type: ViewChild,
                args: ['element']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], onLazyLoad: [{
                type: Output
            }], onScroll: [{
                type: Output
            }], onScrollIndexChange: [{
                type: Output
            }] } });
export class ScrollerModule {
}
ScrollerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ScrollerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ScrollerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: ScrollerModule, declarations: [Scroller], imports: [CommonModule, SharedModule, SpinnerIcon], exports: [Scroller, SharedModule] });
ScrollerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ScrollerModule, imports: [CommonModule, SharedModule, SpinnerIcon, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ScrollerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, SpinnerIcon],
                    exports: [Scroller, SharedModule],
                    declarations: [Scroller]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xsZXIvc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUlSLE1BQU0sRUFDTixXQUFXLEVBS1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBMkZwRCxNQUFNLE9BQU8sUUFBUTtJQTBVakIsWUFBc0MsUUFBa0IsRUFBK0IsVUFBZSxFQUFVLFFBQW1CLEVBQVUsRUFBcUIsRUFBVSxJQUFZO1FBQWxKLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFoSjlLLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsd0JBQW1CLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFRdEUsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUl0QixjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBTW5CLGlCQUFZLEdBQVcsVUFBVSxDQUFDO1FBRWxDLFVBQUss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QUVZLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTtnQkFFcEIsVUFBVTtzQkFBbkIsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNO2dCQUVHLG1CQUFtQjtzQkFBNUIsTUFBTTs7QUE0dUJYLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBMTZCZCxRQUFRLGFBczZCUCxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsYUF0NkJ4QyxRQUFRLEVBdTZCRyxZQUFZOzRHQUd2QixjQUFjLFlBSmIsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQzdCLFlBQVk7MkZBR3ZCLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7b0JBQ2xELE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBQ2pDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBOZ01vZHVsZSxcclxuICAgIE5nWm9uZSxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIFBMQVRGT1JNX0lELFxyXG4gICAgUXVlcnlMaXN0LFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIFRlbXBsYXRlUmVmLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5pbXBvcnQgeyBTcGlubmVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Bpbm5lcic7XHJcblxyXG5leHBvcnQgdHlwZSBTY3JvbGxlclRvVHlwZSA9ICd0by1zdGFydCcgfCAndG8tZW5kJyB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCB0eXBlIFNjcm9sbGVyT3JpZW50YXRpb25UeXBlID0gJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyB8ICdib3RoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2Nyb2xsZXJPcHRpb25zIHtcclxuICAgIGlkPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgc3R5bGU/OiBhbnk7XHJcbiAgICBzdHlsZUNsYXNzPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgdGFiaW5kZXg/OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICBpdGVtcz86IGFueVtdO1xyXG4gICAgaXRlbVNpemU/OiBhbnk7XHJcbiAgICBzY3JvbGxIZWlnaHQ/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBzY3JvbGxXaWR0aD86IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuICAgIG9yaWVudGF0aW9uPzogU2Nyb2xsZXJPcmllbnRhdGlvblR5cGU7XHJcbiAgICBzdGVwPzogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgZGVsYXk/OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICByZXNpemVEZWxheT86IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICAgIGFwcGVuZE9ubHk/OiBib29sZWFuO1xyXG4gICAgaW5saW5lPzogYm9vbGVhbjtcclxuICAgIGxhenk/OiBib29sZWFuO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgbG9hZGVyRGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgY29sdW1ucz86IGFueVtdIHwgdW5kZWZpbmVkO1xyXG4gICAgc2hvd1NwYWNlcj86IGJvb2xlYW47XHJcbiAgICBzaG93TG9hZGVyPzogYm9vbGVhbjtcclxuICAgIG51bVRvbGVyYXRlZEl0ZW1zPzogYW55O1xyXG4gICAgbG9hZGluZz86IGJvb2xlYW47XHJcbiAgICBhdXRvU2l6ZT86IGJvb2xlYW47XHJcbiAgICB0cmFja0J5PzogYW55O1xyXG4gICAgb25MYXp5TG9hZD86IEZ1bmN0aW9uIHwgdW5kZWZpbmVkO1xyXG4gICAgb25TY3JvbGw/OiBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcclxuICAgIG9uU2Nyb2xsSW5kZXhDaGFuZ2U/OiBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Atc2Nyb2xsZXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIV9kaXNhYmxlZDsgZWxzZSBkaXNhYmxlZENvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAjZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiX2lkXCJcclxuICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIl9zdHlsZVwiXHJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwiX3N0eWxlQ2xhc3NcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1zY3JvbGxlcic6IHRydWUsICdwLXNjcm9sbGVyLWlubGluZSc6IGlubGluZSwgJ3AtYm90aC1zY3JvbGwnOiBib3RoLCAncC1ob3Jpem9udGFsLXNjcm9sbCc6IGhvcml6b250YWwgfVwiXHJcbiAgICAgICAgICAgICAgICAoc2Nyb2xsKT1cIm9uQ29udGFpbmVyU2Nyb2xsKCRldmVudClcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlOyBlbHNlIGJ1aWxkSW5Db250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGxvYWRlZEl0ZW1zLCBvcHRpb25zOiBnZXRDb250ZW50T3B0aW9ucygpIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNidWlsZEluQ29udGVudD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwicC1zY3JvbGxlci1jb250ZW50XCIgW25nQ2xhc3NdPVwieyAncC1zY3JvbGxlci1sb2FkaW5nJzogZF9sb2FkaW5nIH1cIiBbbmdTdHlsZV09XCJjb250ZW50U3R5bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBsb2FkZWRJdGVtczsgbGV0IGluZGV4ID0gaW5kZXg7IHRyYWNrQnk6IF90cmFja0J5IHx8IGluZGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSwgb3B0aW9uczogZ2V0T3B0aW9ucyhpbmRleCkgfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiX3Nob3dTcGFjZXJcIiBjbGFzcz1cInAtc2Nyb2xsZXItc3BhY2VyXCIgW25nU3R5bGVdPVwic3BhY2VyU3R5bGVcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhbG9hZGVyRGlzYWJsZWQgJiYgX3Nob3dMb2FkZXIgJiYgZF9sb2FkaW5nXCIgY2xhc3M9XCJwLXNjcm9sbGVyLWxvYWRlclwiIFtuZ0NsYXNzXT1cInsgJ3AtY29tcG9uZW50LW92ZXJsYXknOiAhbG9hZGVyVGVtcGxhdGUgfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkZXJUZW1wbGF0ZTsgZWxzZSBidWlsZEluTG9hZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbG9hZGVyQXJyOyBsZXQgaW5kZXggPSBpbmRleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxvYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7IG9wdGlvbnM6IGdldExvYWRlck9wdGlvbnMoaW5kZXgsIGJvdGggJiYgeyBudW1Db2xzOiBfbnVtSXRlbXNJblZpZXdwb3J0LmNvbHMgfSkgfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5Mb2FkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkZXJJY29uVGVtcGxhdGU7IGVsc2UgYnVpbGRJbkxvYWRlckljb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsb2FkZXJJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogeyBzdHlsZUNsYXNzOiAncC1zY3JvbGxlci1sb2FkaW5nLWljb24nIH0gfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNidWlsZEluTG9hZGVySWNvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBbc3R5bGVDbGFzc109XCIncC1zY3JvbGxlci1sb2FkaW5nLWljb24nXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICNkaXNhYmxlZENvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbXMsIG9wdGlvbnM6IHsgcm93czogX2l0ZW1zLCBjb2x1bW5zOiBsb2FkZWRDb2x1bW5zIH0gfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9zY3JvbGxlci5jc3MnXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICBjbGFzczogJ3Atc2Nyb2xsZXItdmlld3BvcnQgcC1lbGVtZW50J1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsZXIgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSBnZXQgaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgc2V0IGlkKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZTtcclxuICAgIH1cclxuICAgIHNldCBzdHlsZSh2YWw6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3N0eWxlID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBzdHlsZUNsYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZUNsYXNzO1xyXG4gICAgfVxyXG4gICAgc2V0IHN0eWxlQ2xhc3ModmFsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9zdHlsZUNsYXNzID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCB0YWJpbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGFiaW5kZXg7XHJcbiAgICB9XHJcbiAgICBzZXQgdGFiaW5kZXgodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90YWJpbmRleCA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgaXRlbXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG4gICAgfVxyXG4gICAgc2V0IGl0ZW1zKHZhbDogYW55W10pIHtcclxuICAgICAgICB0aGlzLl9pdGVtcyA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgaXRlbVNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1TaXplO1xyXG4gICAgfVxyXG4gICAgc2V0IGl0ZW1TaXplKHZhbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5faXRlbVNpemUgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHNjcm9sbEhlaWdodCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgc2V0IHNjcm9sbEhlaWdodCh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgc2Nyb2xsV2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbFdpZHRoO1xyXG4gICAgfVxyXG4gICAgc2V0IHNjcm9sbFdpZHRoKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsV2lkdGggPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IG9yaWVudGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcclxuICAgIH1cclxuICAgIHNldCBvcmllbnRhdGlvbih2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBzdGVwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xyXG4gICAgfVxyXG4gICAgc2V0IHN0ZXAodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBkZWxheSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVsYXk7XHJcbiAgICB9XHJcbiAgICBzZXQgZGVsYXkodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9kZWxheSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgcmVzaXplRGVsYXkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZURlbGF5O1xyXG4gICAgfVxyXG4gICAgc2V0IHJlc2l6ZURlbGF5KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzaXplRGVsYXkgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IGFwcGVuZE9ubHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGVuZE9ubHk7XHJcbiAgICB9XHJcbiAgICBzZXQgYXBwZW5kT25seSh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9hcHBlbmRPbmx5ID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBpbmxpbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubGluZTtcclxuICAgIH1cclxuICAgIHNldCBpbmxpbmUodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faW5saW5lID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBsYXp5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXp5O1xyXG4gICAgfVxyXG4gICAgc2V0IGxhenkodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fbGF6eSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gICAgfVxyXG4gICAgc2V0IGRpc2FibGVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBsb2FkZXJEaXNhYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyRGlzYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBzZXQgbG9hZGVyRGlzYWJsZWQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyRGlzYWJsZWQgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IGNvbHVtbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XHJcbiAgICB9XHJcbiAgICBzZXQgY29sdW1ucyh2YWw6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgc2hvd1NwYWNlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd1NwYWNlcjtcclxuICAgIH1cclxuICAgIHNldCBzaG93U3BhY2VyKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Nob3dTcGFjZXIgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHNob3dMb2FkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dMb2FkZXI7XHJcbiAgICB9XHJcbiAgICBzZXQgc2hvd0xvYWRlcih2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zaG93TG9hZGVyID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBudW1Ub2xlcmF0ZWRJdGVtcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtVG9sZXJhdGVkSXRlbXM7XHJcbiAgICB9XHJcbiAgICBzZXQgbnVtVG9sZXJhdGVkSXRlbXModmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9udW1Ub2xlcmF0ZWRJdGVtcyA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgbG9hZGluZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGluZztcclxuICAgIH1cclxuICAgIHNldCBsb2FkaW5nKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRpbmcgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IGF1dG9TaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2l6ZTtcclxuICAgIH1cclxuICAgIHNldCBhdXRvU2l6ZSh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9hdXRvU2l6ZSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgdHJhY2tCeSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tCeTtcclxuICAgIH1cclxuICAgIHNldCB0cmFja0J5KHZhbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2tCeSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuICAgIHNldCBvcHRpb25zKHZhbDogU2Nyb2xsZXJPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyh2YWwpLmZvckVhY2goKFtrLCB2XSkgPT4gdGhpc1tgXyR7a31gXSAhPT0gdiAmJiAodGhpc1tgXyR7a31gXSA9IHYpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnZWxlbWVudCcpIGVsZW1lbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25TY3JvbGw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblNjcm9sbEluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBfaWQ6IHN0cmluZztcclxuXHJcbiAgICBfc3R5bGU6IGFueTtcclxuXHJcbiAgICBfc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIF90YWJpbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfaXRlbXM6IGFueVtdO1xyXG5cclxuICAgIF9pdGVtU2l6ZTogYW55ID0gMDtcclxuXHJcbiAgICBfc2Nyb2xsSGVpZ2h0OiBzdHJpbmc7XHJcblxyXG4gICAgX3Njcm9sbFdpZHRoOiBzdHJpbmc7XHJcblxyXG4gICAgX29yaWVudGF0aW9uOiBzdHJpbmcgPSAndmVydGljYWwnO1xyXG5cclxuICAgIF9zdGVwOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIF9kZWxheTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfcmVzaXplRGVsYXk6IG51bWJlciA9IDEwO1xyXG5cclxuICAgIF9hcHBlbmRPbmx5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX2lubGluZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9sYXp5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX2xvYWRlckRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX2NvbHVtbnM6IGFueVtdO1xyXG5cclxuICAgIF9zaG93U3BhY2VyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBfc2hvd0xvYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9udW1Ub2xlcmF0ZWRJdGVtczogYW55O1xyXG5cclxuICAgIF9sb2FkaW5nOiBib29sZWFuO1xyXG5cclxuICAgIF9hdXRvU2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF90cmFja0J5OiBhbnk7XHJcblxyXG4gICAgX29wdGlvbnM6IFNjcm9sbGVyT3B0aW9ucztcclxuXHJcbiAgICBkX2xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBkX251bVRvbGVyYXRlZEl0ZW1zOiBhbnk7XHJcblxyXG4gICAgY29udGVudEVsOiBhbnk7XHJcblxyXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBsb2FkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBsb2FkZXJJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgZmlyc3Q6IGFueSA9IDA7XHJcblxyXG4gICAgbGFzdDogYW55ID0gMDtcclxuXHJcbiAgICBwYWdlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGlzUmFuZ2VDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgbnVtSXRlbXNJblZpZXdwb3J0OiBhbnkgPSAwO1xyXG5cclxuICAgIGxhc3RTY3JvbGxQb3M6IGFueSA9IDA7XHJcblxyXG4gICAgbGF6eUxvYWRTdGF0ZTogYW55ID0ge307XHJcblxyXG4gICAgbG9hZGVyQXJyOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHNwYWNlclN0eWxlOiBhbnkgPSB7fTtcclxuXHJcbiAgICBjb250ZW50U3R5bGU6IGFueSA9IHt9O1xyXG5cclxuICAgIHNjcm9sbFRpbWVvdXQ6IGFueTtcclxuXHJcbiAgICByZXNpemVUaW1lb3V0OiBhbnk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3dSZXNpemVMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbDtcclxuXHJcbiAgICBkZWZhdWx0V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICBkZWZhdWx0SGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgZGVmYXVsdENvbnRlbnRXaWR0aDogbnVtYmVyO1xyXG5cclxuICAgIGRlZmF1bHRDb250ZW50SGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgZ2V0IHZlcnRpY2FsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaG9yaXpvbnRhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYm90aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb24gPT09ICdib3RoJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbG9hZGVkSXRlbXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zICYmICF0aGlzLmRfbG9hZGluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ib3RoKSByZXR1cm4gdGhpcy5faXRlbXMuc2xpY2UodGhpcy5fYXBwZW5kT25seSA/IDAgOiB0aGlzLmZpcnN0LnJvd3MsIHRoaXMubGFzdC5yb3dzKS5tYXAoKGl0ZW0pID0+ICh0aGlzLl9jb2x1bW5zID8gaXRlbSA6IGl0ZW0uc2xpY2UodGhpcy5fYXBwZW5kT25seSA/IDAgOiB0aGlzLmZpcnN0LmNvbHMsIHRoaXMubGFzdC5jb2xzKSkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhvcml6b250YWwgJiYgdGhpcy5fY29sdW1ucykgcmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG4gICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLl9pdGVtcy5zbGljZSh0aGlzLl9hcHBlbmRPbmx5ID8gMCA6IHRoaXMuZmlyc3QsIHRoaXMubGFzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxvYWRlZFJvd3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZF9sb2FkaW5nID8gKHRoaXMuX2xvYWRlckRpc2FibGVkID8gdGhpcy5sb2FkZXJBcnIgOiBbXSkgOiB0aGlzLmxvYWRlZEl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsb2FkZWRDb2x1bW5zKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb2x1bW5zICYmICh0aGlzLmJvdGggfHwgdGhpcy5ob3Jpem9udGFsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kX2xvYWRpbmcgJiYgdGhpcy5fbG9hZGVyRGlzYWJsZWQgPyAodGhpcy5ib3RoID8gdGhpcy5sb2FkZXJBcnJbMF0gOiB0aGlzLmxvYWRlckFycikgOiB0aGlzLl9jb2x1bW5zLnNsaWNlKHRoaXMuYm90aCA/IHRoaXMuZmlyc3QuY29scyA6IHRoaXMuZmlyc3QsIHRoaXMuYm90aCA/IHRoaXMubGFzdC5jb2xzIDogdGhpcy5sYXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1BhZ2VDaGFuZ2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwID8gdGhpcy5wYWdlICE9PSB0aGlzLmdldFBhZ2VCeUZpcnN0KCkgOiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgbGV0IGlzTG9hZGluZ0NoYW5nZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMubG9hZGluZykge1xyXG4gICAgICAgICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSB9ID0gc2ltcGxlQ2hhbmdlcy5sb2FkaW5nO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSAmJiBwcmV2aW91c1ZhbHVlICE9PSBjdXJyZW50VmFsdWUgJiYgY3VycmVudFZhbHVlICE9PSB0aGlzLmRfbG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kX2xvYWRpbmcgPSBjdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmdDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMub3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zID0gdGhpcy5ib3RoID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlcy5udW1Ub2xlcmF0ZWRJdGVtcykge1xyXG4gICAgICAgICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSB9ID0gc2ltcGxlQ2hhbmdlcy5udW1Ub2xlcmF0ZWRJdGVtcztcclxuXHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlICE9PSBjdXJyZW50VmFsdWUgJiYgY3VycmVudFZhbHVlICE9PSB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyA9IGN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSB9ID0gc2ltcGxlQ2hhbmdlcy5vcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSAmJiBwcmV2aW91c1ZhbHVlPy5sb2FkaW5nICE9PSBjdXJyZW50VmFsdWU/LmxvYWRpbmcgJiYgY3VycmVudFZhbHVlPy5sb2FkaW5nICE9PSB0aGlzLmRfbG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kX2xvYWRpbmcgPSBjdXJyZW50VmFsdWUubG9hZGluZztcclxuICAgICAgICAgICAgICAgIGlzTG9hZGluZ0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZT8ubnVtVG9sZXJhdGVkSXRlbXMgIT09IGN1cnJlbnRWYWx1ZT8ubnVtVG9sZXJhdGVkSXRlbXMgJiYgY3VycmVudFZhbHVlPy5udW1Ub2xlcmF0ZWRJdGVtcyAhPT0gdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgPSBjdXJyZW50VmFsdWUubnVtVG9sZXJhdGVkSXRlbXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFpc0xvYWRpbmdDaGFuZ2VkICYmIChzaW1wbGVDaGFuZ2VzLml0ZW1zPy5wcmV2aW91c1ZhbHVlPy5sZW5ndGggIT09IHNpbXBsZUNoYW5nZXMuaXRlbXM/LmN1cnJlbnRWYWx1ZT8ubGVuZ3RoIHx8IHNpbXBsZUNoYW5nZXMuaXRlbVNpemUgfHwgc2ltcGxlQ2hhbmdlcy5zY3JvbGxIZWlnaHQgfHwgc2ltcGxlQ2hhbmdlcy5zY3JvbGxXaWR0aCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQXV0b1NpemUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVyaWNvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdJbml0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdJbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5iaW5kUmVzaXplTGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2aWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5pc1Zpc2libGUodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudEVsKHRoaXMuY29udGVudEVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdFdpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRDb250ZW50V2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKHRoaXMuY29udGVudEVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRlbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmNvbnRlbnRFbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlT3B0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNwYWNlclNpemUoKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kUmVzaXplTGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDb250ZW50RWwoZWw/OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsID0gZWwgfHwgdGhpcy5jb250ZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50IHx8IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQsICcucC1zY3JvbGxlci1jb250ZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuZmlyc3QgPSB0aGlzLmJvdGggPyB7IHJvd3M6IDAsIGNvbHM6IDAgfSA6IDA7XHJcbiAgICAgICAgdGhpcy5sYXN0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xyXG4gICAgICAgIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xyXG4gICAgICAgIHRoaXMubGFzdFNjcm9sbFBvcyA9IHRoaXMuYm90aCA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiAwO1xyXG4gICAgICAgIHRoaXMuZF9sb2FkaW5nID0gdGhpcy5fbG9hZGluZyB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgPSB0aGlzLl9udW1Ub2xlcmF0ZWRJdGVtcztcclxuICAgICAgICB0aGlzLmxvYWRlckFyciA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3BhY2VyU3R5bGUgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRTdHlsZSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRSZWYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFZpZXdDaGlsZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYWdlQnlGaXJzdCgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigodGhpcy5maXJzdCArIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyAqIDQpIC8gKHRoaXMuX3N0ZXAgfHwgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjcm9sbFRvKG9wdGlvbnM6IFNjcm9sbFRvT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMubGFzdFNjcm9sbFBvcyA9IHRoaXMuYm90aCA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiAwO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudD8uc2Nyb2xsVG8ob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsVG9JbmRleChpbmRleDogbnVtYmVyLCBiZWhhdmlvcjogU2Nyb2xsQmVoYXZpb3IgPSAnYXV0bycpIHtcclxuICAgICAgICBjb25zdCB7IG51bVRvbGVyYXRlZEl0ZW1zIH0gPSB0aGlzLmNhbGN1bGF0ZU51bUl0ZW1zKCk7XHJcbiAgICAgICAgY29uc3QgY29udGVudFBvcyA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlRmlyc3QgPSAoX2luZGV4ID0gMCwgX251bVQpID0+IChfaW5kZXggPD0gX251bVQgPyAwIDogX2luZGV4KTtcclxuICAgICAgICBjb25zdCBjYWxjdWxhdGVDb29yZCA9IChfZmlyc3QsIF9zaXplLCBfY3BvcykgPT4gX2ZpcnN0ICogX3NpemUgKyBfY3BvcztcclxuICAgICAgICBjb25zdCBzY3JvbGxUbyA9IChsZWZ0ID0gMCwgdG9wID0gMCkgPT4gdGhpcy5zY3JvbGxUbyh7IGxlZnQsIHRvcCwgYmVoYXZpb3IgfSk7XHJcbiAgICAgICAgbGV0IG5ld0ZpcnN0OiBhbnkgPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ib3RoKSB7XHJcbiAgICAgICAgICAgIG5ld0ZpcnN0ID0geyByb3dzOiBjYWxjdWxhdGVGaXJzdChpbmRleFswXSwgbnVtVG9sZXJhdGVkSXRlbXNbMF0pLCBjb2xzOiBjYWxjdWxhdGVGaXJzdChpbmRleFsxXSwgbnVtVG9sZXJhdGVkSXRlbXNbMV0pIH07XHJcbiAgICAgICAgICAgIHNjcm9sbFRvKGNhbGN1bGF0ZUNvb3JkKG5ld0ZpcnN0LmNvbHMsIHRoaXMuX2l0ZW1TaXplWzFdLCBjb250ZW50UG9zLmxlZnQpLCBjYWxjdWxhdGVDb29yZChuZXdGaXJzdC5yb3dzLCB0aGlzLl9pdGVtU2l6ZVswXSwgY29udGVudFBvcy50b3ApKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdGaXJzdCA9IGNhbGN1bGF0ZUZpcnN0KGluZGV4LCBudW1Ub2xlcmF0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbCA/IHNjcm9sbFRvKGNhbGN1bGF0ZUNvb3JkKG5ld0ZpcnN0LCB0aGlzLl9pdGVtU2l6ZSwgY29udGVudFBvcy5sZWZ0KSwgMCkgOiBzY3JvbGxUbygwLCBjYWxjdWxhdGVDb29yZChuZXdGaXJzdCwgdGhpcy5faXRlbVNpemUsIGNvbnRlbnRQb3MudG9wKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzUmFuZ2VDaGFuZ2VkID0gdGhpcy5maXJzdCAhPT0gbmV3Rmlyc3Q7XHJcbiAgICAgICAgdGhpcy5maXJzdCA9IG5ld0ZpcnN0O1xyXG4gICAgfVxyXG5cclxuICAgIHNjcm9sbEluVmlldyhpbmRleDogbnVtYmVyLCB0bzogU2Nyb2xsZXJUb1R5cGUsIGJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvciA9ICdhdXRvJykge1xyXG4gICAgICAgIGlmICh0bykge1xyXG4gICAgICAgICAgICBjb25zdCB7IGZpcnN0LCB2aWV3cG9ydCB9ID0gdGhpcy5nZXRSZW5kZXJlZFJhbmdlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbFRvID0gKGxlZnQgPSAwLCB0b3AgPSAwKSA9PiB0aGlzLnNjcm9sbFRvKHsgbGVmdCwgdG9wLCBiZWhhdmlvciB9KTtcclxuICAgICAgICAgICAgY29uc3QgaXNUb1N0YXJ0ID0gdG8gPT09ICd0by1zdGFydCc7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVG9FbmQgPSB0byA9PT0gJ3RvLWVuZCc7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNUb1N0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ib3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdwb3J0LmZpcnN0LnJvd3MgLSBmaXJzdC5yb3dzID4gaW5kZXhbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG8odmlld3BvcnQuZmlyc3QuY29scyAqIHRoaXMuX2l0ZW1TaXplWzFdLCAodmlld3BvcnQuZmlyc3Qucm93cyAtIDEpICogdGhpcy5faXRlbVNpemVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlld3BvcnQuZmlyc3QuY29scyAtIGZpcnN0LmNvbHMgPiBpbmRleFsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUbygodmlld3BvcnQuZmlyc3QuY29scyAtIDEpICogdGhpcy5faXRlbVNpemVbMV0sIHZpZXdwb3J0LmZpcnN0LnJvd3MgKiB0aGlzLl9pdGVtU2l6ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlld3BvcnQuZmlyc3QgLSBmaXJzdCA+IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9ICh2aWV3cG9ydC5maXJzdCAtIDEpICogdGhpcy5faXRlbVNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbCA/IHNjcm9sbFRvKHBvcywgMCkgOiBzY3JvbGxUbygwLCBwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1RvRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ib3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdwb3J0Lmxhc3Qucm93cyAtIGZpcnN0LnJvd3MgPD0gaW5kZXhbMF0gKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKHZpZXdwb3J0LmZpcnN0LmNvbHMgKiB0aGlzLl9pdGVtU2l6ZVsxXSwgKHZpZXdwb3J0LmZpcnN0LnJvd3MgKyAxKSAqIHRoaXMuX2l0ZW1TaXplWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpZXdwb3J0Lmxhc3QuY29scyAtIGZpcnN0LmNvbHMgPD0gaW5kZXhbMV0gKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKCh2aWV3cG9ydC5maXJzdC5jb2xzICsgMSkgKiB0aGlzLl9pdGVtU2l6ZVsxXSwgdmlld3BvcnQuZmlyc3Qucm93cyAqIHRoaXMuX2l0ZW1TaXplWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydC5sYXN0IC0gZmlyc3QgPD0gaW5kZXggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9ICh2aWV3cG9ydC5maXJzdCArIDEpICogdGhpcy5faXRlbVNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbCA/IHNjcm9sbFRvKHBvcywgMCkgOiBzY3JvbGxUbygwLCBwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9JbmRleChpbmRleCwgYmVoYXZpb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRSZW5kZXJlZFJhbmdlKCkge1xyXG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZUZpcnN0SW5WaWV3cG9ydCA9IChfcG9zLCBfc2l6ZSkgPT4gTWF0aC5mbG9vcihfcG9zIC8gKF9zaXplIHx8IF9wb3MpKTtcclxuXHJcbiAgICAgICAgbGV0IGZpcnN0SW5WaWV3cG9ydCA9IHRoaXMuZmlyc3Q7XHJcbiAgICAgICAgbGV0IGxhc3RJblZpZXdwb3J0OiBhbnkgPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0IH0gPSB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJvdGgpIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0SW5WaWV3cG9ydCA9IHsgcm93czogY2FsY3VsYXRlRmlyc3RJblZpZXdwb3J0KHNjcm9sbFRvcCwgdGhpcy5faXRlbVNpemVbMF0pLCBjb2xzOiBjYWxjdWxhdGVGaXJzdEluVmlld3BvcnQoc2Nyb2xsTGVmdCwgdGhpcy5faXRlbVNpemVbMV0pIH07XHJcbiAgICAgICAgICAgICAgICBsYXN0SW5WaWV3cG9ydCA9IHsgcm93czogZmlyc3RJblZpZXdwb3J0LnJvd3MgKyB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzLCBjb2xzOiBmaXJzdEluVmlld3BvcnQuY29scyArIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LmNvbHMgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbFBvcyA9IHRoaXMuaG9yaXpvbnRhbCA/IHNjcm9sbExlZnQgOiBzY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICBmaXJzdEluVmlld3BvcnQgPSBjYWxjdWxhdGVGaXJzdEluVmlld3BvcnQoc2Nyb2xsUG9zLCB0aGlzLl9pdGVtU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBsYXN0SW5WaWV3cG9ydCA9IGZpcnN0SW5WaWV3cG9ydCArIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcclxuICAgICAgICAgICAgbGFzdDogdGhpcy5sYXN0LFxyXG4gICAgICAgICAgICB2aWV3cG9ydDoge1xyXG4gICAgICAgICAgICAgICAgZmlyc3Q6IGZpcnN0SW5WaWV3cG9ydCxcclxuICAgICAgICAgICAgICAgIGxhc3Q6IGxhc3RJblZpZXdwb3J0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZU51bUl0ZW1zKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRQb3MgPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRXaWR0aCA9IHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCA/IHRoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC0gY29udGVudFBvcy5sZWZ0IDogMDtcclxuICAgICAgICBjb25zdCBjb250ZW50SGVpZ2h0ID0gdGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50ID8gdGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gY29udGVudFBvcy50b3AgOiAwO1xyXG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZU51bUl0ZW1zSW5WaWV3cG9ydCA9IChfY29udGVudFNpemUsIF9pdGVtU2l6ZSkgPT4gTWF0aC5jZWlsKF9jb250ZW50U2l6ZSAvIChfaXRlbVNpemUgfHwgX2NvbnRlbnRTaXplKSk7XHJcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTnVtVG9sZXJhdGVkSXRlbXMgPSAoX251bUl0ZW1zKSA9PiBNYXRoLmNlaWwoX251bUl0ZW1zIC8gMik7XHJcbiAgICAgICAgY29uc3QgbnVtSXRlbXNJblZpZXdwb3J0OiBhbnkgPSB0aGlzLmJvdGhcclxuICAgICAgICAgICAgPyB7IHJvd3M6IGNhbGN1bGF0ZU51bUl0ZW1zSW5WaWV3cG9ydChjb250ZW50SGVpZ2h0LCB0aGlzLl9pdGVtU2l6ZVswXSksIGNvbHM6IGNhbGN1bGF0ZU51bUl0ZW1zSW5WaWV3cG9ydChjb250ZW50V2lkdGgsIHRoaXMuX2l0ZW1TaXplWzFdKSB9XHJcbiAgICAgICAgICAgIDogY2FsY3VsYXRlTnVtSXRlbXNJblZpZXdwb3J0KHRoaXMuaG9yaXpvbnRhbCA/IGNvbnRlbnRXaWR0aCA6IGNvbnRlbnRIZWlnaHQsIHRoaXMuX2l0ZW1TaXplKTtcclxuXHJcbiAgICAgICAgY29uc3QgbnVtVG9sZXJhdGVkSXRlbXMgPSB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgfHwgKHRoaXMuYm90aCA/IFtjYWxjdWxhdGVOdW1Ub2xlcmF0ZWRJdGVtcyhudW1JdGVtc0luVmlld3BvcnQucm93cyksIGNhbGN1bGF0ZU51bVRvbGVyYXRlZEl0ZW1zKG51bUl0ZW1zSW5WaWV3cG9ydC5jb2xzKV0gOiBjYWxjdWxhdGVOdW1Ub2xlcmF0ZWRJdGVtcyhudW1JdGVtc0luVmlld3BvcnQpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgbnVtSXRlbXNJblZpZXdwb3J0LCBudW1Ub2xlcmF0ZWRJdGVtcyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZU9wdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBudW1JdGVtc0luVmlld3BvcnQsIG51bVRvbGVyYXRlZEl0ZW1zIH0gPSB0aGlzLmNhbGN1bGF0ZU51bUl0ZW1zKCk7XHJcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTGFzdCA9IChfZmlyc3QsIF9udW0sIF9udW1ULCBfaXNDb2xzID0gZmFsc2UpID0+IHRoaXMuZ2V0TGFzdChfZmlyc3QgKyBfbnVtICsgKF9maXJzdCA8IF9udW1UID8gMiA6IDMpICogX251bVQsIF9pc0NvbHMpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5maXJzdDtcclxuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5ib3RoXHJcbiAgICAgICAgICAgID8geyByb3dzOiBjYWxjdWxhdGVMYXN0KHRoaXMuZmlyc3Qucm93cywgbnVtSXRlbXNJblZpZXdwb3J0LnJvd3MsIG51bVRvbGVyYXRlZEl0ZW1zWzBdKSwgY29sczogY2FsY3VsYXRlTGFzdCh0aGlzLmZpcnN0LmNvbHMsIG51bUl0ZW1zSW5WaWV3cG9ydC5jb2xzLCBudW1Ub2xlcmF0ZWRJdGVtc1sxXSwgdHJ1ZSkgfVxyXG4gICAgICAgICAgICA6IGNhbGN1bGF0ZUxhc3QodGhpcy5maXJzdCwgbnVtSXRlbXNJblZpZXdwb3J0LCBudW1Ub2xlcmF0ZWRJdGVtcyk7XHJcblxyXG4gICAgICAgIHRoaXMubGFzdCA9IGxhc3Q7XHJcbiAgICAgICAgdGhpcy5udW1JdGVtc0luVmlld3BvcnQgPSBudW1JdGVtc0luVmlld3BvcnQ7XHJcbiAgICAgICAgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zID0gbnVtVG9sZXJhdGVkSXRlbXM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNob3dMb2FkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXJBcnIgPSB0aGlzLmJvdGggPyBBcnJheS5mcm9tKHsgbGVuZ3RoOiBudW1JdGVtc0luVmlld3BvcnQucm93cyB9KS5tYXAoKCkgPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtSXRlbXNJblZpZXdwb3J0LmNvbHMgfSkpIDogQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtSXRlbXNJblZpZXdwb3J0IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2xhenkpIHtcclxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhenlMb2FkU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMuX3N0ZXAgPyAodGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiBmaXJzdC5jb2xzIH0gOiAwKSA6IGZpcnN0LFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3Q6IE1hdGgubWluKHRoaXMuX3N0ZXAgPyB0aGlzLl9zdGVwIDogdGhpcy5sYXN0LCB0aGlzLml0ZW1zLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoJ29uTGF6eUxvYWQnLCB0aGlzLmxhenlMb2FkU3RhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlQXV0b1NpemUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9TaXplICYmICF0aGlzLmRfbG9hZGluZykge1xyXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnRFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLm1pbkhlaWdodCA9IHRoaXMuY29udGVudEVsLnN0eWxlLm1pbldpZHRoID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5jb250YWluID0gJ25vbmUnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBbY29udGVudFdpZHRoLCBjb250ZW50SGVpZ2h0XSA9IFtEb21IYW5kbGVyLmdldFdpZHRoKHRoaXMuY29udGVudEVsKSwgRG9tSGFuZGxlci5nZXRIZWlnaHQodGhpcy5jb250ZW50RWwpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50V2lkdGggIT09IHRoaXMuZGVmYXVsdENvbnRlbnRXaWR0aCAmJiAodGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEhlaWdodCAhPT0gdGhpcy5kZWZhdWx0Q29udGVudEhlaWdodCAmJiAodGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBbRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCksIERvbUhhbmRsZXIuZ2V0SGVpZ2h0KHRoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KV07XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuYm90aCB8fCB0aGlzLmhvcml6b250YWwpICYmICh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoIDwgdGhpcy5kZWZhdWx0V2lkdGggPyB3aWR0aCArICdweCcgOiB0aGlzLl9zY3JvbGxXaWR0aCB8fCB0aGlzLmRlZmF1bHRXaWR0aCArICdweCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmJvdGggfHwgdGhpcy52ZXJ0aWNhbCkgJiYgKHRoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCA8IHRoaXMuZGVmYXVsdEhlaWdodCA/IGhlaWdodCArICdweCcgOiB0aGlzLl9zY3JvbGxIZWlnaHQgfHwgdGhpcy5kZWZhdWx0SGVpZ2h0ICsgJ3B4Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLm1pbkhlaWdodCA9IHRoaXMuY29udGVudEVsLnN0eWxlLm1pbldpZHRoID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50RWwuc3R5bGUucG9zaXRpb24gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5jb250YWluID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0KGxhc3QgPSAwLCBpc0NvbHMgPSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcyA/IE1hdGgubWluKGlzQ29scyA/ICh0aGlzLl9jb2x1bW5zIHx8IHRoaXMuX2l0ZW1zWzBdKS5sZW5ndGggOiB0aGlzLl9pdGVtcy5sZW5ndGgsIGxhc3QpIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb250ZW50UG9zaXRpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudEVsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRlbnRFbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIE1hdGgubWF4KHBhcnNlRmxvYXQoc3R5bGUubGVmdCkgfHwgMCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nUmlnaHQpICsgTWF0aC5tYXgocGFyc2VGbG9hdChzdHlsZS5yaWdodCkgfHwgMCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvcCA9IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1RvcCkgKyBNYXRoLm1heChwYXJzZUZsb2F0KHN0eWxlLnRvcCkgfHwgMCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbSA9IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSkgKyBNYXRoLm1heChwYXJzZUZsb2F0KHN0eWxlLmJvdHRvbSkgfHwgMCwgMCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHg6IGxlZnQgKyByaWdodCwgeTogdG9wICsgYm90dG9tIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiAwLCBib3R0b206IDAsIHg6IDAsIHk6IDAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaXplKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLl9zY3JvbGxXaWR0aCB8fCBgJHt0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCBwYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRofXB4YDtcclxuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5fc2Nyb2xsSGVpZ2h0IHx8IGAke3RoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCB8fCBwYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weGA7XHJcbiAgICAgICAgICAgIGNvbnN0IHNldFByb3AgPSAoX25hbWUsIF92YWx1ZSkgPT4gKHRoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlW19uYW1lXSA9IF92YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ib3RoIHx8IHRoaXMuaG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UHJvcCgnaGVpZ2h0JywgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHNldFByb3AoJ3dpZHRoJywgd2lkdGgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0UHJvcCgnaGVpZ2h0JywgaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRTcGFjZXJTaXplKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pdGVtcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50UG9zID0gdGhpcy5nZXRDb250ZW50UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3Qgc2V0UHJvcCA9IChfbmFtZSwgX3ZhbHVlLCBfc2l6ZSwgX2Nwb3MgPSAwKSA9PiAodGhpcy5zcGFjZXJTdHlsZSA9IHsgLi4udGhpcy5zcGFjZXJTdHlsZSwgLi4ueyBbYCR7X25hbWV9YF06IChfdmFsdWUgfHwgW10pLmxlbmd0aCAqIF9zaXplICsgX2Nwb3MgKyAncHgnIH0gfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ib3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQcm9wKCdoZWlnaHQnLCB0aGlzLl9pdGVtcywgdGhpcy5faXRlbVNpemVbMF0sIGNvbnRlbnRQb3MueSk7XHJcbiAgICAgICAgICAgICAgICBzZXRQcm9wKCd3aWR0aCcsIHRoaXMuX2NvbHVtbnMgfHwgdGhpcy5faXRlbXNbMV0sIHRoaXMuX2l0ZW1TaXplWzFdLCBjb250ZW50UG9zLngpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsID8gc2V0UHJvcCgnd2lkdGgnLCB0aGlzLl9jb2x1bW5zIHx8IHRoaXMuX2l0ZW1zLCB0aGlzLl9pdGVtU2l6ZSwgY29udGVudFBvcy54KSA6IHNldFByb3AoJ2hlaWdodCcsIHRoaXMuX2l0ZW1zLCB0aGlzLl9pdGVtU2l6ZSwgY29udGVudFBvcy55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDb250ZW50UG9zaXRpb24ocG9zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudEVsICYmICF0aGlzLl9hcHBlbmRPbmx5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gcG9zID8gcG9zLmZpcnN0IDogdGhpcy5maXJzdDtcclxuICAgICAgICAgICAgY29uc3QgY2FsY3VsYXRlVHJhbnNsYXRlVmFsID0gKF9maXJzdCwgX3NpemUpID0+IF9maXJzdCAqIF9zaXplO1xyXG4gICAgICAgICAgICBjb25zdCBzZXRUcmFuc2Zvcm0gPSAoX3ggPSAwLCBfeSA9IDApID0+ICh0aGlzLmNvbnRlbnRTdHlsZSA9IHsgLi4udGhpcy5jb250ZW50U3R5bGUsIC4uLnsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHtfeH1weCwgJHtfeX1weCwgMClgIH0gfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ib3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2Zvcm0oY2FsY3VsYXRlVHJhbnNsYXRlVmFsKGZpcnN0LmNvbHMsIHRoaXMuX2l0ZW1TaXplWzFdKSwgY2FsY3VsYXRlVHJhbnNsYXRlVmFsKGZpcnN0LnJvd3MsIHRoaXMuX2l0ZW1TaXplWzBdKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2xhdGVWYWwgPSBjYWxjdWxhdGVUcmFuc2xhdGVWYWwoZmlyc3QsIHRoaXMuX2l0ZW1TaXplKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbCA/IHNldFRyYW5zZm9ybSh0cmFuc2xhdGVWYWwsIDApIDogc2V0VHJhbnNmb3JtKDAsIHRyYW5zbGF0ZVZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TY3JvbGxQb3NpdGlvbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBjb25zdCBjb250ZW50UG9zID0gdGhpcy5nZXRDb250ZW50UG9zaXRpb24oKTtcclxuICAgICAgICBjb25zdCBjYWxjdWxhdGVTY3JvbGxQb3MgPSAoX3BvcywgX2Nwb3MpID0+IChfcG9zID8gKF9wb3MgPiBfY3BvcyA/IF9wb3MgLSBfY3BvcyA6IF9wb3MpIDogMCk7XHJcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlQ3VycmVudEluZGV4ID0gKF9wb3MsIF9zaXplKSA9PiBNYXRoLmZsb29yKF9wb3MgLyAoX3NpemUgfHwgX3BvcykpO1xyXG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZVRyaWdnZXJJbmRleCA9IChfY3VycmVudEluZGV4LCBfZmlyc3QsIF9sYXN0LCBfbnVtLCBfbnVtVCwgX2lzU2Nyb2xsRG93bk9yUmlnaHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jdXJyZW50SW5kZXggPD0gX251bVQgPyBfbnVtVCA6IF9pc1Njcm9sbERvd25PclJpZ2h0ID8gX2xhc3QgLSBfbnVtIC0gX251bVQgOiBfZmlyc3QgKyBfbnVtVCAtIDE7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBjYWxjdWxhdGVGaXJzdCA9IChfY3VycmVudEluZGV4LCBfdHJpZ2dlckluZGV4LCBfZmlyc3QsIF9sYXN0LCBfbnVtLCBfbnVtVCwgX2lzU2Nyb2xsRG93bk9yUmlnaHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKF9jdXJyZW50SW5kZXggPD0gX251bVQpIHJldHVybiAwO1xyXG4gICAgICAgICAgICBlbHNlIHJldHVybiBNYXRoLm1heCgwLCBfaXNTY3JvbGxEb3duT3JSaWdodCA/IChfY3VycmVudEluZGV4IDwgX3RyaWdnZXJJbmRleCA/IF9maXJzdCA6IF9jdXJyZW50SW5kZXggLSBfbnVtVCkgOiBfY3VycmVudEluZGV4ID4gX3RyaWdnZXJJbmRleCA/IF9maXJzdCA6IF9jdXJyZW50SW5kZXggLSAyICogX251bVQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTGFzdCA9IChfY3VycmVudEluZGV4LCBfZmlyc3QsIF9sYXN0LCBfbnVtLCBfbnVtVCwgX2lzQ29scyA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsYXN0VmFsdWUgPSBfZmlyc3QgKyBfbnVtICsgMiAqIF9udW1UO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9jdXJyZW50SW5kZXggPj0gX251bVQpIHtcclxuICAgICAgICAgICAgICAgIGxhc3RWYWx1ZSArPSBfbnVtVCArIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldExhc3QobGFzdFZhbHVlLCBfaXNDb2xzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSBjYWxjdWxhdGVTY3JvbGxQb3ModGFyZ2V0LnNjcm9sbFRvcCwgY29udGVudFBvcy50b3ApO1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSBjYWxjdWxhdGVTY3JvbGxQb3ModGFyZ2V0LnNjcm9sbExlZnQsIGNvbnRlbnRQb3MubGVmdCk7XHJcblxyXG4gICAgICAgIGxldCBuZXdGaXJzdCA9IHRoaXMuYm90aCA/IHsgcm93czogMCwgY29sczogMCB9IDogMDtcclxuICAgICAgICBsZXQgbmV3TGFzdCA9IHRoaXMubGFzdDtcclxuICAgICAgICBsZXQgaXNSYW5nZUNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgbmV3U2Nyb2xsUG9zID0gdGhpcy5sYXN0U2Nyb2xsUG9zO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ib3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU2Nyb2xsRG93biA9IHRoaXMubGFzdFNjcm9sbFBvcy50b3AgPD0gc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBjb25zdCBpc1Njcm9sbFJpZ2h0ID0gdGhpcy5sYXN0U2Nyb2xsUG9zLmxlZnQgPD0gc2Nyb2xsTGVmdDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fYXBwZW5kT25seSB8fCAodGhpcy5fYXBwZW5kT25seSAmJiAoaXNTY3JvbGxEb3duIHx8IGlzU2Nyb2xsUmlnaHQpKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0geyByb3dzOiBjYWxjdWxhdGVDdXJyZW50SW5kZXgoc2Nyb2xsVG9wLCB0aGlzLl9pdGVtU2l6ZVswXSksIGNvbHM6IGNhbGN1bGF0ZUN1cnJlbnRJbmRleChzY3JvbGxMZWZ0LCB0aGlzLl9pdGVtU2l6ZVsxXSkgfTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJJbmRleCA9IHtcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiBjYWxjdWxhdGVUcmlnZ2VySW5kZXgoY3VycmVudEluZGV4LnJvd3MsIHRoaXMuZmlyc3Qucm93cywgdGhpcy5sYXN0LnJvd3MsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LnJvd3MsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtc1swXSwgaXNTY3JvbGxEb3duKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xzOiBjYWxjdWxhdGVUcmlnZ2VySW5kZXgoY3VycmVudEluZGV4LmNvbHMsIHRoaXMuZmlyc3QuY29scywgdGhpcy5sYXN0LmNvbHMsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LmNvbHMsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtc1sxXSwgaXNTY3JvbGxSaWdodClcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbmV3Rmlyc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogY2FsY3VsYXRlRmlyc3QoY3VycmVudEluZGV4LnJvd3MsIHRyaWdnZXJJbmRleC5yb3dzLCB0aGlzLmZpcnN0LnJvd3MsIHRoaXMubGFzdC5yb3dzLCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzLCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXNbMF0sIGlzU2Nyb2xsRG93biksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sczogY2FsY3VsYXRlRmlyc3QoY3VycmVudEluZGV4LmNvbHMsIHRyaWdnZXJJbmRleC5jb2xzLCB0aGlzLmZpcnN0LmNvbHMsIHRoaXMubGFzdC5jb2xzLCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5jb2xzLCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXNbMV0sIGlzU2Nyb2xsUmlnaHQpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbmV3TGFzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiBjYWxjdWxhdGVMYXN0KGN1cnJlbnRJbmRleC5yb3dzLCBuZXdGaXJzdC5yb3dzLCB0aGlzLmxhc3Qucm93cywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQucm93cywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzBdKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xzOiBjYWxjdWxhdGVMYXN0KGN1cnJlbnRJbmRleC5jb2xzLCBuZXdGaXJzdC5jb2xzLCB0aGlzLmxhc3QuY29scywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQuY29scywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzFdLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBpc1JhbmdlQ2hhbmdlZCA9IG5ld0ZpcnN0LnJvd3MgIT09IHRoaXMuZmlyc3Qucm93cyB8fCBuZXdMYXN0LnJvd3MgIT09IHRoaXMubGFzdC5yb3dzIHx8IG5ld0ZpcnN0LmNvbHMgIT09IHRoaXMuZmlyc3QuY29scyB8fCBuZXdMYXN0LmNvbHMgIT09IHRoaXMubGFzdC5jb2xzIHx8IHRoaXMuaXNSYW5nZUNoYW5nZWQ7XHJcbiAgICAgICAgICAgICAgICBuZXdTY3JvbGxQb3MgPSB7IHRvcDogc2Nyb2xsVG9wLCBsZWZ0OiBzY3JvbGxMZWZ0IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxQb3MgPSB0aGlzLmhvcml6b250YWwgPyBzY3JvbGxMZWZ0IDogc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBjb25zdCBpc1Njcm9sbERvd25PclJpZ2h0ID0gdGhpcy5sYXN0U2Nyb2xsUG9zIDw9IHNjcm9sbFBvcztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fYXBwZW5kT25seSB8fCAodGhpcy5fYXBwZW5kT25seSAmJiBpc1Njcm9sbERvd25PclJpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gY2FsY3VsYXRlQ3VycmVudEluZGV4KHNjcm9sbFBvcywgdGhpcy5faXRlbVNpemUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJpZ2dlckluZGV4ID0gY2FsY3VsYXRlVHJpZ2dlckluZGV4KGN1cnJlbnRJbmRleCwgdGhpcy5maXJzdCwgdGhpcy5sYXN0LCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydCwgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zLCBpc1Njcm9sbERvd25PclJpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXdGaXJzdCA9IGNhbGN1bGF0ZUZpcnN0KGN1cnJlbnRJbmRleCwgdHJpZ2dlckluZGV4LCB0aGlzLmZpcnN0LCB0aGlzLmxhc3QsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMsIGlzU2Nyb2xsRG93bk9yUmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgbmV3TGFzdCA9IGNhbGN1bGF0ZUxhc3QoY3VycmVudEluZGV4LCBuZXdGaXJzdCwgdGhpcy5sYXN0LCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydCwgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIGlzUmFuZ2VDaGFuZ2VkID0gbmV3Rmlyc3QgIT09IHRoaXMuZmlyc3QgfHwgbmV3TGFzdCAhPT0gdGhpcy5sYXN0IHx8IHRoaXMuaXNSYW5nZUNoYW5nZWQ7XHJcbiAgICAgICAgICAgICAgICBuZXdTY3JvbGxQb3MgPSBzY3JvbGxQb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZpcnN0OiBuZXdGaXJzdCxcclxuICAgICAgICAgICAgbGFzdDogbmV3TGFzdCxcclxuICAgICAgICAgICAgaXNSYW5nZUNoYW5nZWQsXHJcbiAgICAgICAgICAgIHNjcm9sbFBvczogbmV3U2Nyb2xsUG9zXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBvblNjcm9sbENoYW5nZShldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHsgZmlyc3QsIGxhc3QsIGlzUmFuZ2VDaGFuZ2VkLCBzY3JvbGxQb3MgfSA9IHRoaXMub25TY3JvbGxQb3NpdGlvbkNoYW5nZShldmVudCk7XHJcblxyXG4gICAgICAgIGlmIChpc1JhbmdlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgZmlyc3QsIGxhc3QgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudFBvc2l0aW9uKG5ld1N0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBmaXJzdDtcclxuICAgICAgICAgICAgdGhpcy5sYXN0ID0gbGFzdDtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zID0gc2Nyb2xsUG9zO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoJ29uU2Nyb2xsSW5kZXhDaGFuZ2UnLCBuZXdTdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGF6eSAmJiB0aGlzLmlzUGFnZUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhenlMb2FkU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMuX3N0ZXAgPyBNYXRoLm1pbih0aGlzLmdldFBhZ2VCeUZpcnN0KCkgKiB0aGlzLl9zdGVwLCB0aGlzLml0ZW1zLmxlbmd0aCAtIHRoaXMuX3N0ZXApIDogZmlyc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdDogTWF0aC5taW4odGhpcy5fc3RlcCA/ICh0aGlzLmdldFBhZ2VCeUZpcnN0KCkgKyAxKSAqIHRoaXMuX3N0ZXAgOiBsYXN0LCB0aGlzLml0ZW1zLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0xhenlTdGF0ZUNoYW5nZWQgPSB0aGlzLmxhenlMb2FkU3RhdGUuZmlyc3QgIT09IGxhenlMb2FkU3RhdGUuZmlyc3QgfHwgdGhpcy5sYXp5TG9hZFN0YXRlLmxhc3QgIT09IGxhenlMb2FkU3RhdGUubGFzdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpc0xhenlTdGF0ZUNoYW5nZWQgJiYgdGhpcy5oYW5kbGVFdmVudHMoJ29uTGF6eUxvYWQnLCBsYXp5TG9hZFN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF6eUxvYWRTdGF0ZSA9IGxhenlMb2FkU3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Db250YWluZXJTY3JvbGwoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25TY3JvbGwnLCB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGVsYXkgJiYgdGhpcy5pc1BhZ2VDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbFRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNjcm9sbFRpbWVvdXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZF9sb2FkaW5nICYmIHRoaXMuc2hvd0xvYWRlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBpc1JhbmdlQ2hhbmdlZCB9ID0gdGhpcy5vblNjcm9sbFBvc2l0aW9uQ2hhbmdlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBpc1JhbmdlQ2hhbmdlZCB8fCAodGhpcy5fc3RlcCA/IHRoaXMuaXNQYWdlQ2hhbmdlZCA6IGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZF9sb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNjcm9sbENoYW5nZShldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZF9sb2FkaW5nICYmIHRoaXMuc2hvd0xvYWRlciAmJiAoIXRoaXMuX2xhenkgfHwgdGhpcy5fbG9hZGluZyA9PT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZF9sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5nZXRQYWdlQnlGaXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLl9kZWxheSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgIXRoaXMuZF9sb2FkaW5nICYmIHRoaXMub25TY3JvbGxDaGFuZ2UoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kUmVzaXplTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLndpbmRvd1Jlc2l6ZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgV2luZG93O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCkgPyAnb3JpZW50YXRpb25jaGFuZ2UnIDogJ3Jlc2l6ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHdpbmRvdywgZXZlbnQsIHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRSZXNpemVMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZXNpemVUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmlzVmlzaWJsZSh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBbRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCksIERvbUhhbmRsZXIuZ2V0SGVpZ2h0KHRoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbaXNEaWZmV2lkdGgsIGlzRGlmZkhlaWdodF0gPSBbd2lkdGggIT09IHRoaXMuZGVmYXVsdFdpZHRoLCBoZWlnaHQgIT09IHRoaXMuZGVmYXVsdEhlaWdodF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWluaXQgPSB0aGlzLmJvdGggPyBpc0RpZmZXaWR0aCB8fCBpc0RpZmZIZWlnaHQgOiB0aGlzLmhvcml6b250YWwgPyBpc0RpZmZXaWR0aCA6IHRoaXMudmVydGljYWwgPyBpc0RpZmZIZWlnaHQgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWluaXQgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zID0gdGhpcy5fbnVtVG9sZXJhdGVkSXRlbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q29udGVudFdpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmNvbnRlbnRFbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRlbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmNvbnRlbnRFbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMuX3Jlc2l6ZURlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudHMobmFtZSwgcGFyYW1zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnNbbmFtZV0gPyB0aGlzLm9wdGlvbnNbbmFtZV0ocGFyYW1zKSA6IHRoaXNbbmFtZV0uZW1pdChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbnRlbnRPcHRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnRTdHlsZUNsYXNzOiBgcC1zY3JvbGxlci1jb250ZW50ICR7dGhpcy5kX2xvYWRpbmcgPyAncC1zY3JvbGxlci1sb2FkaW5nJyA6ICcnfWAsXHJcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmxvYWRlZEl0ZW1zLFxyXG4gICAgICAgICAgICBnZXRJdGVtT3B0aW9uczogKGluZGV4KSA9PiB0aGlzLmdldE9wdGlvbnMoaW5kZXgpLFxyXG4gICAgICAgICAgICBsb2FkaW5nOiB0aGlzLmRfbG9hZGluZyxcclxuICAgICAgICAgICAgZ2V0TG9hZGVyT3B0aW9uczogKGluZGV4LCBvcHRpb25zPykgPT4gdGhpcy5nZXRMb2FkZXJPcHRpb25zKGluZGV4LCBvcHRpb25zKSxcclxuICAgICAgICAgICAgaXRlbVNpemU6IHRoaXMuX2l0ZW1TaXplLFxyXG4gICAgICAgICAgICByb3dzOiB0aGlzLmxvYWRlZFJvd3MsXHJcbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMubG9hZGVkQ29sdW1ucyxcclxuICAgICAgICAgICAgc3BhY2VyU3R5bGU6IHRoaXMuc3BhY2VyU3R5bGUsXHJcbiAgICAgICAgICAgIGNvbnRlbnRTdHlsZTogdGhpcy5jb250ZW50U3R5bGUsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsOiB0aGlzLnZlcnRpY2FsLFxyXG4gICAgICAgICAgICBob3Jpem9udGFsOiB0aGlzLmhvcml6b250YWwsXHJcbiAgICAgICAgICAgIGJvdGg6IHRoaXMuYm90aFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T3B0aW9ucyhyZW5kZXJlZEluZGV4KSB7XHJcbiAgICAgICAgY29uc3QgY291bnQgPSAodGhpcy5faXRlbXMgfHwgW10pLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYm90aCA/IHRoaXMuZmlyc3Qucm93cyArIHJlbmRlcmVkSW5kZXggOiB0aGlzLmZpcnN0ICsgcmVuZGVyZWRJbmRleDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgIGNvdW50LFxyXG4gICAgICAgICAgICBmaXJzdDogaW5kZXggPT09IDAsXHJcbiAgICAgICAgICAgIGxhc3Q6IGluZGV4ID09PSBjb3VudCAtIDEsXHJcbiAgICAgICAgICAgIGV2ZW46IGluZGV4ICUgMiA9PT0gMCxcclxuICAgICAgICAgICAgb2RkOiBpbmRleCAlIDIgIT09IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldExvYWRlck9wdGlvbnMoaW5kZXgsIGV4dE9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMubG9hZGVyQXJyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgIGNvdW50LFxyXG4gICAgICAgICAgICBmaXJzdDogaW5kZXggPT09IDAsXHJcbiAgICAgICAgICAgIGxhc3Q6IGluZGV4ID09PSBjb3VudCAtIDEsXHJcbiAgICAgICAgICAgIGV2ZW46IGluZGV4ICUgMiA9PT0gMCxcclxuICAgICAgICAgICAgb2RkOiBpbmRleCAlIDIgIT09IDAsXHJcbiAgICAgICAgICAgIC4uLmV4dE9wdGlvbnNcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlLCBTcGlubmVySWNvbl0sXHJcbiAgICBleHBvcnRzOiBbU2Nyb2xsZXIsIFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtTY3JvbGxlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNjcm9sbGVyTW9kdWxlIHt9XHJcbiJdfQ==