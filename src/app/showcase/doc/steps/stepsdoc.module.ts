import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng-atm/dropdown';
import { InputTextModule } from 'primeng-atm/inputtext';
import { InputMaskModule } from 'primeng-atm/inputmask';
import { CheckboxModule } from 'primeng-atm/checkbox';
import { StepsModule } from 'primeng-atm/steps';
import { ToastModule } from 'primeng-atm/toast';
import { CardModule } from 'primeng-atm/card';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ConfirmationDemo } from './confirmationdemo';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { InteractiveDoc } from './interactivedoc';
import { MenuItemDoc } from './menuitemdoc';
import { MethodsDoc } from './methodsdoc';
import { PaymentDemo } from './paymentdemo';
import { PersonalDemo } from './personaldemo';
import { PropsDoc } from './propsdoc';
import { RoutingDoc } from './routingdoc';
import { SeatDemo } from './seatdemo';
import { StyleDoc } from './styledoc';
import { TicketService } from '../../service/ticketservice';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, StepsModule, ToastModule, AppDocModule, FormsModule, DropdownModule, InputTextModule, InputMaskModule, CheckboxModule, CardModule],
    declarations: [BasicDoc, ImportDoc, MenuItemDoc, MethodsDoc, PropsDoc, StyleDoc, InteractiveDoc, EventsDoc, ConfirmationDemo, PaymentDemo, PersonalDemo, SeatDemo, RoutingDoc, AccessibilityDoc],
    exports: [AppDocModule],
    providers: [TicketService]
})
export class StepsDocModule {}
