import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng-atm/dialog';
import { DockModule } from 'primeng-atm/dock';
import { GalleriaModule } from 'primeng-atm/galleria';
import { MenubarModule } from 'primeng-atm/menubar';
import { TerminalModule } from 'primeng-atm/terminal';
import { TreeModule } from 'primeng-atm/tree';
import { RadioButtonModule } from 'primeng-atm/radiobutton';
import { ToastModule } from 'primeng-atm/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { StyleDoc } from './styledoc';
import { AdvancedDoc } from './advanceddoc';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { MethodsDoc } from './methodsdoc';
import { PropsDoc } from './propsdoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, DockModule, FormsModule, RadioButtonModule, MenubarModule, ToastModule, DialogModule, GalleriaModule, TerminalModule, TreeModule, AppDocModule],
    declarations: [AdvancedDoc, BasicDoc, EventsDoc, ImportDoc, MenuItemDoc, MethodsDoc, PropsDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class DockDocModule {}
