import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PROJECT_CREATOR_IMPORTS } from './project-creator-imports';
import { IStylesheets } from '../../../shared/interfaces/stylesheets-interface';
import { ISteps } from '../../../shared/interfaces/steps-interface';
import { MenuItem, MessageService } from 'primeng/api';
import { ControleService } from '../../../shared/services/controle.service';
import { Subscription, interval } from 'rxjs';

@Component({
  standalone: true,
  selector: 'pb-project-creator',
  templateUrl: './project-creator.component.html',
  imports: PROJECT_CREATOR_IMPORTS
})
export class ProjectCreatorComponent implements OnInit {
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @Input() styles!: IStylesheets[];
  @Input() steps!: ISteps;
  @Output() nextButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() prevButton: EventEmitter<any> = new EventEmitter<any>();
  isPostRunning: boolean = false;
  progressBarState: string = 'determinate';
  progressBarVal: number = 0;
  currentOutput: string = '';

  contextMenu: MenuItem[] = [
    { icon: 'pi pi-copy', label: 'Copy', command: () => this.copyTextareaLog() },
    { icon: 'pi pi-trash', label: 'Clear', command: () => this.currentOutput = '' }
  ];

  private intervalSubscription: Subscription | undefined;

  constructor(private toast: MessageService, private service: ControleService) { }

  ngOnInit() { }

  public createProject(techTypeCreate: string): void {
    this.isPostRunning = true;
    this.progressBarState = 'indeterminate';
    this.toast.add({ severity: 'info', summary: 'Attention', detail: 'Project under creation...' });

    const ssrEnabled = this.steps.ssrEnabled ? 'y' : 'n';
    this.service.requestPost(`web-projects/${techTypeCreate}?stylesheet=${this.steps.stylesheet}&ssrEnabled=${ssrEnabled}&nameProject=${this.steps.projectName}`).subscribe({
      next: (res: any) => {
        this.isPostRunning = false;
        this.progressBarVal = 100;

        if (this.intervalSubscription) {
          this.intervalSubscription.unsubscribe();
        }

        this.steps.stylesheet = 'css';
        this.steps.ssrEnabled = false;
        this.steps.projectName = '';
        this.steps.createdProj = true;

        this.progressBarState = 'determinate';
        this.currentOutput = `${this.currentOutput}\nProject created sucessfully!`;
        this.toast.add({ severity: 'success', summary: 'Seuccess', detail: res.message });
      },
      error: (error: any) => {
        this.progressBarState = 'determinate';
        this.toast.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    });

    this.startInterval();
  }

  private startInterval(): void {
    this.intervalSubscription = interval(10000).subscribe(() => {
      this.updateProgressBar();
      this.handleCallbackOutput();
    });
  }

  private updateProgressBar() {
    if (this.progressBarVal <= 100) {
      const halfProgress: boolean = this.progressBarVal === 0 || this.progressBarVal === 25 || this.progressBarVal === 50 || this.progressBarVal === 75;

      if (halfProgress) {
        this.progressBarVal += 10;
      } else if (this.progressBarVal % 10 === 0 && this.progressBarVal % 2 === 0 && this.progressBarVal > 10) {
        this.progressBarVal += 6;
      } else if (this.progressBarVal % 2 === 0) {
        this.progressBarVal += 3;
      } else {
        this.progressBarVal += 1;
      }

      if (this.progressBarVal > 100) {
        this.progressBarVal = 100;
      }
    }
  }

  private handleCallbackOutput(): boolean {
    this.service.requestGet(`web-projects/handle-output-creation`).subscribe({
      next: (res: any) => {
        this.isPostRunning = res.isPostRunning;
        this.currentOutput = res.currentOutput;
      },
      error: (error: any) => {
        console.error(error)
      }
    });

    return this.isPostRunning;
  }

  private copyTextareaLog(): void {
    const textarea: HTMLTextAreaElement = this.textarea.nativeElement;
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
      console.error('Unable to copy: ', err);
    }
  }

  public handlePrevButton(): void {
    this.prevButton.emit();
  }

  public handleNextButton(): void {
    this.nextButton.emit();
  }

}
