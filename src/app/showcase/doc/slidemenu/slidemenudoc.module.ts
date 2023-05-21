import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlideMenuModule } from 'primeng-atm/slidemenu';
import { ButtonModule } from 'primeng-atm/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { MethodsDoc } from './methodsdoc';
import { PopupDoc } from './popupdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, SlideMenuModule, ButtonModule, AppDocModule],
    declarations: [BasicDoc, ImportDoc, MenuItemDoc, MethodsDoc, PropsDoc, StyleDoc, PopupDoc, AccessibilityDoc, TemplatesDoc],
    exports: [AppDocModule]
})
export class SlideMenuDocModule {}
