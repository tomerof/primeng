import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'builtin-themes-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                PrimeNG ships with various free themes to choose from. The list below states all the available themes in the npm distribution with import paths. For a live preview, use the configurator
                <span class="border-round inline-flex border-1 w-2rem h-2rem p-0 align-items-center justify-content-center bg-primary"><span class="pi pi-cog"></span></span> at the topbar to switch themes.
            </p>
        </app-docsectiontext>
        <div class="h-20rem overflow-auto">
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </div>
    </section>`
})
export class BuiltInThemesDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `primeng-atm/resources/themes/bootstrap4-light-blue/theme.css
primeng-atm/resources/themes/bootstrap4-light-purple/theme.css
primeng-atm/resources/themes/bootstrap4-dark-blue/theme.css
primeng-atm/resources/themes/bootstrap4-dark-purple/theme.css
primeng-atm/resources/themes/md-light-indigo/theme.css
primeng-atm/resources/themes/md-light-deeppurple/theme.css
primeng-atm/resources/themes/md-dark-indigo/theme.css
primeng-atm/resources/themes/md-dark-deeppurple/theme.css
primeng-atm/resources/themes/mdc-light-indigo/theme.css
primeng-atm/resources/themes/mdc-light-deeppurple/theme.css
primeng-atm/resources/themes/mdc-dark-indigo/theme.css
primeng-atm/resources/themes/mdc-dark-deeppurple/theme.css
primeng-atm/resources/themes/fluent-light/theme.css
primeng-atm/resources/themes/lara-light-blue/theme.css
primeng-atm/resources/themes/lara-light-indigo/theme.css
primeng-atm/resources/themes/lara-light-purple/theme.css
primeng-atm/resources/themes/lara-light-teal/theme.css
primeng-atm/resources/themes/lara-dark-blue/theme.css
primeng-atm/resources/themes/lara-dark-indigo/theme.css
primeng-atm/resources/themes/lara-dark-purple/theme.css
primeng-atm/resources/themes/lara-dark-teal/theme.css
primeng-atm/resources/themes/soho-light/theme.css
primeng-atm/resources/themes/soho-dark/theme.css
primeng-atm/resources/themes/viva-light/theme.css
primeng-atm/resources/themes/viva-dark/theme.css
primeng-atm/resources/themes/mira/theme.css
primeng-atm/resources/themes/nano/theme.css
primeng-atm/resources/themes/saga-blue/theme.css
primeng-atm/resources/themes/saga-green/theme.css
primeng-atm/resources/themes/saga-orange/theme.css
primeng-atm/resources/themes/saga-purple/theme.css
primeng-atm/resources/themes/vela-blue/theme.css
primeng-atm/resources/themes/vela-green/theme.css
primeng-atm/resources/themes/vela-orange/theme.css
primeng-atm/resources/themes/vela-purple/theme.css
primeng-atm/resources/themes/arya-blue/theme.css
primeng-atm/resources/themes/arya-green/theme.css
primeng-atm/resources/themes/arya-orange/theme.css
primeng-atm/resources/themes/arya-purple/theme.css
primeng-atm/resources/themes/nova/theme.css
primeng-atm/resources/themes/nova-alt/theme.css
primeng-atm/resources/themes/nova-accent/theme.css
primeng-atm/resources/themes/luna-amber/theme.css
primeng-atm/resources/themes/luna-blue/theme.css
primeng-atm/resources/themes/luna-green/theme.css
primeng-atm/resources/themes/luna-pink/theme.css
primeng-atm/resources/themes/rhea/theme.css`
    };
}
