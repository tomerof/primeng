import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng-atm/button';
import { DataViewModule } from 'primeng-atm/dataview';
import { DropdownModule } from 'primeng-atm/dropdown';
import { RatingModule } from 'primeng-atm/rating';
import { TagModule } from 'primeng-atm/tag';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { LayoutDoc } from './layoutdoc';
import { PaginationDoc } from './paginationdoc';
import { PrimeflexDoc } from './primeflexdoc';
import { PropsDoc } from './propsdoc';
import { SortingDoc } from './sortingdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, DataViewModule, DropdownModule, ButtonModule, RouterModule, RatingModule, TagModule, FormsModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, PrimeflexDoc, BasicDoc, PaginationDoc, SortingDoc, LayoutDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc, AccessibilityDoc]
})
export class DataViewDocModule {}
