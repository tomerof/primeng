import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng-atm/button';
import { CalendarModule } from 'primeng-atm/calendar';
import { ConfirmDialogModule } from 'primeng-atm/confirmdialog';
import { ContextMenuModule } from 'primeng-atm/contextmenu';
import { DialogModule } from 'primeng-atm/dialog';
import { DropdownModule } from 'primeng-atm/dropdown';
import { FileUploadModule } from 'primeng-atm/fileupload';
import { SelectButtonModule } from 'primeng-atm/selectbutton';
import { InputSwitchModule } from 'primeng-atm/inputswitch';
import { InputNumberModule } from 'primeng-atm/inputnumber';
import { InputTextModule } from 'primeng-atm/inputtext';
import { InputTextareaModule } from 'primeng-atm/inputtextarea';
import { MultiSelectModule } from 'primeng-atm/multiselect';
import { ProgressBarModule } from 'primeng-atm/progressbar';
import { RadioButtonModule } from 'primeng-atm/radiobutton';
import { RatingModule } from 'primeng-atm/rating';
import { SkeletonModule } from 'primeng-atm/skeleton';
import { SliderModule } from 'primeng-atm/slider';
import { TableModule } from 'primeng-atm/table';
import { TabViewModule } from 'primeng-atm/tabview';
import { TagModule } from 'primeng-atm/tag';
import { ToastModule } from 'primeng-atm/toast';
import { ToggleButtonModule } from 'primeng-atm/togglebutton';
import { ToolbarModule } from 'primeng-atm/toolbar';
import { TooltipModule } from 'primeng-atm/tooltip';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { ContextMenuDoc } from './contextmenudoc';
import { BasicDoc } from './basicdoc';
import { CellEditDoc } from './celleditdoc';
import { CheckboxSelectionDoc } from './checkboxselectiondoc';
import { ColumnGroupDoc } from './columngroupdoc';
import { ColumnResizeExpandModeDoc } from './columnresizeexpandmodedoc';
import { ColumnResizeScrollableModeDoc } from './columnresizescrollablemodedoc';
import { ColumnSelectionDoc } from './columnselectiondoc';
import { ColumnToggleDoc } from './columntoggledoc';
import { ControlledSelectionDoc } from './controlledselectiondoc';
import { CustomersDoc } from './customersdoc';
import { CustomSortDoc } from './customsortdoc';
import { DynamicDoc } from './dynamicdoc';
import { ExpandableRowGroupDoc } from './expandablerowgroupdoc';
import { ExportDoc } from './exportdoc';
import { FilterMenuDoc } from './filtermenudoc';
import { FilterRowDoc } from './filterrowdoc';
import { FlexibleScrollDoc } from './flexiblescrolldoc';
import { FrozenColumnsDoc } from './frozencolumnsdoc';
import { FrozenRowsDoc } from './frozenrowsdoc';
import { GridlinesDoc } from './gridlinesdoc';
import { ImportDoc } from './importdoc';
import { HorizontalAndVerticalScrollDoc } from './horizontalandverticaldoc';
import { LazyLoadDoc } from './lazyloaddoc';
import { MultipleSelectionDoc } from './multipleselectiondoc';
import { PageOnlySelectionDoc } from './pageonlyselectiondoc';
import { PaginatorBasicDoc } from './paginatorbasicdoc';
import { PaginatorProgrammaticDoc } from './paginatorprogrammaticdoc';
import { ProductsDoc } from './productsdoc';
import { RadioButtonSelectionDoc } from './radiobuttonselectiondoc';
import { ReorderDoc } from './reorderdoc';
import { ResponsiveScrollDoc } from './responsivescrolldoc';
import { ResponsiveStackDoc } from './responsivestackdoc';
import { RowEditDoc } from './roweditdoc';
import { RowExpandDoc } from './rowexpanddoc';
import { RowspanGroupingDoc } from './rowspangroupingdoc';
import { SingleColumnSortDoc } from './singlecolumnsortdoc';
import { SingleSelectionDoc } from './singleselectiondoc';
import { SizeDoc } from './sizedoc';
import { StatefulDoc } from './statefuldoc';
import { StripedDoc } from './stripeddoc';
import { StyleDoc } from './styledoc';
import { SubheaderGroupingDoc } from './subheadergroupingdoc';
import { TemplateDoc } from './templatedoc';
import { VerticalScrollDoc } from './verticalscrolldoc';
import { VirtualScrollDoc } from './virtualscrolldoc';
import { VirtualScrollLazyDoc } from './virtualscrolllazydoc';
import { ColumnResizeFitModeDoc } from './columnresizefitmodedoc';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { StylingDoc } from './stylingdoc';
import { MethodsDoc } from './methodsdoc';
import { TemplatesDoc } from './templatesdoc';
import { SelectionEventsDoc } from './selectioneventsdoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        ConfirmDialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        TagModule,
        ToastModule,
        InputTextModule,
        InputSwitchModule,
        InputNumberModule,
        InputTextareaModule,
        ProgressBarModule,
        TooltipModule,
        RadioButtonModule,
        ToolbarModule,
        FileUploadModule,
        TabViewModule,
        ToggleButtonModule,
        RatingModule,
        SkeletonModule,
        SelectButtonModule,
        AppCodeModule,
        AppDocModule
    ],
    declarations: [
        ImportDoc,
        BasicDoc,
        DynamicDoc,
        CellEditDoc,
        CheckboxSelectionDoc,
        ColumnGroupDoc,
        ColumnResizeExpandModeDoc,
        ColumnResizeScrollableModeDoc,
        ColumnResizeFitModeDoc,
        ColumnSelectionDoc,
        ColumnToggleDoc,
        ContextMenuDoc,
        ControlledSelectionDoc,
        CustomersDoc,
        CustomSortDoc,
        DynamicDoc,
        ExpandableRowGroupDoc,
        ExportDoc,
        FilterMenuDoc,
        FilterRowDoc,
        FlexibleScrollDoc,
        FrozenColumnsDoc,
        FrozenRowsDoc,
        GridlinesDoc,
        HorizontalAndVerticalScrollDoc,
        LazyLoadDoc,
        MultipleSelectionDoc,
        PageOnlySelectionDoc,
        PaginatorBasicDoc,
        MultipleSelectionDoc,
        PageOnlySelectionDoc,
        PaginatorProgrammaticDoc,
        ProductsDoc,
        RadioButtonSelectionDoc,
        ReorderDoc,
        ResponsiveScrollDoc,
        ResponsiveStackDoc,
        RowEditDoc,
        RowExpandDoc,
        RowspanGroupingDoc,
        SingleColumnSortDoc,
        SingleSelectionDoc,
        SizeDoc,
        StatefulDoc,
        StripedDoc,
        StyleDoc,
        SubheaderGroupingDoc,
        TemplateDoc,
        VerticalScrollDoc,
        VirtualScrollDoc,
        VirtualScrollLazyDoc,
        PropsDoc,
        EventsDoc,
        StylingDoc,
        MethodsDoc,
        TemplatesDoc,
        SelectionEventsDoc,
        AccessibilityDoc
    ],
    exports: [AppDocModule]
})
export class TableDocModule {}
