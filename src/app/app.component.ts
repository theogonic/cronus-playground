import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { GeneratorService } from './generator.service';
import { NotificationService } from './notification.service';
import examples, { Example } from './examples';
import { GeneratorResultComponent } from './generator-result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MonacoEditorModule,
    MatSelectModule,
    FormsModule,
    GeneratorResultComponent
  ],
  template: `
  <div class="flex flex-col h-screen items-stretch gap-4">
    <mat-toolbar color="primary" class="flex flex-row justify-between">
      <span>Cronus Playground</span>
      <button mat-icon-button (click)="openGithub()">
        <mat-icon svgIcon="github"></mat-icon>
      </button>
    </mat-toolbar>

    <div class="w-full px-4 flex flex-row gap-4 items-center">
      
      <mat-form-field appearance="fill">
        <mat-label>Select an example</mat-label>
        <mat-select (selectionChange)="selectExample($event)">
          <mat-option *ngFor="let option of options" [value]="option">
            {{ option.label }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-raised-button color="primary" (click)="run()">Run</button>
    </div>
    <main class="flex-grow flex flex-col gap-4 px-4 pb-4">
      

      <div class="w-full">
      <div class="border">

        <ngx-monaco-editor
            [options]="specEditorOptions"
            [(ngModel)]="spec">
        </ngx-monaco-editor>
      </div>
      </div>
      
      @if (generatorResult) {
        <div class="border h-full">
          <app-generator-result [result]="generatorResult"></app-generator-result>

        </div>

      } 


  </main>
    
  </div>
  `,
  styles: [
    `
    :host {
      height: 100vh;
    }
    `
  ]
})
export class AppComponent implements OnInit {
  specEditorOptions = {theme: 'vs-light', minimap: { enabled: false } };

  spec: string = "";
  generatorResult: any = null;

  options!:Example[];

  constructor(private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer,
    private gs: GeneratorService,
    private notify: NotificationService
    ) {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/github-icon.svg')
    );
  }
  ngOnInit(): void {
    this.options = examples;
  }
  openGithub() {
    window.open('https://github.com/theogonic/cronus', '_blank');
  }

  run() {
    this.gs.generateApi(this.spec)
    .subscribe({
      next: res => {
        this.generatorResult = res;
      },
      error: err => this.notify.error(err)
    })
  }

  selectExample(change: MatSelectChange) {
    this.spec = change.value.spec;
  }
}
