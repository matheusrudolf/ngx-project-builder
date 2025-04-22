import { FormsModule } from "@angular/forms";;
import { StepperModule } from "primeng/stepper";
import { HttpClientModule } from "@angular/common/http";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TechSelectorComponent } from "./tech-selector/tech-selector.component";
import { ProjectCreatorComponent } from "./project-creator/project-creator.component";
import { ButtonModule } from "primeng/button";

export const WIZARD_IMPORTS = [
    FormsModule,
    HttpClientModule,
    StepperModule,
    ButtonModule,
    InputTextareaModule,
    TechSelectorComponent,
    ProjectCreatorComponent
]