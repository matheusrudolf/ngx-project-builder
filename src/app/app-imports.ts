import { NgClass } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { ToastModule } from "primeng/toast";
import { MenuComponent } from "./components/menu/menu.component";
import { WizardComponent } from "./components/wizard/wizard.component";
import { ControleService } from "./shared/services/controle.service";
import { MessageService } from "primeng/api";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

export const APP_IMPORTS = [
    MenuComponent,
    WizardComponent,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    NgClass,
    ToastModule,
    ProgressSpinnerModule
];

export const APP_PROVIDERS = [
    ControleService,
    MessageService
]