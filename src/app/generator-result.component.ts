import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


@Component({
    selector: 'app-generator-result',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatButtonModule,
        MonacoEditorModule,
        FormsModule,
        MatSidenavModule,
        MatListModule
    ],
    template: `
    <div class="flex flex-col h-full">

        <mat-drawer-container class="flex-1">
            <mat-drawer fixedInViewport #sidenav mode="side" opened>
                <mat-list>
                    <mat-list-item *ngFor="let generator of generators" (click)="selectGenerator(generator)" class="cursor-pointer hover:bg-gray-200">
                    {{ generator }}
                    </mat-list-item>
                </mat-list>
                
            </mat-drawer>
            <mat-drawer-content>
                <div class="flex flex-row h-full items-stretch">
                    <mat-list *ngIf="selectedGenerator">
                        <mat-list-item *ngFor="let file of files" (click)="selectFile(file)" class="cursor-pointer hover:bg-gray-200">
                        {{ file }}
                        </mat-list-item>
                    </mat-list>
                    <div class="flex-1">
                        <ngx-monaco-editor *ngIf="selectedFile" [options]="fileEditorOption" [ngModel]="fileContent" style="height: 100%"></ngx-monaco-editor>

                    </div>
                
                </div>
                
            </mat-drawer-content>
        </mat-drawer-container>
    </div>
    `,
    styles: [
        `
    :host {
        height: 100%;
    }
    `
    ]
})
export class GeneratorResultComponent implements OnInit, OnChanges {

    Object = Object;
    @Input()
    result!: Map<string, Map<string, string>>

    generators!:string[]
    files!: string[]
    selectedGenerator: string | null = null;
    selectedFile: string | null = null;

    fileEditorOption = {
        theme: 'vs-light', 
        language: 'rust',
        minimap: { enabled: false },
        readOnly: true
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['result']) {
            this.generators = Array.from(this.result.keys())
        }
    }

   
    selectGenerator(generator: string) {
        this.selectedGenerator = generator;
        this.selectedFile = null; // Reset selected file
        this.files = Array.from(this.result.get(this.selectedGenerator)?.keys() || []);
    }

    selectFile(file: string) {
        this.selectedFile = file;
    }

    get fileContent(): string {
        if (this.selectedGenerator && this.selectedFile) {
            return this.result.get(this.selectedGenerator)?.get(this.selectedFile) || '';
        }
        return '';
    }
}