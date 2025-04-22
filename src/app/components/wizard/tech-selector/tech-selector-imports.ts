import { JsonPipe, NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

export const TECH_SELECTOR_IMPORTS = [
    NgClass,
    JsonPipe,
    FormsModule,
    DropdownModule,
    ButtonModule,
    ConfirmDialogModule
]

export const TECH_SELECTOR_PROVIDERS = [
    ConfirmationService
]