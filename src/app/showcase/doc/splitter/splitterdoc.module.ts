import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitterModule } from 'primeng-atm/splitter';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { EventsDoc } from './eventsdoc';
import { HorizontalDoc } from './horizontaldoc';
import { ImportDoc } from './importdoc';
import { NestedDoc } from './nesteddoc';
import { PropsDoc } from './propsdoc';
import { SizeDoc } from './sizedoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, SplitterModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, HorizontalDoc, SizeDoc, VerticalDoc, NestedDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc, AccessibilityDoc]
})
export class SplitterDocModule {}
