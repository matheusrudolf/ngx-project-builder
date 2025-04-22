import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITechnologies } from '../../../shared/interfaces/technologies-interface';
import { ISteps } from '../../../shared/interfaces/steps-interface';
import { TECH_SELECTOR_IMPORTS, TECH_SELECTOR_PROVIDERS } from './tech-selector-imports';
import { ControleService } from '../../../shared/services/controle.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'pb-tech-selector',
  templateUrl: './tech-selector.component.html',
  imports: TECH_SELECTOR_IMPORTS,
  providers: TECH_SELECTOR_PROVIDERS
})
export class TechSelectorComponent implements OnInit {
  @Input() steps!: ISteps;
  @Input() technologies!: ITechnologies[];
  @Output() nextButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() verifyTechVersion: EventEmitter<boolean> = new EventEmitter<boolean>();
  selectedVersion: string = '@latest';

  constructor(private service: ControleService, private confirmation: ConfirmationService, private message: MessageService) { }

  ngOnInit() { }

  public selectedThecnologie(technologie: ITechnologies) {
    this.technologies.forEach(tec => {
      if (tec.title != technologie.title) {
        tec.selected = false;
      }
    });

    technologie.selected = !technologie.selected;
    this.steps.choosenTech = technologie.selected;
    this.steps.techType = technologie.type;
  }

  public onSelected(isSelected: boolean): string {
    let cssClass: string = '';
    isSelected ? cssClass = 'tech-card-selected' : cssClass = '';

    return cssClass;
  }

  public verifyNodeInstallation(): void {
    this.service.requestGet(`web-projects/verify-node-version`).subscribe({
      next: (res: any) => this.confirmation.confirm({ key: 'nodeVersion', message: res.message, header: 'Node Version', icon: 'pi pi-exclamation-triangle' }),
      error: (error: any) => console.error(error)
    });
  }

  public handleNextButton(): void {
    this.service.requestGet('web-projects/verify-angular-version').subscribe({
      next: (res: any) => {
        const message: string = `Angular Version: ${this.extractAngularVersion(res.message)}. Do you want to install the previously selected version?`;

        this.confirmation.confirm({
          key: 'angularVersion', message: message, header: 'Angular Version', icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.handleAngularInstallation(this.selectedVersion);
            this.nextButton.emit();
          },
          reject: () => {
            this.handleAngularInstallation(this.selectedVersion);
            this.nextButton.emit();
          }
        });
      },
      error: (res: any) => {
        const message: string = `${res.error.message.substring(0, 25)} Do you want to install the previously selected version?`;

        this.confirmation.confirm({
          key: 'angularVersion', message: message, header: 'Angular Version', icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.handleAngularInstallation(this.selectedVersion);
            // this.nextButton.emit();
          },
          reject: () => {
            this.handleAngularInstallation(this.selectedVersion);
            // this.nextButton.emit();
          }
        });
      }
    });

  }

  private extractAngularVersion(output: string): string {
    const versionRegex = /Angular CLI:\s+(\d+\.\d+\.\d+)/;
    const match = output.match(versionRegex);
    if (match && match[1]) {
      return match[1];
    }

    return '';
  }

  private handleAngularInstallation(version: string) {
    this.service.requestPost(`web-projects/install-angular-cli?version=${version}`).subscribe({
      next: (res: any) => {
        this.message.add({ severity: 'success', summary: 'Success', detail: res.message });
      },
      error: (res: any) => {
        this.message.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
    });
  }

}
