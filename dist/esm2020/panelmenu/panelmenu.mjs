import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/tooltip";
export class BasePanelMenuItem {
    constructor(ref) {
        this.ref = ref;
    }
    handleClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        item.expanded = !item.expanded;
        this.ref.detectChanges();
        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }
}
export class PanelMenuSub extends BasePanelMenuItem {
    constructor(ref, panelMenu) {
        super(ref);
        this.panelMenu = panelMenu;
    }
    onItemKeyDown(event) {
        let listItem = event.currentTarget;
        switch (event.code) {
            case 'Space':
            case 'Enter':
                if (listItem && !DomHandler.hasClass(listItem, 'p-disabled')) {
                    listItem.click();
                }
                event.preventDefault();
                break;
            default:
                break;
        }
    }
    getAnimation() {
        return this.expanded ? { value: 'visible', params: { transitionParams: this.transitionOptions, height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
}
PanelMenuSub.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PanelMenuSub, deps: [{ token: i0.ChangeDetectorRef }, { token: PanelMenu }], target: i0.ɵɵFactoryTarget.Component });
PanelMenuSub.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: PanelMenuSub, selector: "p-panelMenuSub", inputs: { item: "item", expanded: "expanded", parentExpanded: "parentExpanded", transitionOptions: "transitionOptions", root: "root" }, host: { classAttribute: "p-element" }, usesInheritance: true, ngImport: i0, template: `
        <ul [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-submenu': root, 'p-submenu-expanded': expanded }" [@submenu]="getAnimation()" role="tree">
            <ng-template ngFor let-child [ngForOf]="item.items">
                <li *ngIf="child.separator" class="p-menu-separator" role="separator"></li>
                <li *ngIf="!child.separator" class="p-menuitem" [ngClass]="child.styleClass" [class.p-hidden]="child.visible === false" [ngStyle]="child.style" pTooltip [tooltipOptions]="child.tooltipOptions">
                    <a
                        *ngIf="!child.routerLink"
                        (keydown)="onItemKeyDown($event)"
                        [attr.href]="child.url"
                        class="p-menuitem-link"
                        [attr.tabindex]="!item.expanded || !parentExpanded ? null : child.disabled ? null : '0'"
                        [attr.id]="child.id"
                        [ngClass]="{ 'p-disabled': child.disabled }"
                        role="treeitem"
                        [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event, child)"
                        [target]="child.target"
                        [attr.title]="child.title"
                    >
                        <ng-container *ngIf="child.items">
                            <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                <AngleDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="child.expanded" [ngStyle]="child.iconStyle"/>
                                <AngleRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!child.expanded" [ngStyle]="child.iconStyle"/>
                            </ng-container>
                            <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{ child.label }}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                    </a>
                    <a
                        *ngIf="child.routerLink"
                        (keydown)="onItemKeyDown($event)"
                        [routerLink]="child.routerLink"
                        [queryParams]="child.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        [ngClass]="{ 'p-disabled': child.disabled }"
                        [attr.tabindex]="!item.expanded || !parentExpanded ? null : child.disabled ? null : '0'"
                        [attr.id]="child.id"
                        role="treeitem"
                        [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event, child)"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [fragment]="child.fragment"
                        [queryParamsHandling]="child.queryParamsHandling"
                        [preserveFragment]="child.preserveFragment"
                        [skipLocationChange]="child.skipLocationChange"
                        [replaceUrl]="child.replaceUrl"
                        [state]="child.state"
                    >
                        <ng-container *ngIf="child.items">
                            <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                <AngleDownIcon *ngIf="child.expanded" [styleClass]="'p-panelmenu-icon'" [ngStyle]="child.iconStyle"/>
                                <AngleRightIcon *ngIf="!child.expanded" [styleClass]="'p-panelmenu-icon'" [ngStyle]="child.iconStyle"/>
                            </ng-container>
                            <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{ child.label }}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                    </a>
                    <p-panelMenuSub [item]="child" [parentExpanded]="expanded && parentExpanded" [expanded]="child.expanded" [transitionOptions]="transitionOptions" *ngIf="child.items"></p-panelMenuSub>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.RouterLink; }), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.RouterLinkActive; }), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Tooltip; }), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(function () { return AngleDownIcon; }), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(function () { return AngleRightIcon; }), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(function () { return PanelMenuSub; }), selector: "p-panelMenuSub", inputs: ["item", "expanded", "parentExpanded", "transitionOptions", "root"] }], animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PanelMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-panelMenuSub',
                    template: `
        <ul [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-submenu': root, 'p-submenu-expanded': expanded }" [@submenu]="getAnimation()" role="tree">
            <ng-template ngFor let-child [ngForOf]="item.items">
                <li *ngIf="child.separator" class="p-menu-separator" role="separator"></li>
                <li *ngIf="!child.separator" class="p-menuitem" [ngClass]="child.styleClass" [class.p-hidden]="child.visible === false" [ngStyle]="child.style" pTooltip [tooltipOptions]="child.tooltipOptions">
                    <a
                        *ngIf="!child.routerLink"
                        (keydown)="onItemKeyDown($event)"
                        [attr.href]="child.url"
                        class="p-menuitem-link"
                        [attr.tabindex]="!item.expanded || !parentExpanded ? null : child.disabled ? null : '0'"
                        [attr.id]="child.id"
                        [ngClass]="{ 'p-disabled': child.disabled }"
                        role="treeitem"
                        [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event, child)"
                        [target]="child.target"
                        [attr.title]="child.title"
                    >
                        <ng-container *ngIf="child.items">
                            <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                <AngleDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="child.expanded" [ngStyle]="child.iconStyle"/>
                                <AngleRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!child.expanded" [ngStyle]="child.iconStyle"/>
                            </ng-container>
                            <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{ child.label }}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                    </a>
                    <a
                        *ngIf="child.routerLink"
                        (keydown)="onItemKeyDown($event)"
                        [routerLink]="child.routerLink"
                        [queryParams]="child.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        [ngClass]="{ 'p-disabled': child.disabled }"
                        [attr.tabindex]="!item.expanded || !parentExpanded ? null : child.disabled ? null : '0'"
                        [attr.id]="child.id"
                        role="treeitem"
                        [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event, child)"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [fragment]="child.fragment"
                        [queryParamsHandling]="child.queryParamsHandling"
                        [preserveFragment]="child.preserveFragment"
                        [skipLocationChange]="child.skipLocationChange"
                        [replaceUrl]="child.replaceUrl"
                        [state]="child.state"
                    >
                        <ng-container *ngIf="child.items">
                            <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                <AngleDownIcon *ngIf="child.expanded" [styleClass]="'p-panelmenu-icon'" [ngStyle]="child.iconStyle"/>
                                <AngleRightIcon *ngIf="!child.expanded" [styleClass]="'p-panelmenu-icon'" [ngStyle]="child.iconStyle"/>
                            </ng-container>
                            <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{ child.label }}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                    </a>
                    <p-panelMenuSub [item]="child" [parentExpanded]="expanded && parentExpanded" [expanded]="child.expanded" [transitionOptions]="transitionOptions" *ngIf="child.items"></p-panelMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
                    animations: [
                        trigger('submenu', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: PanelMenu }]; }, propDecorators: { item: [{
                type: Input
            }], expanded: [{
                type: Input
            }], parentExpanded: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], root: [{
                type: Input
            }] } });
