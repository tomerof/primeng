import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng-atm/inputtext';
import { SliderModule } from 'primeng-atm/slider';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { InputDoc } from './inputdoc';
import { PropsDoc } from './propsdoc';
import { RangeDoc } from './rangedoc';
import { StepDoc } from './stepdoc';
import { StyleDoc } from './styledoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, FormsModule, ReactiveFormsModule, SliderModule, AppDocModule, InputTextModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, InputDoc, StepDoc, RangeDoc, VerticalDoc, StyleDoc, PropsDoc, EventsDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class SliderDocModule {}
