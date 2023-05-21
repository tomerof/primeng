import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng-atm/button';
import { InputSwitchModule } from 'primeng-atm/inputswitch';
import { RadioButtonModule } from 'primeng-atm/radiobutton';
import { SidebarModule } from 'primeng-atm/sidebar';
import { AppConfigComponent } from './app.config.component';

@NgModule({
    imports: [CommonModule, FormsModule, SidebarModule, InputSwitchModule, ButtonModule, RadioButtonModule],
    exports: [AppConfigComponent],
    declarations: [AppConfigComponent]
})
export class AppConfigModule {}
