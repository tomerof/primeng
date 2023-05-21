import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng-atm/badge';
import { ButtonModule } from 'primeng-atm/button';
import { CalendarModule } from 'primeng-atm/calendar';
import { ChartModule } from 'primeng-atm/chart';
import { CheckboxModule } from 'primeng-atm/checkbox';
import { ChipModule } from 'primeng-atm/chip';
import { DropdownModule } from 'primeng-atm/dropdown';
import { InputNumberModule } from 'primeng-atm/inputnumber';
import { InputSwitchModule } from 'primeng-atm/inputswitch';
import { ListboxModule } from 'primeng-atm/listbox';
import { ProgressBarModule } from 'primeng-atm/progressbar';
import { RadioButtonModule } from 'primeng-atm/radiobutton';
import { SelectButtonModule } from 'primeng-atm/selectbutton';
import { SidebarModule } from 'primeng-atm/sidebar';
import { SliderModule } from 'primeng-atm/slider';
import { TableModule } from 'primeng-atm/table';
import { TabMenuModule } from 'primeng-atm/tabmenu';
import { TreeModule } from 'primeng-atm/tree';
import { AppNewsModule } from '../../layout/news/app.news.module';
import { LandingComponent } from './landing.component';

@NgModule({
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
        SidebarModule,
        InputSwitchModule,
        ButtonModule,
        RadioButtonModule,
        InputNumberModule,
        TabMenuModule,
        ChartModule,
        ProgressBarModule,
        TreeModule,
        ChipModule,
        SelectButtonModule,
        SliderModule,
        BadgeModule,
        CalendarModule,
        TableModule,
        DropdownModule,
        ListboxModule,
        RouterModule,
        CheckboxModule,
        AppNewsModule
    ],
    exports: [LandingComponent],
    declarations: [LandingComponent]
})
export class LandingModule {}