export class PanelMenu extends BasePanelMenuItem {
    constructor(ref) {
        super(ref);
        this.multiple = true;
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
            }
        });
    }
    collapseAll() {
        for (let item of this.model) {
            if (item.expanded) {
                item.expanded = false;
            }
        }
    }
    handleClick(event, item) {
        if (!this.multiple) {
            for (let modelItem of this.model) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        this.animating = true;
        super.handleClick(event, item);
    }
    onToggleDone() {
        this.animating = false;
    }
    onItemKeyDown(event) {
        let listItem = event.currentTarget;
        switch (event.code) {
            case 'Space':
            case 'Enter':
                if (listItem && !DomHandler.hasClass(listItem, 'p-disabled')) {
                    listItem.click();
                }
                event.preventDefault();
                break;
            default:
                break;
        }
    }
    visible(item) {
        return item.visible !== false;
    }
    getAnimation(item) {
        return item.expanded ? { value: 'visible', params: { transitionParams: this.animating ? this.transitionOptions : '0ms', height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
}
PanelMenu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PanelMenu, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PanelMenu.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: PanelMenu, selector: "p-panelMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", multiple: "multiple", transitionOptions: "transitionOptions" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], usesInheritance: true, ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'">
            <ng-container *ngFor="let item of model; let f = first; let l = last">
                <div class="p-panelmenu-panel" *ngIf="visible(item)">
                    <div [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': item.expanded, 'p-disabled': item.disabled }" [class]="item.styleClass" [ngStyle]="item.style" pTooltip [tooltipOptions]="item.tooltipOptions">
                        <a
                            *ngIf="!item.routerLink"
                            [attr.href]="item.url"
                            (click)="handleClick($event, item)"
                            (keydown)="onItemKeyDown($event)"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [attr.id]="item.id"
                            [target]="item.target"
                            [attr.title]="item.title"
                            class="p-panelmenu-header-link"
                            [attr.aria-expanded]="item.expanded"
                            [attr.id]="item.id + '_header'"
                            [attr.aria-controls]="item.id + '_content'"
                        >
                            <!--
                                <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{ 'pi-chevron-right': !item.expanded, 'pi-chevron-down': item.expanded }"></span>
                             -->
                            <ng-container *ngIf="item.items">
                                <ng-container *ngIf="!submenuIconTemplate">
                                    <ChevronDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="item.expanded" />
                                    <ChevronRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!item.expanded" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ item.badge }}</span>
                        </a>
                        <a
                            *ngIf="item.routerLink"
                            [routerLink]="item.routerLink"
                            [queryParams]="item.queryParams"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                            (click)="handleClick($event, item)"
                            (keydown)="onItemKeyDown($event)"
                            [target]="item.target"
                            [attr.title]="item.title"
                            class="p-panelmenu-header-link"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment"
                            [queryParamsHandling]="item.queryParamsHandling"
                            [preserveFragment]="item.preserveFragment"
                            [skipLocationChange]="item.skipLocationChange"
                            [replaceUrl]="item.replaceUrl"
                            [state]="item.state"
                        >

                            <!-- 
                                <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{ 'pi-chevron-right': !item.expanded, 'pi-chevron-down': item.expanded }"></span>
                            -->
                            <ng-container *ngIf="item.items">
                                <ng-container *ngIf="!submenuIconTemplate">
                                    <ChevronDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="item.expanded" />
                                    <ChevronRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!item.expanded" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ item.badge }}</span>
                        </a>
                    </div>
                    <div *ngIf="item.items" class="p-toggleable-content" [ngClass]="{ 'p-panelmenu-expanded': item.expanded }" [@rootItem]="getAnimation(item)" (@rootItem.done)="onToggleDone()">
                        <div class="p-panelmenu-content" role="region" [attr.id]="item.id + '_content'" [attr.aria-labelledby]="item.id + '_header'">
                            <p-panelMenuSub [item]="item" [parentExpanded]="item.expanded" [expanded]="true" [transitionOptions]="transitionOptions" [root]="true"></p-panelMenuSub>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, isInline: true, styles: [".p-panelmenu .p-panelmenu-header-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-link:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.RouterLink; }), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.RouterLinkActive; }), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Tooltip; }), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(function () { return ChevronDownIcon; }), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(function () { return ChevronRightIcon; }), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(function () { return PanelMenuSub; }), selector: "p-panelMenuSub", inputs: ["item", "expanded", "parentExpanded", "transitionOptions", "root"] }], animations: [
        trigger('rootItem', [
            state('hidden', style({
                height: '0'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PanelMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-panelMenu', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'">
            <ng-container *ngFor="let item of model; let f = first; let l = last">
                <div class="p-panelmenu-panel" *ngIf="visible(item)">
                    <div [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': item.expanded, 'p-disabled': item.disabled }" [class]="item.styleClass" [ngStyle]="item.style" pTooltip [tooltipOptions]="item.tooltipOptions">
                        <a
                            *ngIf="!item.routerLink"
                            [attr.href]="item.url"
                            (click)="handleClick($event, item)"
                            (keydown)="onItemKeyDown($event)"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [attr.id]="item.id"
                            [target]="item.target"
                            [attr.title]="item.title"
                            class="p-panelmenu-header-link"
                            [attr.aria-expanded]="item.expanded"
                            [attr.id]="item.id + '_header'"
                            [attr.aria-controls]="item.id + '_content'"
                        >
                            <!--
                                <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{ 'pi-chevron-right': !item.expanded, 'pi-chevron-down': item.expanded }"></span>
                             -->
                            <ng-container *ngIf="item.items">
                                <ng-container *ngIf="!submenuIconTemplate">
                                    <ChevronDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="item.expanded" />
                                    <ChevronRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!item.expanded" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ item.badge }}</span>
                        </a>
                        <a
                            *ngIf="item.routerLink"
                            [routerLink]="item.routerLink"
                            [queryParams]="item.queryParams"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                            (click)="handleClick($event, item)"
                            (keydown)="onItemKeyDown($event)"
                            [target]="item.target"
                            [attr.title]="item.title"
                            class="p-panelmenu-header-link"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment"
                            [queryParamsHandling]="item.queryParamsHandling"
                            [preserveFragment]="item.preserveFragment"
                            [skipLocationChange]="item.skipLocationChange"
                            [replaceUrl]="item.replaceUrl"
                            [state]="item.state"
                        >

                            <!-- 
                                <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{ 'pi-chevron-right': !item.expanded, 'pi-chevron-down': item.expanded }"></span>
                            -->
                            <ng-container *ngIf="item.items">
                                <ng-container *ngIf="!submenuIconTemplate">
                                    <ChevronDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="item.expanded" />
                                    <ChevronRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!item.expanded" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ item.badge }}</span>
                        </a>
                    </div>
                    <div *ngIf="item.items" class="p-toggleable-content" [ngClass]="{ 'p-panelmenu-expanded': item.expanded }" [@rootItem]="getAnimation(item)" (@rootItem.done)="onToggleDone()">
                        <div class="p-panelmenu-content" role="region" [attr.id]="item.id + '_content'" [attr.aria-labelledby]="item.id + '_header'">
                            <p-panelMenuSub [item]="item" [parentExpanded]="item.expanded" [expanded]="true" [transitionOptions]="transitionOptions" [root]="true"></p-panelMenuSub>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, animations: [
                        trigger('rootItem', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-panelmenu .p-panelmenu-header-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-link:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], multiple: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class PanelMenuModule {
}
PanelMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PanelMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PanelMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: PanelMenuModule, declarations: [PanelMenu, PanelMenuSub], imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon], exports: [PanelMenu, RouterModule, TooltipModule, SharedModule] });
PanelMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PanelMenuModule, imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon, RouterModule, TooltipModule, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PanelMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon],
                    exports: [PanelMenu, RouterModule, TooltipModule, SharedModule],
                    declarations: [PanelMenu, PanelMenuSub]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxtZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BhbmVsbWVudS9wYW5lbG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBaUMsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JMLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBWSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7QUFFOUQsTUFBTSxPQUFPLGlCQUFpQjtJQUMxQixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUFHLENBQUM7SUFFOUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NB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LEVBQUUsWUFBWSxDQUFDO29CQUMvRCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBUZW1wbGF0ZVJlZiwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1lbnVJdGVtLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xyXG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5pbXBvcnQgeyBBbmdsZURvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZWRvd24nO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcclxuaW1wb3J0IHsgQW5nbGVSaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlcmlnaHQnO1xyXG5pbXBvcnQgeyBDaGV2cm9uUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9ucmlnaHQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYW5lbE1lbnVJdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgICBoYW5kbGVDbGljayhldmVudCwgaXRlbSkge1xyXG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0ZW0uZXhwYW5kZWQgPSAhaXRlbS5leHBhbmRlZDtcclxuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICAgIGlmICghaXRlbS51cmwgJiYgIWl0ZW0ucm91dGVyTGluaykge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xyXG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWxNZW51U3ViJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHVsIFtuZ0NsYXNzXT1cInsgJ3Atc3VibWVudS1saXN0JzogdHJ1ZSwgJ3AtcGFuZWxtZW51LXJvb3Qtc3VibWVudSc6IHJvb3QsICdwLXN1Ym1lbnUtZXhwYW5kZWQnOiBleHBhbmRlZCB9XCIgW0BzdWJtZW51XT1cImdldEFuaW1hdGlvbigpXCIgcm9sZT1cInRyZWVcIj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jaGlsZCBbbmdGb3JPZl09XCJpdGVtLml0ZW1zXCI+XHJcbiAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJjaGlsZC5zZXBhcmF0b3JcIiBjbGFzcz1cInAtbWVudS1zZXBhcmF0b3JcIiByb2xlPVwic2VwYXJhdG9yXCI+PC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiBjbGFzcz1cInAtbWVudWl0ZW1cIiBbbmdDbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCIgW2NsYXNzLnAtaGlkZGVuXT1cImNoaWxkLnZpc2libGUgPT09IGZhbHNlXCIgW25nU3R5bGVdPVwiY2hpbGQuc3R5bGVcIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiY2hpbGQudG9vbHRpcE9wdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFjaGlsZC5yb3V0ZXJMaW5rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JdGVtS2V5RG93bigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJjaGlsZC51cmxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIiFpdGVtLmV4cGFuZGVkIHx8ICFwYXJlbnRFeHBhbmRlZCA/IG51bGwgOiBjaGlsZC5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJjaGlsZC5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBjaGlsZC5kaXNhYmxlZCB9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRyZWVpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJjaGlsZC5leHBhbmRlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGNoaWxkKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNoaWxkLml0ZW1zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXBhbmVsTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtcGFuZWxtZW51LWljb24nXCIgKm5nSWY9XCJjaGlsZC5leHBhbmRlZFwiIFtuZ1N0eWxlXT1cImNoaWxkLmljb25TdHlsZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtcGFuZWxtZW51LWljb24nXCIgKm5nSWY9XCIhY2hpbGQuZXhwYW5kZWRcIiBbbmdTdHlsZV09XCJjaGlsZC5pY29uU3R5bGVcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInBhbmVsTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ1N0eWxlXT1cImNoaWxkLmljb25TdHlsZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImNoaWxkLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCI+e3sgY2hpbGQubGFiZWwgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJjaGlsZC5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cImNoaWxkLmJhZGdlXCIgW25nQ2xhc3NdPVwiY2hpbGQuYmFkZ2VTdHlsZUNsYXNzXCI+e3sgY2hpbGQuYmFkZ2UgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY2hpbGQucm91dGVyTGlua1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSXRlbUtleURvd24oJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cImNoaWxkLnJvdXRlckxpbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiY2hpbGQucXVlcnlQYXJhbXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiY2hpbGQucm91dGVyTGlua0FjdGl2ZU9wdGlvbnMgfHwgeyBleGFjdDogZmFsc2UgfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaXNhYmxlZCc6IGNoaWxkLmRpc2FibGVkIH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCIhaXRlbS5leHBhbmRlZCB8fCAhcGFyZW50RXhwYW5kZWQgPyBudWxsIDogY2hpbGQuZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwidHJlZWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImNoaWxkLmV4cGFuZGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgY2hpbGQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJjaGlsZC50YXJnZXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJjaGlsZC5mcmFnbWVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImNoaWxkLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJlc2VydmVGcmFnbWVudF09XCJjaGlsZC5wcmVzZXJ2ZUZyYWdtZW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJjaGlsZC5za2lwTG9jYXRpb25DaGFuZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVwbGFjZVVybF09XCJjaGlsZC5yZXBsYWNlVXJsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cImNoaWxkLnN0YXRlXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFwYW5lbE1lbnUuc3VibWVudUljb25UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvd25JY29uICpuZ0lmPVwiY2hpbGQuZXhwYW5kZWRcIiBbc3R5bGVDbGFzc109XCIncC1wYW5lbG1lbnUtaWNvbidcIiBbbmdTdHlsZV09XCJjaGlsZC5pY29uU3R5bGVcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlUmlnaHRJY29uICpuZ0lmPVwiIWNoaWxkLmV4cGFuZGVkXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtcGFuZWxtZW51LWljb24nXCIgW25nU3R5bGVdPVwiY2hpbGQuaWNvblN0eWxlXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYW5lbE1lbnUuc3VibWVudUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdTdHlsZV09XCJjaGlsZC5pY29uU3R5bGVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgKm5nSWY9XCJjaGlsZC5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxSb3V0ZUxhYmVsXCI+e3sgY2hpbGQubGFiZWwgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbFJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImNoaWxkLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1iYWRnZVwiICpuZ0lmPVwiY2hpbGQuYmFkZ2VcIiBbbmdDbGFzc109XCJjaGlsZC5iYWRnZVN0eWxlQ2xhc3NcIj57eyBjaGlsZC5iYWRnZSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAtcGFuZWxNZW51U3ViIFtpdGVtXT1cImNoaWxkXCIgW3BhcmVudEV4cGFuZGVkXT1cImV4cGFuZGVkICYmIHBhcmVudEV4cGFuZGVkXCIgW2V4cGFuZGVkXT1cImNoaWxkLmV4cGFuZGVkXCIgW3RyYW5zaXRpb25PcHRpb25zXT1cInRyYW5zaXRpb25PcHRpb25zXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvcC1wYW5lbE1lbnVTdWI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3N1Ym1lbnUnLCBbXHJcbiAgICAgICAgICAgIHN0YXRlKFxyXG4gICAgICAgICAgICAgICAgJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIHN0YXRlKFxyXG4gICAgICAgICAgICAgICAgJ3Zpc2libGUnLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJyonXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlIDw9PiBoaWRkZW4nLCBbYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKV0pLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKDApKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudVN1YiBleHRlbmRzIEJhc2VQYW5lbE1lbnVJdGVtIHtcclxuICAgIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xyXG5cclxuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHBhcmVudEV4cGFuZGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgcGFuZWxNZW51OiBQYW5lbE1lbnUpIHtcclxuICAgICAgICBzdXBlcihyZWYpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbUtleURvd24oZXZlbnQpIHtcclxuICAgICAgICBsZXQgbGlzdEl0ZW0gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdEl0ZW0gJiYgIURvbUhhbmRsZXIuaGFzQ2xhc3MobGlzdEl0ZW0sICdwLWRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QW5pbWF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8geyB2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHsgdHJhbnNpdGlvblBhcmFtczogdGhpcy50cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnKicgfSB9IDogeyB2YWx1ZTogJ2hpZGRlbicsIHBhcmFtczogeyB0cmFuc2l0aW9uUGFyYW1zOiB0aGlzLnRyYW5zaXRpb25PcHRpb25zLCBoZWlnaHQ6ICcwJyB9IH07XHJcbiAgICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXBhbmVsTWVudScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIidwLXBhbmVsbWVudSBwLWNvbXBvbmVudCdcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbDsgbGV0IGYgPSBmaXJzdDsgbGV0IGwgPSBsYXN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1wYW5lbG1lbnUtcGFuZWxcIiAqbmdJZj1cInZpc2libGUoaXRlbSlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsgJ3AtY29tcG9uZW50IHAtcGFuZWxtZW51LWhlYWRlcic6IHRydWUsICdwLWhpZ2hsaWdodCc6IGl0ZW0uZXhwYW5kZWQsICdwLWRpc2FibGVkJzogaXRlbS5kaXNhYmxlZCB9XCIgW2NsYXNzXT1cIml0ZW0uc3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cIml0ZW0uc3R5bGVcIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiaXRlbS50b29sdGlwT3B0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhaXRlbS5yb3V0ZXJMaW5rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmhyZWZdPVwiaXRlbS51cmxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JdGVtS2V5RG93bigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIml0ZW0uaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJpdGVtLnRhcmdldFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1wYW5lbG1lbnUtaGVhZGVyLWxpbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpdGVtLmV4cGFuZGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIml0ZW0uaWQgKyAnX2hlYWRlcidcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJpdGVtLmlkICsgJ19jb250ZW50J1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uaXRlbXNcIiBjbGFzcz1cInAtcGFuZWxtZW51LWljb24gcGlcIiBbbmdDbGFzc109XCJ7ICdwaS1jaGV2cm9uLXJpZ2h0JzogIWl0ZW0uZXhwYW5kZWQsICdwaS1jaGV2cm9uLWRvd24nOiBpdGVtLmV4cGFuZGVkIH1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbS5pdGVtc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc3VibWVudUljb25UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uIFtzdHlsZUNsYXNzXT1cIidwLXBhbmVsbWVudS1pY29uJ1wiICpuZ0lmPVwiaXRlbS5leHBhbmRlZFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHRJY29uIFtzdHlsZUNsYXNzXT1cIidwLXBhbmVsbWVudS1pY29uJ1wiICpuZ0lmPVwiIWl0ZW0uZXhwYW5kZWRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInN1Ym1lbnVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nU3R5bGVdPVwiaXRlbS5pY29uU3R5bGVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxMYWJlbFwiPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJpdGVtLmJhZGdlXCIgW25nQ2xhc3NdPVwiaXRlbS5iYWRnZVN0eWxlQ2xhc3NcIj57eyBpdGVtLmJhZGdlIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIml0ZW0ucm91dGVyTGlua1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua109XCJpdGVtLnJvdXRlckxpbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zIHx8IHsgZXhhY3Q6IGZhbHNlIH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JdGVtS2V5RG93bigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiaXRlbS50YXJnZXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiaXRlbS50aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtcGFuZWxtZW51LWhlYWRlci1saW5rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIml0ZW0uaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaXRlbS5xdWVyeVBhcmFtc0hhbmRsaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cIml0ZW0ucmVwbGFjZVVybFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pdGVtc1wiIGNsYXNzPVwicC1wYW5lbG1lbnUtaWNvbiBwaVwiIFtuZ0NsYXNzXT1cInsgJ3BpLWNoZXZyb24tcmlnaHQnOiAhaXRlbS5leHBhbmRlZCwgJ3BpLWNoZXZyb24tZG93bic6IGl0ZW0uZXhwYW5kZWQgfVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW0uaXRlbXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiBbc3R5bGVDbGFzc109XCIncC1wYW5lbG1lbnUtaWNvbidcIiAqbmdJZj1cIml0ZW0uZXhwYW5kZWRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiBbc3R5bGVDbGFzc109XCIncC1wYW5lbG1lbnUtaWNvbidcIiAqbmdJZj1cIiFpdGVtLmV4cGFuZGVkXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzdWJtZW51SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cIml0ZW0uaWNvblN0eWxlXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cIml0ZW0uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sUm91dGVMYWJlbFwiPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJpdGVtLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cIml0ZW0uYmFkZ2VcIiBbbmdDbGFzc109XCJpdGVtLmJhZGdlU3R5bGVDbGFzc1wiPnt7IGl0ZW0uYmFkZ2UgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXRlbS5pdGVtc1wiIGNsYXNzPVwicC10b2dnbGVhYmxlLWNvbnRlbnRcIiBbbmdDbGFzc109XCJ7ICdwLXBhbmVsbWVudS1leHBhbmRlZCc6IGl0ZW0uZXhwYW5kZWQgfVwiIFtAcm9vdEl0ZW1dPVwiZ2V0QW5pbWF0aW9uKGl0ZW0pXCIgKEByb290SXRlbS5kb25lKT1cIm9uVG9nZ2xlRG9uZSgpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBhbmVsbWVudS1jb250ZW50XCIgcm9sZT1cInJlZ2lvblwiIFthdHRyLmlkXT1cIml0ZW0uaWQgKyAnX2NvbnRlbnQnXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIml0ZW0uaWQgKyAnX2hlYWRlcidcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLXBhbmVsTWVudVN1YiBbaXRlbV09XCJpdGVtXCIgW3BhcmVudEV4cGFuZGVkXT1cIml0ZW0uZXhwYW5kZWRcIiBbZXhwYW5kZWRdPVwidHJ1ZVwiIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiIFtyb290XT1cInRydWVcIj48L3AtcGFuZWxNZW51U3ViPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcigncm9vdEl0ZW0nLCBbXHJcbiAgICAgICAgICAgIHN0YXRlKFxyXG4gICAgICAgICAgICAgICAgJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIHN0YXRlKFxyXG4gICAgICAgICAgICAgICAgJ3Zpc2libGUnLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJyonXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlIDw9PiBoaWRkZW4nLCBbYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKV0pLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKDApKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFuZWxtZW51LmNzcyddLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51IGV4dGVuZHMgQmFzZVBhbmVsTWVudUl0ZW0gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuICAgIHN1Ym1lbnVJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgcHVibGljIGFuaW1hdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgc3VwZXIocmVmKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdWJtZW51aWNvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJtZW51SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbGxhcHNlQWxsKCkge1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5tb2RlbCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGV2ZW50LCBpdGVtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG1vZGVsSXRlbSBvZiB0aGlzLm1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gbW9kZWxJdGVtICYmIG1vZGVsSXRlbS5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSXRlbS5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgc3VwZXIuaGFuZGxlQ2xpY2soZXZlbnQsIGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG9nZ2xlRG9uZSgpIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbUtleURvd24oZXZlbnQpIHtcclxuICAgICAgICBsZXQgbGlzdEl0ZW0gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdEl0ZW0gJiYgIURvbUhhbmRsZXIuaGFzQ2xhc3MobGlzdEl0ZW0sICdwLWRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlzaWJsZShpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0udmlzaWJsZSAhPT0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QW5pbWF0aW9uKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gaXRlbS5leHBhbmRlZCA/IHsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRoaXMuYW5pbWF0aW5nID8gdGhpcy50cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJyB9IH0gOiB7IHZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRoaXMudHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJzAnIH0gfTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgU2hhcmVkTW9kdWxlLCBBbmdsZURvd25JY29uLCBBbmdsZVJpZ2h0SWNvbiwgQ2hldnJvbkRvd25JY29uLCBDaGV2cm9uUmlnaHRJY29uXSxcclxuICAgIGV4cG9ydHM6IFtQYW5lbE1lbnUsIFJvdXRlck1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1BhbmVsTWVudSwgUGFuZWxNZW51U3ViXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51TW9kdWxlIHt9XHJcbiJdfQ==