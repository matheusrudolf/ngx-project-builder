import { Component, OnInit } from '@angular/core';
import { WIZARD_IMPORTS } from './wizard-imports';
import { ITechnologies } from '../../shared/interfaces/technologies-interface';
import { ISteps } from '../../shared/interfaces/steps-interface';
import { IStylesheets } from '../../shared/interfaces/stylesheets-interface';
import { ControleService } from '../../shared/services/controle.service';

@Component({
  standalone: true,
  selector: 'pb-wizard',
  templateUrl: './wizard.component.html',
  imports: WIZARD_IMPORTS,
})
export class WizardComponent implements OnInit {
  projTechnologie: ITechnologies[] = [];
  stylesheets: IStylesheets[] = [];
  projSteps: ISteps = { choosenTech: false, techType: '', stylesheet: 'css', ssrEnabled: false, projectName: '', createdProj: false };

  constructor(private service: ControleService) { }

  ngOnInit() {
    this.constroiListas();
  }

  private constroiListas(): void {
    this.service.requestJson('listas').subscribe({
      next: (res) => {
        this.projTechnologie = res.Technologies;
        this.stylesheets = res.Stylesheets;
      }
    });
  }

  public handleNextCallback(event: any): void {
    console.log(event)
  }

  public handleTechVerification(event: boolean) {
    console.log(event)
  }

}
