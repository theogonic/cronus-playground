import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideAnimationsAsync(), importProvidersFrom(HttpClientModule),     importProvidersFrom(MonacoEditorModule.forRoot()),
  ]
};
